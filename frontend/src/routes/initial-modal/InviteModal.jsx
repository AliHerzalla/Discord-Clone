import { useState, useContext } from "react";

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
import { Check, Copy } from "lucide-react";

const InviteModal = () => {
  const [copied, setCopied] = useState(false);

  const { isDialogOpenInvite, setIsDialogOpenInvite, inviteCodeContext } =
    useContext(MainProvider);

  const inviteUrl = `${window?.location?.origin}/invite/${inviteCodeContext}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
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
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          {/* <Button
            onClick={onNew}
            disabled={loadingButtonState}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
