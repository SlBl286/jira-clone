import { Navbar } from "@/components/navbar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Sidebar } from "@/components/sidebar";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import React from "react";
import Link from "next/link";
import Image from "next/image";

type StandaloneLayoutProps = {
  children: React.ReactNode;
};

export default function StandaloneLayout({ children }: StandaloneLayoutProps) {
  return (
    <main className="ng-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className=" flex justify-between items-center h-[73px]">
          <Link href={"/"}>
            <Image src={"/logo.svg"} alt="logo" height={56} width={152}/>
          </Link>
        </nav>
        <div className="flex flex-col items-center justify-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
}
