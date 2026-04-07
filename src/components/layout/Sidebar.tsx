import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Package, FileText, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
  { to: "/clients", icon: Users, label: "Clients" },
  { to: "/products", icon: Package, label: "Produits" },
  { to: "/invoices", icon: FileText, label: "Factures" },
  { to: "/reports", icon: BarChart3, label: "Rapports" },
  { to: "/settings", icon: Settings, label: "Paramètres" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex flex-col h-screen border-r border-sidebar-border transition-all duration-300 relative",
          collapsed ? "w-[72px]" : "w-[250px]"
        )}
        style={{ background: "hsl(var(--sidebar-background))" }}
      >
        {/* Gold top line */}
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "var(--gold-gradient)", opacity: 0.4 }} />

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-lg font-display font-bold gold-text">Fact-Digit</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary h-8 w-8"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-3">
          {navItems.map(({ to, icon: Icon, label }) => (
            <Tooltip key={to}>
              <TooltipTrigger asChild>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium group",
                      isActive
                        ? "bg-primary/15 text-primary border border-primary/20"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground border border-transparent"
                    )
                  }
                >
                  <div className="flex items-center justify-center w-5 h-5">
                    <Icon className="h-[18px] w-[18px]" />
                  </div>
                  {!collapsed && <span>{label}</span>}
                </NavLink>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right" className="glass-card text-foreground border-border/50">{label}</TooltipContent>}
            </Tooltip>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-sidebar-border">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 border border-transparent"
              >
                <LogOut className="h-[18px] w-[18px]" />
                {!collapsed && <span>Déconnexion</span>}
              </button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right" className="glass-card text-foreground border-border/50">Déconnexion</TooltipContent>}
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
}
