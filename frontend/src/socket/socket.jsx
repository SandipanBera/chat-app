import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { addIsOnline} from "../slice/userSlice";
import { setNewMessage } from "../slice/conversationSlice";
function SocketProvider({ children }) {
  const auth=useSelector((state)=>state.user.userData)
  const dispatch = useDispatch();
  useEffect(() => {
    //connect to the server if user is authenticated.
    if (auth) {
      // Connect to the socket server with credentials.
      const socket = io("https://chat-app-a75d.onrender.com", {
        withCredentials:true,
        query: {
          //get userid from localstorage and pass it to the server as a parameter.
          userId:localStorage.getItem('userId'),
        }
      });
  
      socket.on("connect", () => {
        console.log("Connected to server");
      });
      socket.on("getOnlineUser", (onlineUsers) => {
        dispatch(addIsOnline(onlineUsers))
      });
      socket.on("getMessage", (newMessage) => {
        dispatch(setNewMessage(newMessage))
        const notificationSound = new Audio('/notification.mp3');
        notificationSound.play();
      })
      return () => {
        //after component unmounted remove listener and disconnect from the server.
        socket.disconnect();
        socket.off(["getOnlineUser","getMessage"]);
      };
    }
  }, [auth, dispatch]);

  return <>{children}</>;
}

export default SocketProvider;
