import InputField from "../Components/InputField";
import "../App.css";
import GlowingButton from "../Components/GlowingButton";
import { Link } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async () => {
    // Code for contacting db, use email and password variables. Redirect on success
  };

  return (
    <>
      <main className="flex w-full h-screen">
        {/* Login Section */}
        <section className="flex flex-col items-center bg-[#f9f5ff] w-6/14 h-full">
          <h1 className="self-start mx-8! my-4! text-2xl!">Project Name</h1>
          <div className="mt-40 w-6/10">
            <h2 className="text-[#2C2A51] text-3xl!">Welcome Back</h2>
            <p className="">
              Step into your creative headquarters. Connect with artisans
              worldwide.
            </p>
          </div>

          {/* Container for Login Credentials */}

          <div className="flex flex-col items-center gap-5 mt-10 w-6/10 text-[#2C2A51]">
            {/* Container for Email related */}

            <div className="flex flex-col w-full">
              <label htmlFor="email" className="ml-1">
                Email address
              </label>
              <InputField
                id="email"
                value={email}
                placeholder="name@example.com"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
                additionalClasses="w-full h-12 border-0 bg-[#DDD9FF]"
              ></InputField>
            </div>

            {/* Container for Password related */}

            <div className="flex flex-col w-full">
              <span className="flex flex-row justify-between w-full">
                <label htmlFor="password" className="ml-1">
                  Password
                </label>
                <Link
                  to={"/"}
                  className="font-semibold text-blue-500 text-sm text-center"
                >
                  Forgot password?
                </Link>
              </span>
              <InputField
                id="password"
                value={password}
                type="password"
                placeholder="•••••••••"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
                additionalClasses="w-full h-12 border-0 bg-[#DDD9FF]"
              ></InputField>
            </div>

            {/* Login Button */}
            <GlowingButton outline={false} onClick={() => login}>
              Sign In
            </GlowingButton>
          </div>
          <p className="flex flex-row flex-wrap justify-center gap-2 pt-10 w-6/10 text-nowrap">
            Don't have an account yet?{" "}
            <span className="font-semibold text-blue-500">
              <Link to={"/"} className="text-nowrap">
                Create free account
              </Link>
            </span>
          </p>
        </section>
        {/* Static Image Section */}
        <section className="w-8/14 h-full">
          <img
            src="Island.jpg"
            alt="Island in Ocean"
            className="w-auto h-full object-cover"
          />
        </section>
      </main>
    </>
  );
}

export default LoginPage;
