import toast from "react-hot-toast";
import message from "../api-call/message";
import { useDispatch, useSelector } from "react-redux";
import { setConversation, setNewMessage } from "../slice/conversationSlice";
import { setIsOpen } from "../slice/componentSlice";

function useSendMessage() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.conversations);
  const id = selector.currentConversation?._id;

  function sendMessage(reciveMessage, image, imageName = "") {
    //if any message and image not present then return to avoid spaming server with empty data
    if (!image && !reciveMessage) return;
    message
      .sendMessage(id, reciveMessage,image, imageName)
      .then((res) => {
        if (res.statusCode !== 200) {
          throw res;
        }
        dispatch(setNewMessage(res.data));
        dispatch(setIsOpen(false))
      })
      .catch((error) => toast.error(error.message));
  }
  return sendMessage;
}

export default useSendMessage;
