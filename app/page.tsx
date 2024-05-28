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


export default function Page() {
  return (
    <>
      <main className="flex flex-col items-center min-h-screen gap-4 p-4 sm:pl-20">
        <div className="grow"></div>
        <Card className="w-[75%]">
          <CardHeader>
            <CardTitle>Submit URL</CardTitle>
            <CardDescription>Enter your Youtube URL</CardDescription>
          </CardHeader>
          <CardContent>
            <UrlForm/>
          </CardContent>
        </Card>
        <div className="grow"></div>
      </main>
    </>
  );
}
