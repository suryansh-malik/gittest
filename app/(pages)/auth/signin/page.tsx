"use client";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Signin = () => {
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  type FormData = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data: FormData) => {
    console.log(data);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    console.log(result)
    if (result?.error) {
      const errors = JSON.parse(result.error);
      console.log(errors.code)
      if (errors.code === "EMAIL_NOT_FOUND") {
        setError("email", { message: errors.message }); // Set the error from NextAuth
      } else if(errors.code === "INVALID_PASSWORD"){
        setError("password", { message: errors.message }); // Set the error from NextAuth
      }
      if(errors.code ==="GOOGLE_ACCOUNT_EXISTS"){
        signIn('google', { callbackUrl: '/' })
      }
    } else {
      console.log(
        "successfully login using react hook form and zod validation with custom error"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
        <p className="text-sm text-gray-400 mb-6">Sign in to your account</p>

        <button className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white py-2 rounded-lg mb-4 hover:bg-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 ..." />
          </svg>
          Continue with GitHub
        </button>

        <button className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white py-2 rounded-lg mb-6 hover:bg-gray-600">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 12H8m0 0l4-4m-4 4l4 4"
            />
          </svg>
          Continue with SSO
        </button>

        <div className="flex items-center mb-6">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="text-gray-500 mx-4 text-sm">or</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm text-gray-400">Password</label>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition"
          >
            {isSubmitting ? "Signin..." : "Signin"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <a href="#" className="text-white underline hover:text-green-500">
            Sign Up Now
          </a>
        </p>
      </div>
    </div>
  );
};
export default Signin;
