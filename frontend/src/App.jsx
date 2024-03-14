import { Outlet } from "react-router-dom";

function App() {
  return (
      <div className="container min-h-screen p-4 flex justify-center items-center">
        <Outlet />
      </div>

  );
}

export default App;
