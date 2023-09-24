import Dropzone from "react-dropzone";
import axios from "axios";
import { Form } from "../../../@/components/ui/form";
import { useState, useRef, useContext } from "react";
import { BASE_BACKEND_URL } from "./InitialModal";
import { useNavigate } from "react-router-dom";
import { MainProvider } from "../../contextAPI/MainContextProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../@/components/ui/dialog";

import { TailSpin } from "react-loader-spinner";

import { Button } from "../../../@/components/ui/button";
import { useUser } from "@clerk/clerk-react";

/* -------------------------------------------------------------------------- */
/*                              DropZone styling                              */
/* -------------------------------------------------------------------------- */

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

/* ---------------------------- DropZone styling ---------------------------- */

const CreateNewServerModal = () => {
  const { user } = useUser();

  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [newServer, setNewServer] = useState({
    serverName: "",
    userId: user?.id,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const navigate = useNavigate();
  const {
    loadingButtonState,
    setLoadingButtonState,
    isDialogOpen,
    setIsDialogOpen,
  } = useContext(MainProvider);

  const handleInputChange = (event) => {
    setNewServer({
      ...newServer,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const { serverName, userId } = newServer;
      if (serverName.trim() !== "" && userId !== "") {
        if (file) {
          const formData = new FormData();
          formData.append("Image", file);
          formData.append("serverName", serverName);
          formData.append("userId", userId);

          setErrorMsg("");
          setResponseMessage("");
          const response = await axios.post(
            `${BASE_BACKEND_URL}/create-server`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.status !== 200)
            throw new Error("Couldn't create server");
          setResponseMessage(response.data.message);
          setLoadingButtonState(true);
          console.log(response);
          setTimeout(() => {
            console.log(response);
            setResponseMessage("");
            setIsDialogOpen(false);
            return navigate(`/servers/${response?.data?.server?._id}`);
          }, 3000);
        } else {
          setErrorMsg("Please select a file to add.");
        }
      } else {
        setErrorMsg("Please enter all the field values.");
      }
    } catch (error) {
      console.error(error.message);
      error.response && setErrorMsg(error.response.data);
      // error.response &&
      //   setErrorMsg("only upload files with jpg, jpeg, png format.");
    } finally {
      setLoadingButtonState(false);
    }
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png|gif)$/));
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => setIsDialogOpen((pre) => !pre)}
    >
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
        <Form>
          <form
            className="space-y-8"
            encType="multipart/form-data"
            onSubmit={handleOnSubmit}
          >
            <div className="space-y-8 px-6">
              {/* upload Section */}
              <Dropzone onDrop={onDrop}>
                {({
                  getRootProps,
                  getInputProps,
                  isFocused,
                  isDragAccept,
                  isDragReject,
                }) => (
                  <div
                    {...getRootProps({
                      className: "drop-zone",
                      style: {
                        ...baseStyle,
                        ...(isFocused ? focusedStyle : {}),
                        ...(isDragAccept ? acceptStyle : {}),
                        ...(isDragReject ? rejectStyle : {}),
                      },
                    })}
                    ref={dropRef}
                  >
                    <input {...getInputProps()} />
                    <p>Drag and drop a file OR click here to select a file</p>
                    {file && (
                      <div>
                        <strong>Selected file:</strong> {file.name}
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
              {previewSrc ? (
                isPreviewAvailable ? (
                  <div className="h-48 w-48 relative m-auto ">
                    <img
                      className="object-fil rounded-full h-full w-full "
                      src={previewSrc}
                      alt="Preview"
                    />
                    <button
                      className="absolute top-3 right-4 bg-rose-500 text-white rounded-full h-4 w-4 p-4 flex justify-center items-center shadow-xl hover:bg-rose-600 "
                      onClick={() => {
                        setPreviewSrc("");
                        setFile(null);
                        setIsPreviewAvailable(false);
                      }}
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <div className="preview-message">
                    <p>No preview available for this file</p>
                  </div>
                )
              ) : (
                <div className="preview-message">
                  <p>Image preview will be shown here after selection</p>
                </div>
              )}

              {/* upload Section */}
              {/* server name */}
              <div className="flex items-center justify-center text-center flex-col">
                <label
                  className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70 block mb-2 self-start"
                  htmlFor="serverName"
                >
                  Server Name
                </label>
                <input
                  className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible: ring-offset-0  shadow appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="serverName"
                  id="serverName"
                  value={newServer.serverName || ""}
                  placeholder="Enter Server Name"
                  onChange={handleInputChange}
                />
                {errorMsg && (
                  <p className="uppercase text-xs font-bold text-red-600 dark:text-red-600 block mt-2 self-start">
                    {errorMsg}
                  </p>
                )}
                {responseMessage && (
                  <p className="uppercase text-xs font-bold text-green-600 dark:text-green-600 block mt-2 self-start">
                    {responseMessage}
                  </p>
                )}
              </div>
              {/* server name */}
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" className="w-fit">
                {loadingButtonState ? (
                  <TailSpin
                    height="32"
                    width="32"
                    color="white"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewServerModal;
