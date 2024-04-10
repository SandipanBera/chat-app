import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../api-call/authentication";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authentication } from "../../slice/authSlice";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    auth
      .signIn(data)
      .then((response) => {

        if (response.statusCode !== 200) {
          toast.error("Invalid email or password");
        } else {
          dispatch(authentication(true));
          //after successfull login userid store in localstorage
          localStorage.setItem("userId",response.data._id)
          toast.success("Signed in successfully");
          // Redirecting user to main page after successful login
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen  mx-4">
       <section className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4  bg-[rgba(47,_163,_177,_0.2)] rounded-[16px] [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1)] backdrop-filter backdrop-blur-[5px] border-[1px] border-[rgba(47,163,177,0.3)]">
      <div className="flex items-center justify-center px-6 py-10 sm:px-6 sm:py-10 lg:px-8 lg:py-10 ">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md w-full">
          <div className="flex flex-row justify-center">
               <h2 className="text-center inline-block text-base sm:text-2xl font-bold leading-tight text-black">
            Sign In to
          </h2>
          &nbsp;<span className=" text-lg sm:text-2xl font-bold leading-tight text-slate-600"> Konnekt</span>
          </div>
     
          <p className="mt-2 text-center text-base text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              to={"/sign-up"}
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Username{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Username"
                    id="name"
                    {...register("username", {
                      required: "This Field is Required.",
                    })}
                  ></input>
                  {errors.username && <p>{errors.username.message}</p>}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    {...register("password", { required: true })}
                  ></input>
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className=" btn glass inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5  leading-7 text-white"
                >
                  Sign In <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    </div>
   
  );
}

export default SignIn;
