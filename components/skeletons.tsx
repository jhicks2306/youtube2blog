import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import TranscriptBottomSheet from "@/app/[id]/edit-blog/bottomsheet"
import { Button } from "./ui/button"

export function SkeletonCard() {
  return (
    <Card className="flex flex-col w-full grow">
    <CardHeader>
      <Skeleton className="h-8 w-[140px] rounded-xl" />
      <Skeleton className="h-4 w-[140px] rounded-xl" />
    </CardHeader>
    <CardContent className='flex flex-col grow'>
      <div className="flex flex-col grow space-y-4 p-4 border border-input rounded-md mb-8">
        <Skeleton className="h-4 w-[40%] rounded-xl" />
        <div className="space-y-2 ">
          <Skeleton className="h-4 w-[25%]" />
          <Skeleton className="h-4 w-[20%]" />
          <Skeleton className="h-4 w-[25%]" />
        </div>
        <div className=""></div>
        <Skeleton className="h-4 w-[40%] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[25%]" />
          <Skeleton className="h-4 w-[20%]" />
          <Skeleton className="h-4 w-[25%]" />
        </div>
        <Skeleton className="h-4 w-[40%] rounded-xl" />
        <div className="space-y-2 ">
          <Skeleton className="h-4 w-[25%]" />
          <Skeleton className="h-4 w-[20%]" />
          <Skeleton className="h-4 w-[25%]" />
        </div>
        <div className=""></div>
        <Skeleton className="h-4 w-[40%] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[25%]" />
          <Skeleton className="h-4 w-[20%]" />
          <Skeleton className="h-4 w-[25%]" />
        </div>    
      </div>
      <div className='flex flex-row'>
        <Skeleton className="h-10 w-[15%]"/>
        <Skeleton className="h-10 w-[15%] ml-4"/>
      </div>    
    </CardContent>
  </Card>
  )
}

export function SkeletonBlogArea() {
  return (
      <div className="flex flex-col grow space-y-4 p-4 border border-input rounded-md mb-8">
        <Skeleton className="h-4 w-[40%] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[25%]" />
          <Skeleton className="h-4 w-[20%]" />
          <Skeleton className="h-4 w-[25%]" />
        </div>
        <div className=""></div>
        <Skeleton className="h-4 w-[40%] rounded-xl" />
        <div className="space-y-2 show-1">
          <Skeleton className="h-4 w-[25%] " />
          <Skeleton className="h-4 w-[20%]" />
          <Skeleton className="h-4 w-[25%]" />
        </div>
        <Skeleton className="h-4 w-[40%] rounded-xl" />
        <div className="space-y-2 show-2">
          <Skeleton className="h-4 w-[25%]" />
          <Skeleton className="h-4 w-[20%]" />
          <Skeleton className="h-4 w-[25%]" />
        </div>
        <div className=""></div>
        <Skeleton className="h-4 w-[40%] rounded-xl" />
        <div className="space-y-2 show-3">
          <Skeleton className="h-4 w-[25%]" />
          <Skeleton className="h-4 w-[20%]" />
          <Skeleton className="h-4 w-[25%]" />
        </div>    
      </div> 
  )
}
