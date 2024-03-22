import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import auth from "../feature/authentication";
import { authentication } from "../slice/authSlice";
import toast from "react-hot-toast";
function Navbar() {
    const isAuthenticate = useSelector((state) => state.auth);
    const dispatch=useDispatch();
    const navigate = useNavigate()
    const handleLogout = () => {
        auth.logout().then(response => {
            if (response?.statusCode===200) {
                dispatch(authentication(false))
                toast.success(response.message)
                navigate('/')
            } else {
                toast.error("Error Occurred")
            }
        }
        )
    }
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1 gap-1">
        <div className="w-14 rounded-full overflow-hidden  ">
          <img src="/logo.jpg" alt="" />
        </div>
        <a className="btn btn-ghost text-xl">Konnekt</a>
      </div>
        <div className="flex-none gap-2">
          {isAuthenticate?.authenticate?<><div className="form-control">
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
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
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
             <Link to={"/changePassword"}> <a>Change Password </a></Link> 
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
                  </div></> : <>
                      <button className="btn btn-ghost" onClick={()=>{navigate('/sign-in')}}>Sign In</button>
                      <button className="btn btn-ghost" onClick={()=>{navigate('/sign-up')}}>Sign Up</button>    
          </>}
        </div>
    </div>
  );
}

export default Navbar;
