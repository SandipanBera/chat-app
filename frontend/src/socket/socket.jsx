import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { addIsOnline, addSocket } from "../slice/userSlice";
function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const auth=useSelector((state)=>state.user.userData)
  const dispatch = useDispatch();
  useEffect(() => {
    //connect to the server if user is authenticated.
    if (auth) {
      // Connect to the socket server with credentials.
      const socket = io("http://localhost:8080", {
        withCredentials: true,
        query: {
          //get userid from localstorage and pass it to the server as a parameter.
          userId:localStorage.getItem('userId'),
        }
      });
      setSocket(socket);
      //dispatch socket for further use in other components.
      socket.on("connect", () => {
        console.log("Connected to server");
      });
      socket.on("getOnlineUser", (onlineUsers) => {
        dispatch(addIsOnline(onlineUsers))
      });
      return () => {
        //after component unmounted remove listener and disconnect from the server.
        socket.disconnect();
        setSocket(null);
      };
    }
  }, [auth, dispatch]);

  return <>{children}</>;
}

export default SocketProvider;
