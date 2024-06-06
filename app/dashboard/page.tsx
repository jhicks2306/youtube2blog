import { UrlForm } from '@/components/url-form';
import { UploadedVideosTable } from '@/components/uploaded-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
  import { fetchVideos } from '@/lib/data';

export default async function Page() {
  // Return page to non async and move data fetching into table component.
  const videos = await fetchVideos();

  return (
    <>
      <main className="flex flex-col items-center min-h-screen gap-4 p-4 sm:pl-20">
        <Card className="w-[100%]">
          <CardHeader>
            <CardTitle>Submit URL</CardTitle>
            <CardDescription>Enter your Youtube URL</CardDescription>
          </CardHeader>
          <CardContent>
            <UrlForm/>
          </CardContent>
        </Card>
        <Card className="flex flex-col grow w-[100%] max-h-screen">
          <CardHeader>
            <CardTitle>Imported Videos</CardTitle>
            <CardDescription>Videos you have imported</CardDescription>
          </CardHeader>
          <CardContent className='overflow-scroll'>
            <UploadedVideosTable/>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
