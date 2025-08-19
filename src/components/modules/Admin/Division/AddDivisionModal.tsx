import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddDivisionsMutation } from "@/redux/features/division/division.api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


export function AddDivisionModal() {

    const [image, setImage] = useState<File | null>(null)
    const [isUploading, setUploading] = useState(false)
    const [addDivision] = useAddDivisionsMutation()
    const [open, setOpen] = useState(false)
    const form = useForm({
        defaultValues: {
            name: "",
            description: ""

        }
    });



    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data: any) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data))
        formData.append('file', image as File)
        const toastId = toast.loading("Uploading Division")

        try {
            const res = await addDivision(formData);
            setUploading(true)
            console.log(res);
            toast.success("Division Added Successfully",{
                id : toastId
            });
            setOpen(false)
            setUploading(false)

        } catch (error) {
            console.log(error)
            toast.error("Divison Adding failed", {
                id : toastId
            })
            setUploading(false)

        }






    };



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button>Add Division</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Division</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form id="add-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Division Name"
                                                {...field}

                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Description of the division"
                                                {...field}

                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                        <SingleImageUploader onChange={setImage} />
                    </Form>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button disabled={!image || isUploading} type="submit" form="add-tour-type">
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}