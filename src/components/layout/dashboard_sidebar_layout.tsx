import { cn } from "@/lib/utils";
const DashboardSidebarLayout = () => {
    const location = useLocation();

  return (
    <aside className="bg-muted duration-500 overflow-x-clip w-0 dark:bg-secondary border-r h-full md:w-full max-w-[270px] z-10">
      <nav className="center w-full py-8">
        <ul className="w-full px-2 space-y-2">
          <li>
            <Link
              to="/dashboard"
              className={cn(
                location.pathname === "/dashboard" ||
                  location.pathname === "/dashboard/"
                  ? "bg-primary text-white"
                  : "hover:bg-accent/50 dark:hover:bg-primary/50 hover:text-white text-primary-foreground",
                "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"
              )}
            >
              <GaugeIcon />
              Overview
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/users"
              className={cn(
                location.pathname === "/dashboard/users"
                  ? "bg-primary text-white"
                  : "hover:bg-accent/50 dark:hover:bg-primary/50 hover:text-white text-primary-foreground",
                "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"
              )}
            >
              <Users2Icon />
              Users
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/tools"
              className={cn(
                location.pathname === "/dashboard/tools"
                  ? "bg-primary text-white"
                  : "hover:bg-accent/50 dark:hover:bg-primary/50 hover:text-white text-primary-foreground",
                "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"
              )}
            >
              <ToolCaseIcon />
              Tools
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/content"
              className={cn(
                location.pathname === "/dashboard/content"
                  ? "bg-primary text-white"
                  : "hover:bg-accent/50 dark:hover:bg-primary/50 hover:text-white text-primary-foreground",
                "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"
              )}
            >
              <Box />
              Content
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/analytics"
              className={cn(
                location.pathname === "/dashboard/analytics"
                  ? "bg-primary text-white"
                  : "hover:bg-accent/50 dark:hover:bg-primary/50 hover:text-white text-primary-foreground",
                "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"
              )}
            >
              <DatabaseZap />
              Analytics
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/settings"
              className={cn(
                location.pathname === "/dashboard/settings"
                  ? "bg-primary text-white"
                  : "hover:bg-accent/50 dark:hover:bg-primary/50 hover:text-white text-primary-foreground",
                "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"
              )}
            >
              <SettingsIcon />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
import { Box, DatabaseZap, GaugeIcon, SettingsIcon, ToolCaseIcon, Users2Icon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";


export default DashboardSidebarLayout