import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import { TailSpin } from "react-loader-spinner";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form";

import { Input } from "../../../@/components/ui/input";
import { Button } from "../../../@/components/ui/button";
import { useState, useRef } from "react";
import { useUser } from "@clerk/clerk-react";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImageResize,
  FilePondPluginImageCrop,
  FilePondPluginImageTransform
);

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required.",
  }),
});

const InitialModal = () => {
  const [files, setFiles] = useState("");
  const inputRef = useRef();
  const { user } = useUser();
  const { id } = user;

  // const handelAuth = () => {
  //   const { id } = user;
  //   if (!id) {
  //     return RedirectToSignIn();
  //   } else {
  //     return { id: id };
  //   }
  // };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  // const isLoading = form.formState.isSubmitting; // extract loading state from form , so we can know
  //when to disable our inputs if its currently submitting a request

  let pond = null;

  const onSubmit = (event, serverName, files) => {
    event.preventDefault();
    try {
      const reader = new FileReader();
      const formData = new FormData();

      reader.onload = async () => {
        const dataUrl = reader.result;
        formData.append("Image", dataUrl);
        formData.append("serverName", serverName);
        formData.append("userId", id);

        const response = await fetch(
          `${import.meta.env.VITE_MAIN_BACKEND_URL}${
            import.meta.env.VITE_MAIN_BACKEND_PORT
          }/create-server`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          console.log("Done");
        } else {
          console.log("sever error");
        }
      };
      reader.readAsDataURL(files);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and an image.You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(event) => onSubmit(event, inputRef.current.value, files)}
            className="space-y-8"
          >
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={() => {
                    return (
                      <FormItem>
                        <FormControl>
                          <FilePond
                            ref={(ref) => {
                              pond = ref;
                            }}
                            onaddfile={(error, file) => {
                              if (!error) {
                                setFiles(file?.file);
                              } else {
                                console.log(error);
                              }
                            }}
                            required={true}
                            fileValidateTypeDetectType={(source, type) =>
                              new Promise((resolve, reject) => {
                                resolve(type);
                              })
                            }
                            allowFileEncode={true}
                            allowImageTransform
                            imagePreviewHeight={200}
                            imageCropAspectRatio={"1:1"}
                            imageResizeTargetWidth={70}
                            imageResizeTargetHeight={70}
                            imageResizeMode={"cover"}
                            imageTransformOutputQuality={50}
                            imageTransformOutputQualityMode="optional"
                            imageTransformBeforeCreateBlob={(canvas) =>
                              new Promise((resolve) => {
                                const ctx = canvas.getContext("2d");
                                ctx.font = "48px serif";
                                ctx.fillText("Hello world", 10, 50);
                                resolve(canvas);
                              })
                            }
                            imageTransformAfterCreateBlob={(blob) =>
                              new Promise((resolve) => {
                                resolve(blob);
                              })
                            }
                            instantUpload={false}
                            files={files}
                            onupdatefiles={(file) => {
                              if (file) {
                                setFiles(file[0]?.file);
                              } else {
                                setFiles(null);
                              }
                            }}
                            allowMultiple={false}
                            maxFiles={1}
                            credits={false}
                            fileSizeBase={4000}
                            allowFileTypeValidation={true}
                            labelFileTypeNotAllowed="Invalid file type"
                            fileValidateTypeLabelExpectedTypes="Expects Images"
                            acceptedFileTypes={["image/jpeg", "image/png"]}
                            name="Image"
                            labelIdle='Drag & Drop your Image or <span class="filepond--label-action">Browse</span>'
                            className={"w-full"}
                            allowProcess={false}
                          />
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={() => {
                  return (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server name
                      </FormLabel>
                      <FormControl>
                        <Input
                          required={true}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible: ring-offset-0"
                          ref={inputRef}
                          placeholder="Enter server name "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" className="w-fit">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InitialModal;
