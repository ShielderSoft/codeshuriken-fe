import { Shield, AlertTriangle, Package, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const statusCards = [
    {
      title: "Code Security",
      value: "23",
      subtitle: "Vulnerabilities Found",
      status: "critical",
      icon: Shield
    },
    {
      title: "SCA",
      value: "47",
      subtitle: "Dependencies Scanned",
      status: "warning", 
      icon: Package
    },
    {
      title: "SBOM",
      value: "156",
      subtitle: "Components Tracked",
      status: "success",
      icon: Package
    }
  ];

  const recentScans = [
    { repo: "frontend-app", status: "Completed", vulnerabilities: 3, timestamp: "2 hours ago" },
    { repo: "api-service", status: "Running", vulnerabilities: null, timestamp: "5 minutes ago" },
    { repo: "auth-microservice", status: "Completed", vulnerabilities: 7, timestamp: "1 day ago" },
    { repo: "payment-gateway", status: "Failed", vulnerabilities: null, timestamp: "3 hours ago" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "success";
      case "Running": return "info";
      case "Failed": return "critical";
      default: return "muted";
    }
  };

  const getStatusCardColor = (status: string) => {
    switch (status) {
      case "critical": return "border-critical bg-critical/5";
      case "warning": return "border-warning bg-warning/5";
      case "success": return "border-success bg-success/5";
      default: return "border-border";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Security Dashboard</h1>
          <p className="text-muted-foreground">Monitor your organization's security posture</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select defaultValue="all-repos">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select repository" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-repos">All Repositories</SelectItem>
              <SelectItem value="frontend-app">frontend-app</SelectItem>
              <SelectItem value="api-service">api-service</SelectItem>
              <SelectItem value="auth-microservice">auth-microservice</SelectItem>
              <SelectItem value="payment-gateway">payment-gateway</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="bg-primary hover:bg-primary/90">
            Trigger New Scan
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statusCards.map((card, index) => (
          <Card key={index} className={`${getStatusCardColor(card.status)} border-2`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Scans */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentScans.map((scan, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="font-medium text-foreground">{scan.repo}</div>
                  <Badge variant="outline" className={`text-${getStatusColor(scan.status)} border-${getStatusColor(scan.status)}`}>
                    {scan.status}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  {scan.vulnerabilities !== null && (
                    <span>{scan.vulnerabilities} vulnerabilities</span>
                  )}
                  <span>{scan.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Critical Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border border-critical/20 bg-critical/5 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-critical" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">CVE-2024-1234</div>
                  <div className="text-xs text-muted-foreground">Critical vulnerability in payment-gateway</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border border-warning/20 bg-warning/5 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">Outdated Dependencies</div>
                  <div className="text-xs text-muted-foreground">12 packages need updates</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Scanner Status</span>
                <Badge variant="outline" className="text-success border-success">Online</Badge>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Update</span>
                <span className="text-foreground">15 minutes ago</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Active Integrations</span>
                <span className="text-foreground">5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}