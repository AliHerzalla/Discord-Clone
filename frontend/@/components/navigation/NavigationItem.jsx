import { useParams, useNavigate } from "react-router-dom";
// import NavigationAction from "./NavigationAction";
import ActionToolTip from "../ui/action-tooltip";
import { cn } from "../../lib/utils";
import PropTypes from "prop-types";

const NavigationItem = ({ id, imageUrl, name }) => {
  const params = useParams();
  const navigate = useNavigate();

  const navigateToOtherServer = (event) => {
    event.preventDefault();
    navigate(`/servers/${id}`);
  };

  return (
    <ActionToolTip align={"center"} side={"right"} label={name}>
      <button
        className={"group relative flex items-center"}
        onClick={(event) => navigateToOtherServer(event)}
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <img src={imageUrl} alt="Channel" className={"object-cover"} />
        </div>
      </button>
    </ActionToolTip>
  );
};

export default NavigationItem;

NavigationItem.propTypes = {
  id: PropTypes.any,
  imageUrl: PropTypes.any,
  name: PropTypes.any,
};
