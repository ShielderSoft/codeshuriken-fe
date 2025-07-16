import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, AlertTriangle, Shield } from "lucide-react";

export default function TrendAnalysis() {
  const vulnerabilityTrends = [
    { type: "Critical", current: 5, previous: 8, change: -37.5 },
    { type: "High", current: 12, previous: 15, change: -20 },
    { type: "Medium", current: 23, previous: 18, change: 27.8 },
    { type: "Low", current: 45, previous: 42, change: 7.1 }
  ];

  const severityData = [
    { severity: "Critical", count: 5, percentage: 5.9, color: "critical" },
    { severity: "High", count: 12, percentage: 14.1, color: "warning" },
    { severity: "Medium", count: 23, percentage: 27.1, color: "info" },
    { severity: "Low", count: 45, percentage: 52.9, color: "success" }
  ];

  const topRepositories = [
    { name: "payment-gateway", vulnerabilities: 15, trend: "up" },
    { name: "auth-microservice", vulnerabilities: 12, trend: "down" },
    { name: "frontend-app", vulnerabilities: 8, trend: "stable" },
    { name: "api-service", vulnerabilities: 6, trend: "down" },
    { name: "notification-service", vulnerabilities: 4, trend: "up" }
  ];

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-critical" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-success" />;
    return <div className="h-4 w-4" />;
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "critical";
      case "down": return "success";
      default: return "muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trend Analysis</h1>
          <p className="text-muted-foreground">Analyze security trends and patterns over time</p>
        </div>
        
        <Select defaultValue="30days">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="repo-view" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="repo-view">Repository View</TabsTrigger>
          <TabsTrigger value="org-view">Organization View</TabsTrigger>
        </TabsList>

        <TabsContent value="repo-view" className="space-y-6">
          {/* Vulnerability Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Vulnerability Trends by Severity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {vulnerabilityTrends.map((trend) => (
                  <div key={trend.type} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">{trend.type}</span>
                      {getTrendIcon(trend.change)}
                    </div>
                    <div className="text-2xl font-bold text-foreground">{trend.current}</div>
                    <div className="text-xs text-muted-foreground">
                      {trend.change > 0 ? '+' : ''}{trend.change.toFixed(1)}% from last period
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Severity Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Current Severity Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {severityData.map((item) => (
                  <div key={item.severity} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant="outline" 
                        className={`text-${item.color} border-${item.color}`}
                      >
                        {item.severity}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{item.count} vulnerabilities</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className={`bg-${item.color} h-2 rounded-full`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Repositories by Vulnerabilities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Most Vulnerable Repositories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topRepositories.map((repo, index) => (
                  <div key={repo.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium text-muted-foreground">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{repo.name}</div>
                        <div className="text-sm text-muted-foreground">{repo.vulnerabilities} total vulnerabilities</div>
                      </div>
                    </div>
                    
                    <Badge 
                      variant="outline" 
                      className={`text-${getTrendColor(repo.trend)} border-${getTrendColor(repo.trend)}`}
                    >
                      {repo.trend}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="org-view" className="space-y-6">
          {/* Organization Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Total Repos</span>
                </div>
                <div className="text-2xl font-bold text-foreground">23</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-critical" />
                  <span className="text-sm text-muted-foreground">At Risk</span>
                </div>
                <div className="text-2xl font-bold text-foreground">8</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-warning" />
                  <span className="text-sm text-muted-foreground">Avg Score</span>
                </div>
                <div className="text-2xl font-bold text-foreground">7.2</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-success" />
                  <span className="text-sm text-muted-foreground">Compliant</span>
                </div>
                <div className="text-2xl font-bold text-foreground">15</div>
              </CardContent>
            </Card>
          </div>

          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Team Security Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-border rounded-lg">
                    <div className="text-lg font-semibold text-foreground">Frontend Team</div>
                    <div className="text-sm text-muted-foreground">3 repositories</div>
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-success h-2 rounded-full w-3/4" />
                      </div>
                      <span className="text-sm font-medium text-success">Good</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-border rounded-lg">
                    <div className="text-lg font-semibold text-foreground">Backend Team</div>
                    <div className="text-sm text-muted-foreground">8 repositories</div>
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-warning h-2 rounded-full w-1/2" />
                      </div>
                      <span className="text-sm font-medium text-warning">Needs Attention</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-border rounded-lg">
                    <div className="text-lg font-semibold text-foreground">DevOps Team</div>
                    <div className="text-sm text-muted-foreground">5 repositories</div>
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-success h-2 rounded-full w-5/6" />
                      </div>
                      <span className="text-sm font-medium text-success">Excellent</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}