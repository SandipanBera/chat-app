import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import auth from "../api-call/authentication";
import { authentication } from "../slice/authSlice";
import toast from "react-hot-toast";
import { Userdata } from "../slice/userSlice";
function Navbar() {
  const isAuthenticate = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.logout().then((response) => {
      if (response?.statusCode === 200) {
        dispatch(authentication(false));
        dispatch(Userdata(null));
        toast.success(response.message);
        navigate("/");
      } else {
        toast.error("Error Occurred");
      }
    });
  };
  return (
    <div className=" navbar bg-base-100 ">
      <div className="flex-1 gap-0 sm:gap-1">
        <div className="w-8 sm:w-14 rounded-full overflow-hidden">
          <img src="/logo.jpg" alt="" />
        </div>
        <a className="btn btn-ghost text-xl">Konnekt</a>
      </div>
      <div className="flex-none gap-2">
        {isAuthenticate?.authenticate ? (
          <>
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.userData?.profileImage?.url}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <Link to={"/changePassword"}>
                    {" "}
                    <span>Change Password </span>
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div
              className="dropdown dropdown-end
            block sm:hidden "
            >
              <div tabIndex={0} role="button" className="btn m-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to={"sign-up"}>Sign Up</Link>
                </li>
                <li>
                  <Link to={"sign-in"}>Sign In</Link>
                </li>
              </ul>
            </div>
            <div className="sm:block hidden">
              <button
                className="btn btn-ghost "
                onClick={() => {
                  navigate("/sign-in");
                }}
              >
                Sign In
              </button>
              <button
                className="btn btn-ghost "
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
