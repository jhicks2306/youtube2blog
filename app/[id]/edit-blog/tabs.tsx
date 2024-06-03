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
import { useState, useEffect } from 'react';
import { useFormStatus } from 'react-dom'
import { SkeletonBlogArea } from '@/components/skeletons';

type EditBlogTabsProps = {
  video: VideoData;
  saving: boolean;
  handleOutline: (newOutline: string) => void;
  handleBlog: (newBloge: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function EditBlogTabs({ video, saving, handleOutline, handleBlog, activeTab, setActiveTab }: EditBlogTabsProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const {pending} = useFormStatus();

  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  return (
    <>
          <Tabs value={currentTab} 
          onValueChange={(tab) => {
            setCurrentTab(tab);
            setActiveTab(tab);
          }} 
          className="flex flex-col col-span-4">
            {!pending?
              <TabsList className='grid grid-cols-2'>
                <TabsTrigger value="outline" className=''>Outline</TabsTrigger>
                <TabsTrigger value="blog" className=''>Blog</TabsTrigger>
              </TabsList>
            :
              <TabsList className='grid grid-cols-2'>
                <TabsTrigger value="outline" className='opacity-50 pointer-events-none'>Outline</TabsTrigger>
                <TabsTrigger value="blog" className='opactiy-50 pointer-events-none'>Blog</TabsTrigger>
              </TabsList>
            }
            <TabsContent value="outline" className='data-[state="active"]:flex data-[state="active"]:grow'>
              <Textarea className=''
              name='outline-text'
              placeholder='Outline for blog goes here...'
              defaultValue={video.outline}
              onChange={(e) => {
                handleOutline(e.target.value);
              }}
              disabled={saving || pending}
              />                
            </TabsContent>
            <TabsContent value="blog" className='data-[state="active"]:flex data-[state="active"]:grow'>
              { !pending?
                <Textarea className=''
                name='blog-text'
                placeholder='Blog goes here...'
                defaultValue={video.blog}
                onChange={(e) => {
                  handleBlog(e.target.value);
                }}
                disabled={saving}
                /> : 
                <SkeletonBlogArea/>      
            }
            </TabsContent>
          </Tabs>         
    </>
  );
};


