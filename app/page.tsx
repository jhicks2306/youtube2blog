import { UrlForm } from '@/components/url-form';
import { UploadedVideosTable } from '@/components/uploaded-table';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import {
    Pencil,
  } from "lucide-react"
  import { fetchVideos } from '@/lib/data';



export default async function Page() {
  // Return page to non async and move data fetching into table component.
  const videos = await fetchVideos();
  console.log(videos)

  return (
    <>
      <main className="flex flex-col items-center min-h-screen max-h-screen gap-4 p-4 sm:pl-20">
        <Card className="w-[100%]">
          <CardHeader>
            <CardTitle>Submit URL</CardTitle>
            <CardDescription>Enter your Youtube URL</CardDescription>
          </CardHeader>
          <CardContent>
            <UrlForm/>
          </CardContent>
        </Card>
        <Card className="grow w-[100%] overflow-scroll">
          <CardHeader>
            <CardTitle>Imported Videos</CardTitle>
            <CardDescription>Videos you have imported</CardDescription>
          </CardHeader>
          <CardContent>
            <UploadedVideosTable/>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
