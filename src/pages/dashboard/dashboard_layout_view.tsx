import DashboardHeaderLayout from "@/components/layout/dashboard_header_layout";
import DashboardSidebarLayout from "@/components/layout/dashboard_sidebar_layout";
import DashboardSidemenuLayout from "@/components/layout/dashboard_sidemenu_layout";
import { Outlet } from "react-router-dom";

const DashboardLayoutView = () => {
  return (
    <div className="h-lvh">
      {/* Header */}
      <div className="h-[12%] ">
        <DashboardHeaderLayout />
      </div>

      {/* sidebar menu */}
       <DashboardSidemenuLayout/>
      
      {/* main content */}
      <section className="flex h-[88%] items-start justify-start overflow-scrol">
       <DashboardSidebarLayout/>
        <div className="h-full w-full flex-col overflow-scroll">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default DashboardLayoutView;
