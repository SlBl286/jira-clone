"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DottedSeprator from "@/components/dotted-separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateProject } from "../api/use-update-project";
import { useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeftIcon, CopyIcon, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Project } from "../types";
import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";
import { updateProjectSchema } from "../schemas";

type EditprojectFormProps = {
  onCancel?: () => void;
  initialValues: Project;
};

export function EditprojectForm({
  onCancel,
  initialValues,
}: EditprojectFormProps) {
  const { mutate, isPending } = useUpdateProject();

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Project",
    "This action cannot be undo.",
    "destructive"
  );


  const handleDelete = async () => {
    const ok = await confirmDelete();
    if (!ok) return;
    // deleteWorkspace(
    //   { param: { workspaceId: initialValues.$id } },
    //   {
    //     onSuccess: () => {
    //       router.push("/");
    //     },
    //   }
    // );
  };

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof updateProjectSchema>) => {
    const finalValue = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };
    mutate(
      { form: finalValue, param: { projectId: initialValues.$id } },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  };

  const handleImageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-4">
      <DeleteDialog />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button
            size={"sm"}
            variant={"secondary"}
            onClick={
              onCancel
                ? onCancel
                : () => router.push(`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`)
            }
          >
            Back
            <ArrowLeftIcon className="size-4 ml-2" />
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
          </CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeprator />
        </div>

        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  disabled={isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter project name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  disabled={isPending}
                  render={({ field }) => (
                    <div className="flex flex-col gap-y-">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                              alt="Logo"
                              fill
                              className="object-cover"
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px] ">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-neutral-400 " />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm">Workspace Icon</p>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG, SVG or JPEG, max 5mb
                          </p>
                          <input
                            className="hidden"
                            type="file"
                            accept=".jpg, .png, .jpeg, .svg"
                            ref={inputRef}
                            onChange={handleImageOnChange}
                            disabled={isPending}
                          />
                          {!field.value ? (
                            <Button
                              type="button"
                              disabled={isPending}
                              variant={"teritary"}
                              size={"xs"}
                              className="w-fit mt-2"
                              onClick={() => {
                                inputRef.current?.click();
                              }}
                            >
                              Upload Image
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              disabled={isPending}
                              variant={"destructive"}
                              size={"xs"}
                              className="w-fit mt-2"
                              onClick={() => {
                                field.onChange(null);
                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }}
                            >
                              Remove Image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
              <DottedSeprator className="py-7" />
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  size={"lg"}
                  variant={"secondary"}
                  onClick={onCancel}
                  disabled={isPending}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size={"lg"}
                  variant={"primary"}
                  disabled={isPending}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3>Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Delete project is a irreversible and will remove all associated
              data
            </p>
            <DottedSeprator className="p-7" />

            <Button
              size={"sm"}
              variant={"destructive"}
              className="mt-6 w-fit ml-auto"
              type="button"
              disabled={isPending }
              onClick={handleDelete}
            >
              Delete Project
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
