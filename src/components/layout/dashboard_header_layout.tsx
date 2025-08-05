import { ExternalLinkIcon, Eye, Menu, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode_toggle";
import useDashboardStore from "@/pages/dashboard/dashboard_layout_store/dashboard_layout_store";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DashboardHeaderLayout = () => {
  const { sideMenuOpen } = useDashboardStore(); // Ensure sideMenuOpen exists in the store
  const { toggleSideMenuOpen } = useDashboardStore();
  return (
    <header className="overflow-hidden shadow mx-auto border-b bg-white dark:bg-primary borde-y sm:px- sm:py-5 py-3">
      <div className="flex items-center justify-between max-width w-full mx-auto">
        <p className="text-primary-foreground text-2xl">Logo</p>

        <nav className="flex items-center justify-end gap-3">
          <Link to="/">
            <Button className="hidden xs:flex" size="sm" variant="secondary">
              <Eye /> View Site
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button asChild size="sm">
                <span>
                <ExternalLinkIcon className="inline-flex" /> Logout
                </span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <ModeToggle />
          {sideMenuOpen ? (
            <div className="w-8 h-8 items-center justify-center cursor-pointer text-secondary-foreground flex md:hidden">
              <XCircle
                onClick={toggleSideMenuOpen}
                className="w-8 h-8 cursor-pointer block md:hidden"
              />
            </div>
          ) : (
            <div className="w-8 h-8 p-0 items-center justify-center cursor-pointer text-secondary-foreground flex md:hidden">
              <Menu
                onClick={toggleSideMenuOpen}
                className="w-8 h-8 cursor-pointer block md:hidden"
              />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeaderLayout;
