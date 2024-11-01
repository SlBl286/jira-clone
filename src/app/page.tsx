import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Button variant={"primary"} size={"lg"}>Primary</Button>
      <Button variant={"secondary"} size={"sm"}>Secondary</Button>
      <Button variant={"destructive"}>Destructive</Button>
      <Button variant={"ghost"}>Ghost</Button>
      <Button variant={"teritary"}>Teritrary</Button>
      <Button variant={"outline"}>Outline</Button>
      <Button variant={"muted"}>Muted</Button>
      <Input/>
    </div>
  );
}
