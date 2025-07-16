import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, AlertTriangle, Shield, Calendar, BarChart3 } from "lucide-react";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

export default function TrendAnalysis() {
  const vulnerabilityTrends = [
    { type: "Critical", current: 5, previous: 8, change: -37.5 },
    { type: "High", current: 12, previous: 15, change: -20 },
    { type: "Medium", current: 23, previous: 18, change: 27.8 },
    { type: "Low", current: 45, previous: 42, change: 7.1 }
  ];

  // Time series data for vulnerability trends
  const timeSeriesData = [
    { date: "Jan", critical: 12, high: 18, medium: 25, low: 35 },
    { date: "Feb", critical: 10, high: 16, medium: 22, low: 38 },
    { date: "Mar", critical: 8, high: 14, medium: 20, low: 41 },
    { date: "Apr", critical: 6, high: 13, medium: 21, low: 43 },
    { date: "May", critical: 7, high: 15, medium: 23, low: 42 },
    { date: "Jun", critical: 5, high: 12, medium: 23, low: 45 }
  ];

  // Pie chart data for current severity distribution
  const pieChartData = [
    { name: "Critical", value: 5, fill: "#dc2626" },
    { name: "High", value: 12, fill: "#d97706" },
    { name: "Medium", value: 23, fill: "#2563eb" },
    { name: "Low", value: 45, fill: "#16a34a" }
  ];

  // Repository vulnerability data
  const repoVulnData = [
    { name: "payment-gateway", critical: 3, high: 5, medium: 4, low: 3 },
    { name: "auth-service", critical: 2, high: 3, medium: 4, low: 3 },
    { name: "frontend-app", critical: 0, high: 2, medium: 3, low: 3 },
    { name: "api-service", critical: 0, high: 1, medium: 2, low: 3 },
    { name: "notification", critical: 0, high: 1, medium: 1, low: 2 }
  ];

  // Weekly scan activity data
  const scanActivityData = [
    { week: "Week 1", scans: 45, vulnerabilities: 78 },
    { week: "Week 2", scans: 52, vulnerabilities: 65 },
    { week: "Week 3", scans: 48, vulnerabilities: 71 },
    { week: "Week 4", scans: 58, vulnerabilities: 55 }
  ];

  // Chart configurations
  const trendChartConfig: ChartConfig = {
    critical: { label: "Critical", color: "#dc2626" },
    high: { label: "High", color: "#d97706" },
    medium: { label: "Medium", color: "#2563eb" },
    low: { label: "Low", color: "#16a34a" }
  };

  const activityChartConfig: ChartConfig = {
    scans: { label: "Scans", color: "#2563eb" },
    vulnerabilities: { label: "Vulnerabilities", color: "#dc2626" }
  };

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
          {/* Vulnerability Trends Over Time */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Vulnerability Trends Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={trendChartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="critical"
                      stackId="1"
                      stroke="#dc2626"
                      fill="#dc2626"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="high"
                      stackId="1"
                      stroke="#d97706"
                      fill="#d97706"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="medium"
                      stackId="1"
                      stroke="#2563eb"
                      fill="#2563eb"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="low"
                      stackId="1"
                      stroke="#16a34a"
                      fill="#16a34a"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Current Severity Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Severity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={trendChartConfig} className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Scan Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={activityChartConfig} className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={scanActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="scans"
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={{ fill: "#2563eb", strokeWidth: 2 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="vulnerabilities"
                        stroke="#dc2626"
                        strokeWidth={3}
                        dot={{ fill: "#dc2626", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Repository Vulnerability Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Repository Vulnerability Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={trendChartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={repoVulnData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="critical" stackId="a" fill="#dc2626" />
                    <Bar dataKey="high" stackId="a" fill="#d97706" />
                    <Bar dataKey="medium" stackId="a" fill="#2563eb" />
                    <Bar dataKey="low" stackId="a" fill="#16a34a" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Vulnerability Trends Summary Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Monthly Trends Summary</CardTitle>
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

          {/* Organization Trend Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Monthly Security Score</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={activityChartConfig} className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { month: "Jan", score: 6.8 },
                      { month: "Feb", score: 7.1 },
                      { month: "Mar", score: 7.3 },
                      { month: "Apr", score: 7.0 },
                      { month: "May", score: 7.2 },
                      { month: "Jun", score: 7.2 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[5, 10]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={{ fill: "#2563eb", strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Compliance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={trendChartConfig} className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { team: "Frontend", compliant: 85, nonCompliant: 15 },
                      { team: "Backend", compliant: 70, nonCompliant: 30 },
                      { team: "DevOps", compliant: 95, nonCompliant: 5 },
                      { team: "Mobile", compliant: 78, nonCompliant: 22 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="team" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="compliant" stackId="a" fill="#16a34a" />
                      <Bar dataKey="nonCompliant" stackId="a" fill="#dc2626" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
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

          {/* Risk Assessment Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Risk Assessment by Repository Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={trendChartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { type: "Web Apps", critical: 8, high: 15, medium: 25, low: 30 },
                      { type: "APIs", critical: 12, high: 20, medium: 18, low: 25 },
                      { type: "Microservices", critical: 5, high: 12, medium: 22, low: 35 },
                      { type: "Mobile", critical: 3, high: 8, medium: 15, low: 20 },
                      { type: "Infrastructure", critical: 2, high: 5, medium: 10, low: 15 }
                    ]}
                    layout="horizontal"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="type" type="category" width={100} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="critical" stackId="a" fill="#dc2626" />
                    <Bar dataKey="high" stackId="a" fill="#d97706" />
                    <Bar dataKey="medium" stackId="a" fill="#2563eb" />
                    <Bar dataKey="low" stackId="a" fill="#16a34a" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}