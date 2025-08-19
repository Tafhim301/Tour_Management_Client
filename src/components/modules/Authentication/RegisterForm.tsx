import { Button } from "@/components/ui/button";
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import PasswordInput from "@/components/ui/PasswordInput";
import { Link, useNavigate } from "react-router";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { config } from "@/config";




const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.email({ error: "Please Provide a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters.", }),
  confirmPassword: z.string(),

}).refine((data) => data.password === data.confirmPassword, {
  message: "Password does not match",
  path: ["confirmPassword"]
})



export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {

  const navigate = useNavigate();


  const [register] = useRegisterMutation();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: '',
      password: "",
      confirmPassword: ""

    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,


    };

    try {
      const result = await register(userInfo).unwrap();

      console.log(result)


      toast.success("User Created Successfully");

      navigate('/verify',{
        state : data.email
      })









    } catch (error) {

      console.log(error)
    }



  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to create an account
        </p>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" type="text" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input placeholder="example.email@gmail.com" type="email" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Enter Your Email Address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field}></PasswordInput>
                  </FormControl>
                  <FormDescription className="sr-only">
                    Enter your password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field}></PasswordInput>
                  </FormControl>
                  <FormDescription className="sr-only">
                    Please Confirm Your Password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />



            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button
          onClick={() => window.open(`${config.baseUrl}/auth/google`)}
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
        >
          Login with Google
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}