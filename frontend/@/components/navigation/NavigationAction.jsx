import { Plus } from "lucide-react";
import ActionToolTip from "../ui/action-tooltip";

const NavigationAction = () => {
  return (
    <div>
      <ActionToolTip align={"center"} side={"right"} label={"Add a server"}>
        <button
          className={"group flex items-center outline-none"}
          onClick={() => {
            console.log("Should be open a new dialog for create a new server");
          }}
        >
          <div
            className={
              "flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 bg-neutral-300"
            }
          >
            <Plus
              className={"group-hover:text-white transition text-emerald-500"}
              size={25}
            />
          </div>
        </button>
      </ActionToolTip>
    </div>
  );
};

export default NavigationAction;
