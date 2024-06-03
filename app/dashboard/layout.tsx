
import "/styles/globals.css";
import Sidebar from "@/components/sidebar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="flex w-full flex-col bg-muted/40">
          <Sidebar/>
          {children}
        </div>
  );
}
