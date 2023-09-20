import Dropzone from "react-dropzone";
import axios from "axios";
import { Form } from "../../../@/components/ui/form";
import { useState, useRef } from "react";
import { BASE_BACKEND_URL } from "./InitialModal";

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












export function ModalForm({ userId, children }) {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [newServer, setNewServer] = useState({
    serverName: "",
    userId: userId,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

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
          console.log(response);
          if (response.status !== 200)
            throw new Error("Couldn't create server");
          setResponseMessage(response.data.message);
          setTimeout(() => setResponseMessage(""), 3000);
        } else {
          setErrorMsg("Please select a file to add.");
        }
      } else {
        setErrorMsg("Please enter all the field values.");
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
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
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
  };

  // const updateBorder = (dragState) => {
  //   if (dragState === "over") {
  //     dropRef.current.style.border = "2px solid #000";
  //   } else if (dragState === "leave") {
  //     dropRef.current.style.border = "2px dashed #e9ebeb";
  //   }
  // };
  // dropRef.current.style.border = "2px dashed #e9ebeb";

  return (
    <Form>
      <form
        className="space-y-8"
        encType="multipart/form-data"
        onSubmit={handleOnSubmit}
      >
        <div className="space-y-8 px-6">
          {/* upload Section */}

          <Dropzone
            onDrop={onDrop}

            // onDragEnter={() => updateBorder("over")}
            // onDragLeave={() => updateBorder("leave")}
          >
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
                // className="border-dashed border-2 border-[#e9ebeb] p-4 cursor-pointer"
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
              <div className="max-h-full relative">
                <img
                  className="object-contain h-72 w-full m-auto"
                  src={previewSrc}
                  alt="Preview"
                />
                <button
                  className="absolute top-7 right-5 bg-red-500 text-white rounded-full h-6 w-6 flex justify-center items-center hover:bg-red-600"
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
        {children}
      </form>
    </Form>
  );
}
