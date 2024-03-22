import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar";
import Container from "./components/container/container";

function App() {
  return (
    <div className="min-w-full min-h-screen">
      <Navbar />
      <Container>
        <Outlet />
      </Container>
      <Toaster />
    </div>
  );
}

export default App;
