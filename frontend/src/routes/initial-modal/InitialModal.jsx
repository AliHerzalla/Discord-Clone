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
import { ModalForm } from "./ModalForm";
import { useContext } from "react";
import { globalContext } from "../../contextAPI/globalProvider";

export const BASE_BACKEND_URL = `${import.meta.env.VITE_MAIN_BACKEND_URL}${
  import.meta.env.VITE_MAIN_BACKEND_PORT
}`;

const InitialModal = () => {
  const { user } = useUser();
  const { loadingButtonState } = useContext(globalContext);

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
        <ModalForm userId={user?.id}>
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
        </ModalForm>
      </DialogContent>
    </Dialog>
  );
};

export default InitialModal;
