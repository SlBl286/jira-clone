import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground"/>
    </div>
  )
}