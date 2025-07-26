import { Shield, AlertTriangle, Package, TrendingUp, CheckCircle, XCircle, Play, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const statusCards = [
    {
      title: "Code Scanned",
      value: "231",
      subtitle: "Vulnerabilities",
      status: "critical",
      icon: Shield,
      color: "blue"
    },
    {
      title: "SBOM",
      value: "156",
      subtitle: "Library",
      status: "success", 
      icon: Package,
      color: "green"
    },
    {
      title: "Action Item",
      value: "6",
      subtitle: "Open Tasks",
      status: "warning",
      icon: TrendingUp,
      color: "orange"
    }
  ];

  const recentScans = [
    { 
      id: "scan_001",
      name: "API Gate", 
      status: "Running", 
      progress: 70,
      lines: "32961",
      eta: "2:61m" 
    },
    { 
      id: "scan_002",
      name: "Payment", 
      status: "Running", 
      progress: 36,
      lines: "369126",
      eta: "6:00m" 
    },
    { 
      id: "scan_003",
      name: "Auth", 
      status: "Completed", 
      vulnerabilities: "C=1, H=2, M=6, L=2",
      version: "v1.2.3" 
    }
  ];

  const chartData = {
    criticality: [
      { label: "Critical", value: 20, color: "#dc2626" },
      { label: "High", value: 25, color: "#ea580c" },
      { label: "Medium", value: 35, color: "#f59e0b" },
      { label: "Low", value: 20, color: "#10b981" }
    ],
    openClosed: [
      { label: "Open", value: 10, color: "#ef4444" },
      { label: "Closed", value: 90, color: "#10b981" }
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Running": return <Play className="h-4 w-4 text-blue-600" />;
      case "Failed": return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getCardGradient = (color: string) => {
    switch (color) {
      case "blue": return "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200";
      case "green": return "bg-gradient-to-br from-green-50 to-green-100 border-green-200";
      case "orange": return "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200";
      default: return "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200";
    }
  };

  const getCardTextColor = (color: string) => {
    switch (color) {
      case "blue": return "text-blue-900";
      case "green": return "text-green-900";
      case "orange": return "text-orange-900";
      default: return "text-gray-900";
    }
  };

  const getCardSubtitleColor = (color: string) => {
    switch (color) {
      case "blue": return "text-blue-700";
      case "green": return "text-green-700";
      case "orange": return "text-orange-700";
      default: return "text-gray-700";
    }
  };

  const PieChart = ({ data, title }: { data: any[], title: string }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-border">
        <h3 className="text-center font-semibold text-foreground mb-4">{title}</h3>
        <div className="relative w-24 h-24 mx-auto mb-4">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            {data.map((segment, index) => {
              const percentage = (segment.value / total) * 100;
              const startAngle = (cumulativePercentage / 100) * 360;
              const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
              
              const startAngleRad = (startAngle * Math.PI) / 180;
              const endAngleRad = (endAngle * Math.PI) / 180;
              
              const largeArcFlag = percentage > 50 ? 1 : 0;
              
              const x1 = 50 + 40 * Math.cos(startAngleRad);
              const y1 = 50 + 40 * Math.sin(startAngleRad);
              const x2 = 50 + 40 * Math.cos(endAngleRad);
              const y2 = 50 + 40 * Math.sin(endAngleRad);
              
              const pathData = [
                `M 50 50`,
                `L ${x1} ${y1}`,
                `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ');
              
              cumulativePercentage += percentage;
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={segment.color}
                  stroke="white"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        </div>
        <div className="space-y-2">
          {data.map((segment, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-muted-foreground">{segment.label}</span>
              </div>
              <span className="font-medium text-foreground">{segment.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
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
            <Play className="h-4 w-4 mr-2" />
            Trigger New Scan
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statusCards.map((card, index) => (
          <Card key={index} className={getCardGradient(card.color)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getCardTextColor(card.color)}`}>{card.value}</div>
              <p className={`text-xs ${getCardSubtitleColor(card.color)}`}>{card.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Scans */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Recent Scan | SCA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentScans.map((scan) => (
                  <div key={scan.id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(scan.status)}
                        <div className="flex-1">
                          <div className="font-semibold text-foreground">{scan.name}</div>
                          {scan.status === "Running" ? (
                            <div className="text-sm text-muted-foreground">
                              {scan.lines} Lines • ETA: {scan.eta}
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground">
                              <span className="text-green-600 font-semibold">Completed</span>
                              <div className="mt-1">V: {scan.vulnerabilities}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {scan.status === "Running" && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-foreground">{scan.progress}%</span>
                          <div className="w-24">
                            <Progress value={scan.progress} className="h-2" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="space-y-4">
          <PieChart data={chartData.criticality} title="Criticality" />
          <PieChart data={chartData.openClosed} title="Open vs Closed" />
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Scanner Status</span>
                <Badge variant="outline" className="text-green-700 border-green-600 bg-green-50">
                  Online
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Update</span>
                <span className="text-sm text-foreground">15 minutes ago</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Active Integrations</span>
                <span className="text-sm text-foreground">5</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Repositories Monitored</span>
                <span className="text-sm text-foreground">4</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Security Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Vulnerabilities Fixed</span>
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium text-green-600">↑ 15</div>
                  <div className="text-xs text-muted-foreground">this week</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">New Issues Found</span>
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium text-red-600">↑ 8</div>
                  <div className="text-xs text-muted-foreground">this week</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Security Score</span>
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium text-blue-600">85/100</div>
                  <div className="text-xs text-muted-foreground">↑ 3 points</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Compliance Rate</span>
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium text-green-600">92%</div>
                  <div className="text-xs text-muted-foreground">↑ 2%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
