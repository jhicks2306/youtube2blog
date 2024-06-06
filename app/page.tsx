'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { signupUser } from "@/lib/actions";
import { CredentialsSchema } from "@/lib/definitions";

export default function SignUpForm() {
  const { toast } = useToast();
  const router = useRouter();

  // Define form for Form component.
  const form = useForm<z.infer<typeof CredentialsSchema>>({
    resolver: zodResolver(CredentialsSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  async function onSubmit(values: z.infer<typeof CredentialsSchema>) {

    // Try to sign up the user.
    const result = await signupUser(values.email, values.password);

    // Handle result and direct user to login.
    if (result.message === 'User created.') {
      console.log(result.message)

      toast({
        title: "Success!",
        description: `User ${values.email} added. Please sign in.`,
      })
      router.push('/login');

    } else if(result.message == "User already exists.") {
      console.log(result.message)

      toast({
        description: "Email already taken. Please try another.",
      })
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Failed to add user to database.",
        variant: 'destructive',
      })
    }
  }
   
  return (
    <div className="flex flex-col w-full h-screen place-content-around">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your email and password below to sign up.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@mail.com" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />              
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
