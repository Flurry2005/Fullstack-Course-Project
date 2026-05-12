import { useAuth } from "../../Context/useAuth";
import MiniButton from "../../HomePage/HomePageComponents/MiniButtonLink";
import NavigationLink from "./NavigationLink";

interface Props {
  additionalClasses?: string;
}

function AuthButtons({ additionalClasses }: Props) {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <button
            onClick={() => {
              logout();
            }}
            className={
              "bg-red-400 px-3 py-1.5 rounded-2xl font-semibold text-white cursor-pointer " +
              additionalClasses
            }
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <NavigationLink to="/login" text="Login" />
          <MiniButton to={"/register"} text={"Join"} />
        </>
      )}
    </div>
  );
}

export default AuthButtons;
