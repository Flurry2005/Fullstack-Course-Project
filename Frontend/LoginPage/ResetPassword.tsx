import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Lock, ArrowLeft } from "lucide-react";
import NavigationLink from "../NavBar/NavbarComponents/NavigationLink";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setMessage("");

    if (!password || !confirmPassword) {
      setError("Please fill in both fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex flex-col justify-center items-center bg-[#f4f0fb] w-full min-h-screen font-sans">
        <div
          className="flex flex-col items-center bg-white mx-4 px-8 pt-12 pb-10 rounded-[2rem] w-full max-w-105"
          style={{
            boxShadow:
              "0 20px 60px -10px rgba(100, 60, 180, 0.12), 0 8px 24px -6px rgba(100, 60, 180, 0.08)",
          }}
        >
          <h2 className="mb-3 font-bold text-[#1a1a2e] text-[1.55rem] text-center">
            Invalid reset link
          </h2>
          <p className="mb-6 text-[#6b6b7b] text-sm text-center">
            This link is missing a reset token. Please request a new one.
          </p>
          <div className="flex items-center gap-1.5 font-semibold text-[#5b4dc7] text-sm">
            <ArrowLeft size={16} strokeWidth={2.5} />
            <NavigationLink
              to="/forgotPassword"
              text="Back to Forgot Password"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center bg-[#f4f0fb] w-full min-h-screen font-sans">
      <div
        className="flex flex-col items-center bg-white mx-4 px-8 pt-12 pb-10 rounded-[2rem] w-full max-w-105"
        style={{
          boxShadow:
            "0 20px 60px -10px rgba(100, 60, 180, 0.12), 0 8px 24px -6px rgba(100, 60, 180, 0.08)",
        }}
      >
        {/* Icon */}
        <div className="flex justify-center items-center bg-blue-500 mb-5 rounded-2xl w-14 h-14">
          <Lock className="text-white" size={28} strokeWidth={2.5} />
        </div>

        <h1 className="mb-1 font-bold text-[#1a1a2e] text-[1.35rem] tracking-tight">
          Project Name
        </h1>
        <p className="mb-8 text-[#8a8a9a] text-sm">Recovery Center</p>

        <h2 className="mb-3 font-bold text-[#1a1a2e] text-[1.55rem] text-center">
          Set new password
        </h2>
        <p className="mb-8 max-w-75 text-[#6b6b7b] text-sm text-center leading-relaxed">
          Enter your new password below. Make sure it's at least 8 characters.
        </p>

        {/* Password fields */}
        <div className="mb-4 w-full">
          <label className="block mb-2 font-semibold text-[#1a1a2e] text-xs tracking-wide">
            New password
          </label>
          <div className="flex items-center gap-3 px-4 py-3 border border-[#e0dce8] focus-within:border-[#5b4dc7] rounded-xl focus-within:ring-[#5b4dc720] focus-within:ring-2 transition-all">
            <Lock className="text-[#8a8a9a] shrink-0" size={18} />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[#1a1a2e] text-sm placeholder-[#b0aebe]"
            />
          </div>
        </div>

        <div className="mb-6 w-full">
          <label className="block mb-2 font-semibold text-[#1a1a2e] text-xs tracking-wide">
            Confirm password
          </label>
          <div className="flex items-center gap-3 px-4 py-3 border border-[#e0dce8] focus-within:border-[#5b4dc7] rounded-xl focus-within:ring-[#5b4dc720] focus-within:ring-2 transition-all">
            <Lock className="text-[#8a8a9a] shrink-0" size={18} />
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[#1a1a2e] text-sm placeholder-[#b0aebe]"
            />
          </div>
        </div>

        {/* Error / Success messages */}
        {error && (
          <p className="mb-4 text-red-500 text-sm text-center">{error}</p>
        )}
        {message && (
          <p className="mb-4 text-green-600 text-sm text-center">{message}</p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="hover:opacity-90 disabled:opacity-50 py-3.5 rounded-xl w-full font-bold text-white text-sm tracking-wide active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
          style={{
            background:
              "linear-gradient(135deg, #5b4dc7 0%, #3a2d9e 50%, #2d1b6e 100%)",
            boxShadow: "0 4px 16px -2px rgba(59, 45, 158, 0.4)",
          }}
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>

        <div className="flex items-center gap-1.5 mt-6 font-semibold text-[#5b4dc7] text-sm">
          <ArrowLeft size={16} strokeWidth={2.5} />
          <NavigationLink to="/login" text="Back to Login" />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
