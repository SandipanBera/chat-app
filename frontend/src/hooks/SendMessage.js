import toast from "react-hot-toast";
import message from "../api-call/message";
import { useDispatch, useSelector } from "react-redux";
import { setConversation } from "../slice/conversationSlice";

function useSendMessage() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.conversations.currentConversation);
  function sendMessage(reciveMessage) {
    message
      .sendMessage(id, reciveMessage)
      .then((res) => {
        if (res.statusCode !== 200) {
          throw res;
        }
        dispatch(setConversation(reciveMessage));
      })
      .catch((error) => toast.error(error.message));
  }
  return sendMessage;
}

export default useSendMessage;
