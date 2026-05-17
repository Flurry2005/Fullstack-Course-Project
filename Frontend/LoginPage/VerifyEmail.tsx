import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import { Link } from "react-router-dom";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ token }),
        });
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed.");
        }
      } catch {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center bg-[#f9f5ff] w-full min-h-screen font-sans">
      <div
        className="flex flex-col items-center bg-white mx-4 px-8 pt-12 pb-10 rounded-4xl w-full max-w-105"
        style={{
          boxShadow:
            "0 20px 60px -10px rgba(100, 60, 180, 0.12), 0 8px 24px -6px rgba(100, 60, 180, 0.08)",
        }}
      >
        {status === "loading" && (
          <>
            <div className="flex justify-center items-center bg-[#DDD9FF] mb-5 rounded-2xl w-14 h-14">
              <Loader className="text-[#2C2A51] animate-spin" size={28} />
            </div>
            <h2 className="mb-3 font-bold text-[#2C2A51] text-[1.55rem] text-center">
              Verifying your email
            </h2>
            <p className="text-[#6b6b7b] text-sm text-center">
              Please wait a moment...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="flex justify-center items-center bg-green-100 mb-5 rounded-2xl w-14 h-14">
              <CheckCircle className="text-green-500" size={28} />
            </div>
            <h1 className="mb-1 font-bold text-[#2C2A51] text-[1.35rem] tracking-tight">
              Project Name
            </h1>
            <p className="mb-8 text-[#8a8a9a] text-sm">Email Verified</p>
            <h2 className="mb-3 font-bold text-[#2C2A51] text-[1.55rem] text-center">
              You're all set!
            </h2>
            <p className="mb-8 max-w-75 text-[#6b6b7b] text-sm text-center leading-relaxed">
              {message}
            </p>
            <Link
              to="/login"
              className="hover:opacity-90 py-3.5 rounded-xl w-full font-bold text-white text-sm text-center tracking-wide active:scale-[0.98] transition-all duration-200"
              style={{
                background:
                  "linear-gradient(135deg, #5b4dc7 0%, #3a2d9e 50%, #2d1b6e 100%)",
                boxShadow: "0 4px 16px -2px rgba(59, 45, 158, 0.4)",
              }}
            >
              Go to Login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="flex justify-center items-center bg-red-100 mb-5 rounded-2xl w-14 h-14">
              <XCircle className="text-red-500" size={28} />
            </div>
            <h1 className="mb-1 font-bold text-[#2C2A51] text-[1.35rem] tracking-tight">
              Project Name
            </h1>
            <p className="mb-8 text-[#8a8a9a] text-sm">Email Verification</p>
            <h2 className="mb-3 font-bold text-[#2C2A51] text-[1.55rem] text-center">
              Verification failed
            </h2>
            <p className="mb-8 max-w-75 text-[#6b6b7b] text-sm text-center leading-relaxed">
              {message}
            </p>
            <Link
              to="/register"
              className="hover:opacity-90 py-3.5 rounded-xl w-full font-bold text-white text-sm text-center tracking-wide active:scale-[0.98] transition-all duration-200"
              style={{
                background:
                  "linear-gradient(135deg, #5b4dc7 0%, #3a2d9e 50%, #2d1b6e 100%)",
                boxShadow: "0 4px 16px -2px rgba(59, 45, 158, 0.4)",
              }}
            >
              Back to Register
            </Link>
          </>
        )}
      </div>

      <div className="flex flex-col items-center gap-3 mt-8">
        <p className="text-[#a09ab0] text-[0.7rem] uppercase tracking-[0.08em]">
          NEED HELP?{" "}
          <a
            href="/"
            className="hover:text-[#5b4dc7] underline transition-colors"
          >
            CONTACT SUPPORT
          </a>
        </p>
        <p className="text-[#b0abbe] text-[0.65rem]">
          © 2026 Project Name. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;
