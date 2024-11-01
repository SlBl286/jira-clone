import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import DottedSeprator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const SignInCard = () => {
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome back!</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeprator />
      </div>
      <CardContent className="p-7">
        <form className="space-y-4">
          <Input
            required
            type={"email"}
            value={""}
            onChange={() => {}}
            placeholder="Enter email"
            disabled={false}
          />
          <Input
            required
            type={"password"}
            value={""}
            onChange={() => {}}
            placeholder="Enter password"
            disabled={false}
            min={8}
            max={256}
          />
          <Button disabled={false} size={"lg"} className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
      <div className="px-7">
        <DottedSeprator />
        <CardContent className="p-7 flex flex-col gap-y-4">
          <Button
            variant={"secondary"}
            size={"lg"}
            className="w-full"
            disabled={false}
          >
            <FcGoogle className="mr-2  size-5" />
            Login with Google
          </Button>
          <Button
            variant={"secondary"}
            size={"lg"}
            className="w-full"
            disabled={false}
          >
            <FaGithub className="mr-2  size-5" />
            Login with Github
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};