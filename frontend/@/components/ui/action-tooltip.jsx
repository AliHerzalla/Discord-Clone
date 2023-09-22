import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import PropTypes from "prop-types";

const ActionToolTip = ({ children, label, side, align }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className={"font-semibold text-sm capitalize"}>
            {label?.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionToolTip;

ActionToolTip.propTypes = {
  children: PropTypes.any,
  label: PropTypes.any,
  side: PropTypes.any,
  align: PropTypes.any,
};
