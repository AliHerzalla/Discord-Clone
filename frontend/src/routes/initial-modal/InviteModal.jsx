import { useState, useContext, useCallback } from "react";

import { MainProvider } from "../../contextAPI/MainContextProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../@/components/ui/dialog";

import { Button } from "../../../@/components/ui/button";
import { Label } from "../../../@/components/ui/label";
import { Input } from "../../../@/components/ui/input";
import { Check, Copy, RefreshCw } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";
const BASE_BACKEND_URL = `${import.meta.env.VITE_MAIN_BACKEND_URL}${
  import.meta.env.VITE_MAIN_BACKEND_PORT
}`;

const InviteModal = () => {
  const [copied, setCopied] = useState(false);
  const { serverId } = useParams();

  const {
    isDialogOpenInvite,
    setIsDialogOpenInvite,
    inviteCodeContext,
    setInviteCodeContext,
  } = useContext(MainProvider);

  const inviteUrl =
    typeof window !== "undefined" && window.location.origin
      ? `${window?.location?.origin}/invite/${inviteCodeContext}`
      : "";

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleUpdateInviteCode = async () => {
    try {
      const response = await axios.patch(
        `${BASE_BACKEND_URL}/find-unique-server-by-server-id/${serverId}`
      );
      // console.log(response);
      setInviteCodeContext(response.data.data.inviteCode)
    } catch (error) {
      console.log(error);
    }
  };

  //   const onNew = () => {};

  return (
    <Dialog
      open={isDialogOpenInvite}
      onOpenChange={() => setIsDialogOpenInvite((pre) => !pre)}
    >
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={true}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button onClick={onCopy} size="icon">
              {copied ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>
          <Button
            onClick={handleUpdateInviteCode}
            // disabled={loadingButtonState}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
