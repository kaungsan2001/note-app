import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export const Sidebar = ({
  className,
  onLinkClick,
  navList,
}: {
  className?: string;
  onLinkClick?: () => void;
  navList: {
    url: string;
    name: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }[];
}) => {
  const location = useLocation();

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
          {navList.map((link) => {
            const isActive = location.pathname === link.url;
            return (
              <Link
                key={link.url}
                to={link.url}
                onClick={onLinkClick}
                className={cn(
                  "flex items-center gap-3 rounded-md px-4 py-3 md:py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                )}
              >
                <link.icon className="w-5 h-5 md:w-4 md:h-4" />
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
