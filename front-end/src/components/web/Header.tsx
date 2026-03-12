import { Link } from "react-router";
import { ModeToggle } from "../mode-toggle";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSignOut } from "@/hooks/useAuth";
import { useAppContext } from "@/App";
import { useNavigate } from "react-router";

const Header = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const { user } = useAppContext();
  const { mutate } = useSignOut();
  const navigate = useNavigate();

  return (
    <div className="py-3 px-5 border-b sticky top-0  z-30 backdrop-blur-md">
      <div className="flex justify-between items-center h-10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="font-bold text-2xl">Notes</h1>
        </div>
        <nav className="flex gap-4 items-center">
          <div className="hidden md:flex gap-4 items-center">
            {user ? (
              <>
                <h3 className="text-muted-foreground">{user.name}</h3>
                {user.role === "admin" && (
                  <Link to="/admin">
                    <Button variant="outline">Dashboard</Button>
                  </Link>
                )}

                <Button
                  onClick={() => navigate("/note/create")}
                  variant={"outline"}
                >
                  + New Note
                </Button>
                <Button onClick={() => mutate()}>Sign Out</Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/sign-in">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/sign-up">Register</Link>
                </Button>
              </>
            )}
          </div>
          <ModeToggle />
        </nav>
      </div>
    </div>
  );
};

export default Header;
