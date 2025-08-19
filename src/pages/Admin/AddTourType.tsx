import { useGetTourTypesQuery, useRemoveTourTypesMutation } from "@/redux/features/Tour/tour.api"
import { LoaderCircle, Trash2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { toast } from "sonner";

export default function AddTourType() {
    const { data, isLoading } = useGetTourTypesQuery(undefined)
     const [removeTourType] = useRemoveTourTypesMutation()

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <LoaderCircle className="animate-spin" />
            </div>
        )
    }

    console.log(data);


 const handleRemoveTourType = async (tourTypeId : string) => {
    const toastId = toast.loading("Removing")
    console.log(tourTypeId)
 try {
       await removeTourType(tourTypeId).unwrap()
       toast.success("Successfully Deleted", {id : toastId

       })
    
 } catch (error) {
      toast.error("An error has been occured", {id : toastId
        
       })

     console.log(error)
    
 }
  }

    return (
        <div className="w-full max-w-7xl mx-auto px-5">
            <div className="flex justify-between my-8">
                <h1>Tour Types</h1>
                <AddTourTypeModal />


            </div>
            <div className="border border-muted rounded-md">

                <Table>

                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data?.map((item: { name: string , _id : string}, index: number) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{item?.name}</TableCell>
                                <TableCell className="text-right">
                                    <DeleteConfirmation onConfirm={() => handleRemoveTourType(item._id)}>
                                        <Button size="sm" variant="destructive">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </DeleteConfirmation>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
