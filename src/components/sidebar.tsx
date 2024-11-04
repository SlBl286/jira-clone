import Image from "next/image";
import Link from "next/link";
import DottedSeprator from "./dotted-separator";
import { Navigation } from "./navigation";
import { WorkspaceSwitcher } from "./workspace-swticher";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href={"/"}>
        <Image src={"/logo.svg"} width={164} height={48} alt="logo" />
      </Link>
      <DottedSeprator className="my-4"/>
      <WorkspaceSwitcher/>
      <DottedSeprator className="my-4"/>
      <Navigation/>
    </aside>
  );
};
