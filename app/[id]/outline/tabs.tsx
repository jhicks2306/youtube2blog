'use client'

import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { VideoData } from '@/lib/definitions';
import TranscriptBottomSheet from './bottomsheet';
import Link from 'next/link';
import { generateOutline, updateVideoOutline } from '@/lib/actions';
import { revalidatePath } from 'next/cache';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

type EditBlogTabsProps = {
  video: VideoData;
  saving: boolean;
  handleOutline: (newOutline: string) => void;
};

export default function EditBlogTabs({ video, saving, handleOutline }: EditBlogTabsProps) {

  return (
    <>
          <Tabs defaultValue="outline" className="flex flex-col col-span-4">
            <TabsList className='grid grid-cols-2'>
              <TabsTrigger value="outline">Outline</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
            </TabsList>
            <TabsContent value="outline" className='data-[state="active"]:flex data-[state="active"]:grow'>
              <Textarea className=''
              name='outline-text'
              placeholder='Outline for blog goes here...'
              defaultValue={video.outline}
              onChange={(e) => {
                handleOutline(e.target.value);
              }}
              disabled={saving}
              />                
            </TabsContent>
            <TabsContent value="blog" className='data-[state="active"]:flex data-[state="active"]:grow'>
              <Textarea className=''
              name='blog-text'
              placeholder='Blog goes here...'
              disabled={saving}
              />
            </TabsContent>
          </Tabs>         
    </>
  );
};


