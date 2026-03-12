import { Link, Outlet, useLocation, Navigate } from "react-router";
import { ModeToggle } from "@/components/mode-toggle";
import { useAppContext } from "@/App";
const AuthLayout = () => {
  const { pathname } = useLocation();
  const { user } = useAppContext();

  if (user) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="py-3 px-5 border-b">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">
            <Link to={"/"}>Name</Link>
          </h1>
          <nav className="flex gap-4 items-center">
            {pathname === "/sign-in" ? (
              <Link to={"/sign-up"}>SignUp</Link>
            ) : (
              <Link to={"/sign-in"}>SignIn</Link>
            )}

            <ModeToggle />
          </nav>
        </div>
      </div>

      <div className="w-full max-w-xl mx-auto px-5 py-10">
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
