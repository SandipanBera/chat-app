import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import auth from "../feature/authentication";
function SignUp() {
  const [error, setError] = useState("")
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const currPassword = watch("password", "");
  const onSubmit = (data) => {
    console.log(data)
    auth.registerUser(data).then(response => {
      if (response.statusCode!==200) {
        setError(response.message)
        console.log(response.message);
      } else {
        navigate('/')
         console.log(response)
      }
     
    }).catch(error => {
      console.log(error)
    
    })
  };
  return (
    <section className="w-1/4 bg-[rgba(47,_163,_177,_0.2)] rounded-[16px] [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1)] backdrop-filter backdrop-blur-[5px] border-[1px] border-[rgba(47,163,177,0.3)]">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-16">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-blue-600">
            Already have an account?{" "}
            <Link
              to={"/sign-in"}
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>          
          </p>
          {error && <p className="mt-2 text-center text-base text-blue-600">{error}</p>}
          <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
            <div>
                <label
                  htmlFor="fullname"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Fullname{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Fullname"
                    id="fullname"
                    {...register("fullName", {
                      required: "This Field is Required.",
                    })}
                  ></input>
                  {errors.fullName && <p>{errors.fullName.message}</p>}
                </div>
              </div>
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
                    {...register("userName", {
                      required: "This Field is Required.",
                    })}
                  ></input>
                  {errors.userName && <p>{errors.userName.message}</p>}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    {...register("email", {
                      required: "This Field is Required.",
                    })}
                  ></input>
                  {errors.email && <p>{errors.email.message}</p>}
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
                    {...register("password", {
                      required: "This Field is Required.",
                      minLength: {
                        value: 6,
                        message: "At least 6 characters are needed.",
                      },
                    })}
                    //   , pattern: {
                    //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                    //     message:"The password must contain at least one uppercase letter, one lowercase letter,and one digit"
                    // }
                  ></input>
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirm password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Confirm Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Confirm Password"
                    id="confirm password"
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) => 
                        value ==currPassword || "Passwords do not match."
                      ,
                    })}
                  ></input>
                  {errors.confirmPassword && (
                    <p>{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="gender"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Gender{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <select
                    className="select select-info w-full max-w-xs"
                    id="gender"
                    {...register("gender", {
                      required: "This Field is Required.",
                    })}
                    defaultValue={"DEFAULT"}
                  >
                    <option disabled value="DEFAULT">
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Create Account <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
