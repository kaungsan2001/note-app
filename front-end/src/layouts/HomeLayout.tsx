import Header from "@/components/web/Header";
import { Sidebar } from "@/components/web/Sidebar";
import { Outlet, Navigate } from "react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Home, Info, LogIn, UserPlus } from "lucide-react";
import { useAppContext } from "@/App";
const navList = [
  { url: "/", name: "Home", icon: Home },
  { url: "/admin", name: "Admin", icon: Info },
  { url: "/note/create", name: "New Note", icon: Info },
  { url: "/sign-in", name: "SignIn", icon: LogIn },
  { url: "/sign-up", name: "SignUp", icon: UserPlus },
];
const HomeLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAppContext();

  if (!user) {
    return <Navigate to={"/sign-in"} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-background transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Sidebar
          className="w-full"
          onLinkClick={() => setIsMobileMenuOpen(false)}
          navList={navList}
        />
      </aside>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
