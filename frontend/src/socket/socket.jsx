import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { addSocket } from "../slice/userSlice";
function SocketProvider({ children }) {
  const [isOnline, setIsOnline] = useState(null);
  const[socket,setSocket]=useState(null);
  const auth = useSelector((state) => state.auth.authenticate);
  const dispatch=useDispatch()
  // Connect to the socket server.
  useEffect(() => {
    const socket = io("http://localhost:5173");
    console.log("hello");
    console.log(socket);
  
      // setSocket(socket);
      // dispatch(addSocket(socket));
    // return () => {
    //   socket.disconnect();
    //   setSocket(null);
      
    // };
  }, [dispatch]);

  return <>{children}</>;
}

export default SocketProvider;
