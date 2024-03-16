import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import auth from '../feature/authentication';
import { ArrowRight } from 'lucide-react'
function SignIn() {
  const [error, setError] = useState("")
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data)
    auth.signIn(data).then(response => {
      if (response.statusCode!==200) {
        setError(response.message)
        console.log(response.message);
      } else {
         console.log(response)
      }
     
    }).catch(error => {
      console.log(error)
    
    })
  };
  return (
    <section className='w-1/4 bg-[rgba(47,_163,_177,_0.2)] rounded-[16px] [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1)] backdrop-filter backdrop-blur-[5px] border-[1px] border-[rgba(47,163,177,0.3)]'>
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-16 ">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">        
              <p className="mt-2 text-center text-base text-blue-600">
                Don&apos;t have an account?{' '}
                <Link
                  to={"/sign-up"}
                  className="font-medium text-black transition-all duration-200 hover:underline"
                >
                  Sign Up
                </Link>
          </p>
          {error && <p className="mt-2 text-center text-base text-blue-600">{error}</p>}
              <form  className="mt-8" onSubmit={handleSubmit(onSubmit)} >
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                      {' '}
                      Username{' '}
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
                      <label htmlFor="password" className="text-base font-medium text-gray-900">
                        {' '}
                        Password{' '}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                    id="password"
                    {...register('password',{required:true})}
                  ></input>
                   {errors.password && <p>{errors.password.message}</p>}
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Sign In <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
  )
}

export default SignIn