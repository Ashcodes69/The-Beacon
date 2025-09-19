import React from "react";
import Image from "next/image";

function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0B0F2A]">
      {/* Wrapper */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 bg-[#10172A] p-8 rounded-2xl shadow-lg shadow-[#3A0CA3]">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Image
            src={"/Gemini_Generated_Image_fnc1jffnc1jffnc1.png"}
            height={300}
            width={300}
            alt="Logo-of-the-beacon"
            className="rounded-xl"
          />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#38BDF8] mb-6">
            Create an Account
          </h2>
          <form className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#38BDF8]"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-2 mt-1 text-[#93C5FD] bg-[#0B0F2A] border border-[#1E3A8A] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] placeholder-gray-500"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#38BDF8]"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 mt-1 text-[#93C5FD] bg-[#0B0F2A] border border-[#1E3A8A] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] placeholder-gray-500"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#38BDF8]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 mt-1 text-[#93C5FD] bg-[#0B0F2A] border border-[#1E3A8A] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] placeholder-gray-500"
                placeholder="********"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-[#1E3A8A] rounded-lg hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#2563EB]"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-[#64748B] mt-4">
            Already have an account?{" "}
            <a href="#" className="text-[#38BDF8] hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
