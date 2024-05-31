import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { fetchVideos } from "@/lib/data";
import { deleteVideo } from "@/lib/actions";
import {
  Icon,
  Pencil,
} from "lucide-react"
import Link from 'next/link';
import { EditVideoIconButton, DeleteVideoIconButton } from "./icon-buttons";

export async function UploadedVideosTable() {
  const videos = await fetchVideos();

  return (
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Thumbnail</TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Transcript</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody className="overflow-scroll">
      {videos?.map((video) => (
        <TableRow key={video.id}>
          <TableCell className="font-medium"><img src={video.image_url}/></TableCell>
          <TableCell>{video.title}</TableCell>
          <TableCell>
            {video.transcript? "Downloaded" : "Not Ready"}
          </TableCell>
          <TableCell className="text-right">
            <div className="flex flex-row size-full space-x-2 place-content-end">
              <EditVideoIconButton id={video.id}/>
              <DeleteVideoIconButton id={video.id}/>
            </div>
          </TableCell>
        </TableRow>
      ))}                                                                 
    </TableBody>
  </Table>
  );
}