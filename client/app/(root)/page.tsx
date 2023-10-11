import { Header } from "@/components/Header";
import { TypeAnimation } from "react-type-animation";
import { Hero } from "./components/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Header />
      <Hero />
    </main>
  );
}
