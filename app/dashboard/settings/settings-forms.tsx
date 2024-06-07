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
 import { logOut, updatePassword, useCredit } from "@/lib/actions"
 import { useForm } from "react-hook-form";
 import { z } from "zod"
 import { zodResolver } from "@hookform/resolvers/zod";
 import { UpdatePasswordSchema } from "@/lib/definitions";
 import { useToast } from "@/components/ui/use-toast";
 import Link from "next/link";
  
 export default function SettingsForms({ paymentLink, credits }: { paymentLink: string, credits: string }) {
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

  async function handleUseCredit() {
    await useCredit();
  };

  return (
    <>
        <Card className="w-[100%] grow">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Change your profile settings</CardDescription>
          </CardHeader>
          <CardContent>
          <form>
            <h4>Purchase credits</h4>
              <p className="text-2xl text-blue-600 decoration-2 mt-2">{credits}</p>
              <Link href={paymentLink}>
                <Button type="button" className="mt-4">
                  Buy credits
                </Button>        
              </Link>
          </form>
          <Button type="button" onClick={handleUseCredit} className="mt-4">
            Use credit
          </Button>         
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
    </>
  )
};