import InputField from "../Components/General/InputField";
import GlowingButton from "../Components/General/GlowingButton";

function RecoverPassword() {
  return (
    <main className="flex justify-center items-center bg-[#f9f5ff] w-full h-screen">
      <div className="flex flex-col justify-center items-center bg-white shadow-2xl p-5 rounded-4xl w-1/3 h-3/4 text-center">
        <div className="flex flex-col justify-center items-center bg-[#2563eb] mb-5 rounded-2xl w-20 h-20 text-[#efe9ff] text-xl">
          <i className="fa-rotate-left fa-solid"></i>
        </div>
        <h1 className="font-semibold text-[#23235b] text-5xl leading-tight">
          ProjectName
        </h1>
        <p className="mb-10 text-gray-600">Recovery Center</p>

        <h2 className="mb-3 font-semibold text-[#23235b] text-3xl leading-tight">
          Forgot Password?
        </h2>
        <p className="mb-10 text-gray-600">
          No Worries, it happens to the best of us. Enter the email
          <br /> associated with your account and we'll send a reset link
        </p>

        <div className="flex flex-col mb-5 px-15 w-full text-left">
          <label htmlFor="email">Email address</label>
          <InputField id="email" placeholder={"email@example.com"} />
        </div>
        <GlowingButton
          outline={false}
          children={"Send Reset Link"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </main>
  );
}

export default RecoverPassword;
