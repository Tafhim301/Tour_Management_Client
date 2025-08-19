import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router"

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { cn } from "@/lib/utils";





const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})




export default function Verify() {
    const [sendOtp] = useSendOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();
    const [confirm, setConfirm] = useState(false)
    const location = useLocation()
    const navigate = useNavigate();
    const [email] = useState(location.state);
    const [timer, setTimer] = useState(30)

    useEffect(() => {
        if (!email) {
            navigate('/')
        }
    }
        , [email, navigate]);

    useEffect(() => {
        const timerId = setInterval(() => {
            if (email && confirm) {
                setTimer((prev) => (prev > 0 ? prev - 1 : 0))

            }
        }, 1000)

        return () => clearInterval(timerId)

    }, [email, confirm])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })


    const handleSendOtp = async () => {
        setConfirm(true);
        setTimer(30);
        const toastId = toast.loading("Sending OTP") 
        try {
            const res = await sendOtp({ email: email }).unwrap();
            if (res.success) {
                toast.success("OTP Sent", {id : toastId})


            }



        } catch (error) {
             toast.error("OTP Sending failed", {id : toastId})

            console.log(error)

        }

    }



    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const toastId = toast.loading("Verifying OTP")
        const userInfo = {
            email: email,
            otp: data.pin
        }

        try {

            const res = await verifyOtp(userInfo).unwrap();
            if (res.success) {
                toast.success("OTP Verifeied", { id: toastId })

            }

        } catch (error) {

            console.log(error)

        }
    }

    return (
        <div className="grid place-content-center h-screen">
            {
                !confirm ?

                    <Card className="">
                        <CardHeader>
                            <CardTitle className="text-xl" >Verify your email address</CardTitle>
                            <CardDescription>We will send you an OTP at <br /> {email}</CardDescription>
                            <CardAction></CardAction>
                        </CardHeader>

                        <CardFooter className="flex justify-end">
                            <Button className="w-[300px]" onClick={() => handleSendOtp()}>Confirm</Button>
                        </CardFooter>
                    </Card>
                    : (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl" >Verify your email address</CardTitle>
                                <CardDescription>Please Enter the 6-digit code we sent you</CardDescription>
                                <CardAction></CardAction>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="pin"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>One-Time Password</FormLabel>
                                                    <FormControl>
                                                        <InputOTP maxLength={6} {...field}>
                                                            <InputOTPGroup>
                                                                <InputOTPSlot index={0} />
                                                            </InputOTPGroup>
                                                            <InputOTPGroup>
                                                                <InputOTPSlot index={1} />
                                                            </InputOTPGroup>
                                                            <InputOTPGroup>
                                                                <InputOTPSlot index={2} />
                                                            </InputOTPGroup>
                                                            <Minus />
                                                            <InputOTPGroup>
                                                                <InputOTPSlot index={3} />
                                                            </InputOTPGroup>
                                                            <InputOTPGroup>
                                                                <InputOTPSlot index={4} />
                                                            </InputOTPGroup>
                                                            <InputOTPGroup>
                                                                <InputOTPSlot index={5} />
                                                            </InputOTPGroup>

                                                        </InputOTP>
                                                    </FormControl>
                                                    <FormDescription>
                                                        <div className="flex items-center gap-1">
                                                            <Button className={cn("p-0 m-0", {
                                                                'cursor-pointr': timer === 0,
                                                                'text-gray-500': timer !== 0


                                                            })} disabled={timer !== 0} onClick={() => handleSendOtp()} type={"button"} variant={'link'}>Resend OTP</Button><p>: {timer}</p>
                                                        </div>

                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />


                                    </form>
                                </Form>

                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button className="w-full" form="otp-form" type="submit">Submit</Button>
                            </CardFooter>
                        </Card>
                    )
            }
        </div>
    )
}
