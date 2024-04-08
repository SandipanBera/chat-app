import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import auth from "./api-call/authentication";
import { authentication } from "./slice/authSlice";
import SocketProvider from "./socket/socket";
function App() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    auth
      .currentUser()
      .then((user) => {
        setIsLoading(true);
        if (user.statusCode === 200) {
          dispatch(authentication(true));  
          navigate("/home")
        } else {
          navigate("/")
        }
        
      })
      .finally(() => setIsLoading(false));
  }, [dispatch,navigate]);
  

  return !isLoading ? (
<SocketProvider>
       <div className=" min-h-screen flex flex-wrap content-between ">
      <div className="w-full block">
        <Navbar />
        <Outlet />
        <Toaster />
      </div>
    </div>  
</SocketProvider>
    

   
  ) : null;
}

export default App;
