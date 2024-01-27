import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Logo size="md" />
      <h1 className="text-3xl my-4">Welcome to Feast</h1>
      <h2>the place for sharing food you love and how you make it with other people</h2>
      {/* <Button onClick={() => redirect("/sign-up")}>Get Started</Button> */}
    </div>
  )
}
