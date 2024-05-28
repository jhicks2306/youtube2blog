'use client';

import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Page({
    searchParams,
  }: {
    searchParams?: {
      blog?: string;
    };
  }) {
    const blog = searchParams?.blog || '';

  return (
    <>
    <main className="flex flex-col items-center min-h-screen p-4 sm:pl-20">
        <Card className="flex flex-col w-full grow">
            <CardHeader>
                <CardTitle>Review Blog</CardTitle>
                <CardDescription>Review and refine your generated blog</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col grow'>
                <Textarea className='grow' placeholder='Outline for blog goes here...' defaultValue={blog}/>
            </CardContent>
        </Card>
    </main>
    </>
  );
}
