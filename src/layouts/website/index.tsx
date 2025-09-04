import { Outlet } from "react-router-dom";
import { WebsiteNavbar } from "@/components/website-navbar";
import { WebsiteFooter } from "@/components/website-footer";

export function WebsiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <WebsiteNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <WebsiteFooter />
    </div>
  );
}
