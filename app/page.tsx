import { Suspense } from "react";
import { ModeToggle } from "@/components/toggle-mode";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HomeHero } from "@/components/home-hero";
import { HomeFeatures } from "@/components/home-features";
import { HomeDemo } from "@/components/home-demo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HomeHero />
        <HomeFeatures />
        <HomeDemo />
      </main>
      <Footer />
    </div>
  );
}
