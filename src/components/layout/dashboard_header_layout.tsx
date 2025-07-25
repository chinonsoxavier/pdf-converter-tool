import { ExternalLinkIcon, Eye, LucideMenu } from "lucide-react"
import { Button } from "../ui/button"
import { ModeToggle } from "../mode_toggle";

const DashboardHeaderLayout = () => {
  return (
    <header className="overflow-hidden shadow mx-auto border-b bg-white dark:bg-primary borde-y sm:px- sm:py-5 py-3">
      <div className="flex items-center justify-between max-width w-full mx-auto">
        <p className="text-primary-foreground text-2xl">Logo</p>

        <nav className="flex items-center justify-end gap-3">
          <Button className="hidden xs:flex" size="sm" variant="outline">
            <Eye /> View Site
          </Button>
          <Button size="sm">
            <ExternalLinkIcon /> Logout
                  </Button>
                  <ModeToggle  />
          <LucideMenu className="w-9 h-9 block md:hidden cursor-pointer" />
        </nav>
      </div>
    </header>
  );
}

export default DashboardHeaderLayout