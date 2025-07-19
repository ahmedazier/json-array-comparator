import Image from "next/image";
import { ModeToggle } from "@/components/toggle-mode";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import  Component  from "@/components/tools/json-array";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Component />
      </main>
      <Footer />
    </div>
  );
}
