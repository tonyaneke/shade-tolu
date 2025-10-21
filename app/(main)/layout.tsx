import { Navbar } from "@/src/ui/navbar";
import { Footer } from "@/src/ui/Footer";
import { SmoothCursor } from "@/src/ui/smooth_cursor";
import { PageTransition } from "@/src/ui/PageTransition";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans min-h-screen relative scroll-smooth">
      <Navbar />
      <SmoothCursor />
      <PageTransition>
        <main className="pt-24">{children}</main>
      </PageTransition>
      <Footer />
    </div>
  );
}
