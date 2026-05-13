import React, { useState } from "react";
import { RotateCcw, Lock, Mail, ArrowLeft } from "lucide-react";
import NavigationLink from "../NavBar/NavbarComponents/NavigationLink";

function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_DEV === "true" ? "http://localhost:3000" : "https://fullstackapi.liamjorgensen.dev"}/api${"/forgot-password"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email }),
        },
      );
      const data = await res.json();
      setMessage(data.message);
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#f4f0fb] w-full min-h-screen font-sans">
      {/* Main Card */}
      <div
        className="flex flex-col items-center bg-white mx-4 px-8 pt-12 pb-10 rounded-[2rem] w-full max-w-[420px]"
        style={{
          boxShadow:
            "0 20px 60px -10px rgba(100, 60, 180, 0.12), 0 8px 24px -6px rgba(100, 60, 180, 0.08)",
        }}
      >
        {/* Icon */}
        <div className="flex justify-center items-center bg-blue-500 mb-5 rounded-2xl w-[56px] h-[56px]">
          <div className="relative flex justify-center items-center">
            <RotateCcw className="text-white" size={28} strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-1 font-bold text-[#1a1a2e] text-[1.35rem] tracking-tight">
          Project Name
        </h1>
        <p className="mb-8 text-[#8a8a9a] text-sm">Recovery Center</p>

        {/* Heading */}
        <h2 className="mb-3 font-bold text-[#1a1a2e] text-[1.55rem] text-center">
          Forgot password?
        </h2>
        <p className="mb-8 max-w-[300px] text-[#6b6b7b] text-sm text-center leading-relaxed">
          No worries, it happens to the best of us. Enter the email associated
          with your account and we'll send a reset link.
        </p>

        {/* Email Input */}
        <div className="mb-6 w-full">
          <label className="block mb-2 font-semibold text-[#1a1a2e] text-xs tracking-wide">
            Email address
          </label>
          <div className="flex items-center gap-3 px-4 py-3 border border-[#e0dce8] focus-within:border-[#5b4dc7] rounded-xl focus-within:ring-[#5b4dc720] focus-within:ring-2 transition-all">
            <Mail className="text-[#8a8a9a] shrink-0" size={18} />
            <input
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[#1a1a2e] text-sm placeholder-[#b0aebe]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="hover:opacity-90 py-3.5 rounded-xl w-full font-bold text-white text-sm tracking-wide active:scale-[0.98] transition-all duration-200 cursor-pointer"
          style={{
            background:
              "linear-gradient(135deg, #5b4dc7 0%, #3a2d9e 50%, #2d1b6e 100%)",
            boxShadow: "0 4px 16px -2px rgba(59, 45, 158, 0.4)",
          }}
          disabled={loading || !email}
          onClick={handleSubmit}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {/* Back to Login */}
        <div className="flex items-center gap-1.5 mt-6 font-semibold text-[#5b4dc7] text-sm">
          <ArrowLeft size={16} strokeWidth={2.5} />
          <NavigationLink to="/login" text="Back to Login" />
        </div>
      </div>

      {/* Footer area */}
      <div className="flex flex-col items-center gap-3 mt-8">
        <p className="text-[#a09ab0] text-[0.7rem] uppercase tracking-[0.08em]">
          NEED HELP?{" "}
          <a
            href="/services"
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

export default RecoverPassword;
