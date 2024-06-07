'use client';

import { Button } from "@/components/ui/button"
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
 } from "@/components/ui/card"
 import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
 import { Input } from "@/components/ui/input"
 import { Separator } from "@radix-ui/react-separator"
 import { logOut, updatePassword } from "@/lib/actions"
 import { useForm } from "react-hook-form";
 import { z } from "zod"
 import { zodResolver } from "@hookform/resolvers/zod";
 import { UpdatePasswordSchema } from "@/lib/definitions";
 import { useToast } from "@/components/ui/use-toast";
  
 export default function Page() {
  const { toast } = useToast();

  // Define form for Form component.
  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
      repeated_password: '',
    }
  })

  async function onSubmit(values: z.infer<typeof UpdatePasswordSchema>) {
    const result = await updatePassword(values.old_password, values.new_password);
    if (result) {
      toast({
        title: "Success!",
        description: "Your password has been updated.",
      });
    } else {
      toast({
        title: "Something went wrong",
        description: "Password update failed.",
      });  
    }
  };

  async function handleButton() {
    const isToast = false;

    if (isToast) {
      toast({
        title: "Success!",
        description: "Your password has been updated.",
      });
    } else {
      toast({
        title: "Fail!!",
        description: "Your password has been updated.",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen gap-4 p-4 sm:pl-20">
        <Card className="w-[100%] grow">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Change your profile settings</CardDescription>
          </CardHeader>
          <CardContent>
          <form>
            <h4>Purchase credits</h4>
              <Button type="submit" className="mt-4">
                Buy credits
              </Button>
          </form>            
          <Separator className="my-10" />
          <h4 className="">Update password</h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <FormField
                control={form.control}
                name="old_password"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Current password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} className="w-[30%]"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />     
              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} className="w-[30%]"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repeated_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repeat new password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} className="w-[30%]"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />                                       
              <Button type="submit" className="">Update password</Button>
            </form>
          </Form>                  
          <Separator className="my-10" />
          <h4>Sign out</h4>
            <form action={logOut}>
              <Button type="submit" className="mt-4">
                Sign out
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
};