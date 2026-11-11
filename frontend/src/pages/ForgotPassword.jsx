import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"

import { MdOutlineMailOutline } from "react-icons/md";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = () => {
    
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <form onSubmit={handleSubmit(submitHandler)} className="flex w-full max-w-md flex-col items-center gap-4">
        <h1 className="mb-4 text-3xl font-bold">Reset Password</h1>

        <p className="text-lg mt-5">Enter the registered email</p>
        <div className="flex w-full items-center gap-2 rounded-full border-2 px-4 font-bold">
          <MdOutlineMailOutline size="18px" aria-hidden="true" />
          <input
            {...register("email", {
              required: "Field is required.",
              minLength: { value: 8, message: "Minimum length must be 8" },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format"
              }
            })}
            type="email"
            placeholder="Email"
            className="w-full py-2 outline-none"
          />
        </div>

        <button type="submit" className="mt-7 w-full cursor-pointer rounded-full bg-cyan-400 px-4 py-2 text-xl font-extrabold text-black duration-300 hover:scale-95 hover:bg-cyan-600">
          Send reset link
        </button>

        <p className="w-full text-center text-base sm:text-lg">
          Don't have an account? <Link to='/register' className="text-blue-600 underline">Sign up here</Link>
        </p>

         <Link to="/" className="text-center text-lg text-blue-600 underline">Go to home page</Link>
      </form>
    </div>
  )
}

export default ForgotPassword