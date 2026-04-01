import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import PageTransition from "./PageTransition";

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <div className="p-6">
              <Outlet />
            </div>
          </PageTransition>
        </AnimatePresence>
      </main>
    </div>
  );
}
