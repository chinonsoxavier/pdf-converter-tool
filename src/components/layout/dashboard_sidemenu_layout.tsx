import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Box,
  DatabaseZap,
  DoorOpenIcon,
  GaugeIcon,
  SettingsIcon,
  ToolCaseIcon,
  Users2Icon,
  XCircle,
} from "lucide-react";
import useDashboardStore from "@/pages/dashboard/dashboard_layout_store/dashboard_layout_store";
import { Link, useLocation } from "react-router-dom";

const DashboardSidemenuLayout = () => {
  const { sideMenuOpen } = useDashboardStore();
  const { toggleSideMenuOpen } = useDashboardStore();
  const location = useLocation();

  return (
    <div
      className={cn(
        sideMenuOpen ? "w-full" : "w-0",
        "fixed h-dvh duration-500  backdrop-blur-[2px] z-20 right-0 bottom-0 overflow-hidden top-0 max-w-lvw"
      )}
    >
      <aside
        className={cn(
          sideMenuOpen ? "w-full" : "w-0",
          "overflow-hidden fixed px-6 border max-w-sm z-20 top-0 bottom-0 shadow duration-500 right-0 py-10 bg-white dark:bg-primary"
        )}
      >
        <div className={cn(sideMenuOpen ? "" : "")}>
          <div className="flex items-center text-primary justify-between w-full">
            <Button variant="outline">
              <DoorOpenIcon /> Logout
            </Button>
            <XCircle
              onClick={toggleSideMenuOpen}
              className="text-primary-foreground"
            />
          </div>
        </div>

        <nav className="center w-full py-8">
          <ul className="w-full px-2 space-y-2">
            <li>
              <Link
                onClick={toggleSideMenuOpen}
                to="/dashboard"
                className={cn(
                  location.pathname === "/dashboard" ||
                    location.pathname === "/dashboard/"
                    ? "bg-primary dark:bg-secondary text-white"
                    : "hover:bg-accent/50 dark:hover:bg-secondary/50 hover:text-white text-primary-foreground",
                  "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"
                )}
              >
                <GaugeIcon />
                Overview
              </Link>
            </li>

            <li>
              <Link
                onClick={toggleSideMenuOpen}
                to="/dashboard/users"
                className={cn(
                  location.pathname === "/dashboard/users"
                    ? "bg-primary dark:bg-secondary text-white"
                    : "hover:bg-accent/50 dark:hover:bg-secondary/50 hover:text-white text-primary-foreground",
                  "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"
                )}
              >
                <Users2Icon />
                Users
              </Link>
            </li>

            <li>
              <Link
                onClick={toggleSideMenuOpen}
                to="/dashboard/tools"
                className={cn(
                  location.pathname === "/dashboard/tools"
                    ? "bg-primary dark:bg-secondary text-white"
                    : "hover:bg-accent/50 dark:hover:bg-secondary/50 hover:text-white text-primary-foreground",
                  "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"
                )}
              >
                <ToolCaseIcon />
                Tools
              </Link>
            </li>

            <li>
              <Link
                onClick={toggleSideMenuOpen}
                to="/dashboard/content"
                className={cn(
                  location.pathname === "/dashboard/content"
                    ? "bg-primary dark:bg-secondary text-white"
                    : "hover:bg-accent/50 dark:hover:bg-secondary/50 hover:text-white text-primary-foreground",
                  "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"
                )}
              >
                <Box />
                Content
              </Link>
            </li>

            <li>
              <Link
                onClick={toggleSideMenuOpen}
                to="/dashboard/analytics"
                className={cn(
                  location.pathname === "/dashboard/analytics"
                    ? "bg-primary dark:bg-secondary text-white"
                    : "hover:bg-accent/50 dark:hover:bg-secondary/50 hover:text-white text-primary-foreground",
                  "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"
                )}
              >
                <DatabaseZap />
                Analytics
              </Link>
            </li>

            <li>
              <Link
                onClick={toggleSideMenuOpen}
                to="/dashboard/settings"
                className={cn(
                  location.pathname === "/dashboard/settings"
                    ? "bg-primary dark:bg-secondary text-white"
                    : "hover:bg-accent/50 dark:hover:bg-secondary/50 hover:text-white text-primary-foreground",
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
    </div>
  );
};

export default DashboardSidemenuLayout;
