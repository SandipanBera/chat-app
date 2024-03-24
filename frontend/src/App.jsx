import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar";
import Container from "./components/container/container";

function App() {
  return (
   
     <div className="w-full min-h-screen  overflow-hidden">
    <Navbar />
      <Container>
        <Outlet />
      </Container>
      <Toaster />
    </div> 
    
  );
}

export default App;
