import { useAuth } from "../../Context/useAuth";

function Logo() {
  const { user } = useAuth();
  return (
    <h1 className="font-bold text-2xl! text-indigo-500!">
      {user?.username || "ProjectName"}
    </h1>
  );
}

export default Logo;
