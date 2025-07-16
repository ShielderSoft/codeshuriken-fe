import { 
  Shield, 
  BarChart3, 
  Scan, 
  TrendingUp, 
  FileText, 
  Package, 
  AlertTriangle,
  Settings
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Integrations", url: "/integrations", icon: Settings },
  { title: "Scanning", url: "/scanning", icon: Scan },
  { title: "Trend Analysis", url: "/trends", icon: TrendingUp },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "SBOM", url: "/sbom", icon: Package },
  { title: "Action Items", url: "/action-items", icon: AlertTriangle },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const getNavClass = (active: boolean) =>
    active 
      ? "bg-accent text-accent-foreground font-medium border-r-2 border-primary" 
      : "hover:bg-accent/50 text-muted-foreground hover:text-accent-foreground";

  return (
    <Sidebar className={!open ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          {open && (
            <span className="text-lg font-bold text-foreground">CodeShuriken</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-muted-foreground font-medium px-4 py-2">
            Security Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={getNavClass(isActive(item.url))}
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}