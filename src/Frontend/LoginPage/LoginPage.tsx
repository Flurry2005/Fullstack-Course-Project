import InputField from "../Components/General/InputField";
import "../App.css";
import GlowingButton from "../Components/General/GlowingButton";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

function LoginPage() {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("‎ ");

  const [loginMode, setLoginMode] = useState<boolean>(true);

  const navigate = useNavigate();

  const login = async () => {
    // Code for contacting db, use email and password variables. Redirect on success
    console.log("Trying to log in....");
    const response = await Login(email, password);

    if (response?.success) {
      //Success Login
      setErrorMessage("‎ ");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      //Failed login
      setErrorMessage(response?.data.error);
    }
  };

  const register = async () => {
    console.log("Trying to log in....");
    const response = await Register(fullname, email, password);

    if (response?.success) {
      //Success Register
      setErrorMessage("‎ ");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      //Failed login
      setErrorMessage(response?.data.error);
    }
  };

  return (
    <>
      <main className="flex w-full h-screen">
        {/* Login Section */}
        <section className="flex flex-col items-center bg-[#f9f5ff] w-6/14 h-full">
          <h1 className="self-start mx-8! my-4! text-2xl!">Project Name</h1>
          <div className="mt-40 w-6/10">
            <h2 className="text-[#2C2A51] text-3xl!">
              {loginMode ? "Welcome Back" : "Join the craft."}
            </h2>
            <p className="">
              {loginMode
                ? "Step into your creative headquarters. Connect with artisans worldwide."
                : "Start your journey in the digital atelier today."}
            </p>
          </div>

          {/* Container for Login Credentials */}

          <div className="flex flex-col items-center gap-5 mt-10 w-6/10 text-[#2C2A51]">
            {/* Container for Fullname related */}
            {!loginMode && (
              <div className="flex flex-col w-full">
                <label htmlFor="fullname" className="ml-1">
                  Fullname
                </label>
                <InputField
                  id="fullname"
                  value={fullname}
                  placeholder="John Doe"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFullname(e.target.value);
                  }}
                  additionalClasses="w-full h-12 border-0 bg-[#DDD9FF]"
                ></InputField>
              </div>
            )}

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
            <p className="text-red-500">{errorMessage}</p>
            {/* Login Button */}
            <GlowingButton
              outline={false}
              onClick={() => {
                if (loginMode) login();
                else register();
              }}
            >
              {loginMode ? "Sign In" : "Create Free Account"}
            </GlowingButton>
          </div>
          <p className="flex flex-row flex-wrap justify-center gap-2 pt-10 w-6/10 text-nowrap">
            {loginMode
              ? "Don't have an account yet?"
              : "Already have an account?"}{" "}
            <span className="font-semibold text-blue-500">
              <a
                className="text-nowrap"
                onClick={() => setLoginMode((p) => !p)}
              >
                {loginMode ? "Create free account" : "Log in"}
              </a>
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
