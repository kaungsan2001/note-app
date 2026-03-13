import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { Home, LogOut, Notebook, User, type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { useAppContext } from "@/App";
import { Button } from "../ui/button";
import { useSignOut } from "@/hooks/useAuth";

export const Sidebar = ({
  className,
  onLinkClick,
}: {
  className?: string;
  onLinkClick?: () => void;
}) => {
  const location = useLocation();
  const { user } = useAppContext();
  const { mutate } = useSignOut();

  const handleSignOut = () => mutate();
  return (
    <div
      className={cn(
        "flex flex-col h-full py-4 border-r bg-background",
        className,
      )}
    >
      <div className="px-3 py-2">
        <h2 className="mb-4 px-4 text-2xl font-bold tracking-tight">
          BrandName
        </h2>
        <div className="space-y-1">
          <Link
            to="/"
            className={cn(
              "flex items-center gap-3 rounded-md px-4 py-3 md:py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              location.pathname === "/"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground",
            )}
          >
            <Home className="w-5 h-5 md:w-4 md:h-4" />
            Home
          </Link>
          <Link
            to="/note/create"
            className={cn(
              "flex items-center gap-3 rounded-md px-4 py-3 md:py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              location.pathname === "/note/create"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground",
            )}
          >
            <Notebook className="w-5 h-5 md:w-4 md:h-4" />
            New Note
          </Link>

          {user && (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="flex items-center gap-3 rounded-md px-4 py-3 md:py-2 text-sm text-muted-foreground font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <User className="w-5 h-5 md:w-4 md:h-4" />
                  Admin
                </Link>
              )}
              <Button
                variant="ghost"
                className="w-full flex items-center gap-3 justify-start pl-4 text-muted-foreground"
                onClick={handleSignOut}
              >
                <LogOut className="w-5 h-5 md:w-4 md:h-4" />
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
