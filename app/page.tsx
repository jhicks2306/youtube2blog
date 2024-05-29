import { UrlForm } from '@/components/url-form';
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
    Home,
    Pencil,
  } from "lucide-react"



export default function Page() {
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Thumbnail</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Transcript</TableHead>
                  <TableHead className="">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-scroll">
                <TableRow>
                  <TableCell className="font-medium"><img src='https://i.ytimg.com/vi/7lCDEYXw3mM/default.jpg'/></TableCell>
                  <TableCell>Niacinamide For Skin: Everything You Need To Know | Evidence-Based</TableCell>
                  <TableCell>Downloaded</TableCell>
                  <TableCell className="text-right">
                    <Link href="/" className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-muted text-lg font-semibold text-muted-foreground md:h-8 md:w-8 md:text-base">
                        <Pencil className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Edit</span>
                    </Link>                    
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium"><img src='https://i.ytimg.com/vi/7lCDEYXw3mM/default.jpg'/></TableCell>
                  <TableCell>Niacinamide For Skin: Everything You Need To Know | Evidence-Based</TableCell>
                  <TableCell>Downloaded</TableCell>
                  <TableCell className="text-right">
                    <Link href="/" className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-muted text-lg font-semibold text-muted-foreground md:h-8 md:w-8 md:text-base">
                        <Pencil className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Edit</span>
                    </Link>                    
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium"><img src='https://i.ytimg.com/vi/7lCDEYXw3mM/default.jpg'/></TableCell>
                  <TableCell>Niacinamide For Skin: Everything You Need To Know | Evidence-Based</TableCell>
                  <TableCell>Downloaded</TableCell>
                  <TableCell className="text-right">
                    <Link href="/" className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-muted text-lg font-semibold text-muted-foreground md:h-8 md:w-8 md:text-base">
                        <Pencil className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Edit</span>
                    </Link>                    
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium"><img src='https://i.ytimg.com/vi/7lCDEYXw3mM/default.jpg'/></TableCell>
                  <TableCell>Niacinamide For Skin: Everything You Need To Know | Evidence-Based</TableCell>
                  <TableCell>Downloaded</TableCell>
                  <TableCell className="text-right">
                    <Link href="/" className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-muted text-lg font-semibold text-muted-foreground md:h-8 md:w-8 md:text-base">
                        <Pencil className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Edit</span>
                    </Link>                    
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium"><img src='https://i.ytimg.com/vi/7lCDEYXw3mM/default.jpg'/></TableCell>
                  <TableCell>Niacinamide For Skin: Everything You Need To Know | Evidence-Based</TableCell>
                  <TableCell>Downloaded</TableCell>
                  <TableCell className="text-right">
                    <Link href="/" className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-muted text-lg font-semibold text-muted-foreground md:h-8 md:w-8 md:text-base">
                        <Pencil className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Edit</span>
                    </Link>                    
                  </TableCell>
                </TableRow>                                                                  
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </main>
    </>
  );
}
