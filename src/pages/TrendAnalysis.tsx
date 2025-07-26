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
    { week: "Week 1", initiated: 45, running: 12, completed: 33 },
    { week: "Week 2", initiated: 52, running: 8, completed: 44 },
    { week: "Week 3", initiated: 48, running: 15, completed: 33 },
    { week: "Week 4", initiated: 58, running: 10, completed: 48 }
  ];

  // Repository vulnerability table data
  const repositoryVulnTable = [
    { 
      name: "payment-gateway", 
      critical: 3, 
      high: 5, 
      medium: 8, 
      low: 12, 
      total: 28,
      lastScan: "2 days ago",
      delay: "3 days overdue",
      status: "overdue"
    },
    { 
      name: "auth-service", 
      critical: 2, 
      high: 4, 
      medium: 6, 
      low: 8, 
      total: 20,
      lastScan: "1 day ago",
      delay: "On schedule",
      status: "on-time"
    },
    { 
      name: "frontend-app", 
      critical: 0, 
      high: 2, 
      medium: 5, 
      low: 9, 
      total: 16,
      lastScan: "3 hours ago",
      delay: "On schedule",
      status: "on-time"
    },
    { 
      name: "api-service", 
      critical: 1, 
      high: 3, 
      medium: 4, 
      low: 6, 
      total: 14,
      lastScan: "5 days ago",
      delay: "2 days overdue",
      status: "overdue"
    },
    { 
      name: "notification-service", 
      critical: 0, 
      high: 1, 
      medium: 3, 
      low: 8, 
      total: 12,
      lastScan: "6 hours ago",
      delay: "On schedule",
      status: "on-time"
    }
  ];

  // Repository scan summary data
  const repoScanSummary = [
    { name: "payment-gateway", totalScans: 45, vulnerabilities: 28, avgScanTime: "12m" },
    { name: "auth-service", totalScans: 38, vulnerabilities: 20, avgScanTime: "8m" },
    { name: "frontend-app", totalScans: 42, vulnerabilities: 16, avgScanTime: "15m" },
    { name: "api-service", totalScans: 35, vulnerabilities: 14, avgScanTime: "10m" },
    { name: "notification-service", totalScans: 28, vulnerabilities: 12, avgScanTime: "6m" }
  ];

  // Chart configurations
  const trendChartConfig: ChartConfig = {
    critical: { label: "Critical", color: "#dc2626" },
    high: { label: "High", color: "#d97706" },
    medium: { label: "Medium", color: "#2563eb" },
    low: { label: "Low", color: "#16a34a" }
  };

  const activityChartConfig: ChartConfig = {
    initiated: { label: "Initiated", color: "#2563eb" },
    running: { label: "Running", color: "#d97706" },
    completed: { label: "Completed", color: "#16a34a" }
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
    if (change > 0) return <TrendingUp className="h-4 w-4 text-red-600" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-green-600" />;
    return <div className="h-4 w-4" />;
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "red-600";
      case "down": return "green-600";
      default: return "gray-600";
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
          {/* Main Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - Charts */}
            <div className="space-y-6">
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

              {/* Scan Activity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Weekly Scan Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={activityChartConfig} className="h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={scanActivityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="week" 
                          stroke="#6b7280"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis 
                          stroke="#6b7280"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <ChartTooltip 
                          content={<ChartTooltipContent />}
                          cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
                        />
                        <Legend 
                          wrapperStyle={{ paddingTop: '20px' }}
                          iconType="rect"
                        />
                        <Bar 
                          dataKey="initiated" 
                          fill="#2563eb" 
                          radius={[2, 2, 0, 0]}
                          name="Initiated"
                        />
                        <Bar 
                          dataKey="running" 
                          fill="#d97706" 
                          radius={[2, 2, 0, 0]}
                          name="Running"
                        />
                        <Bar 
                          dataKey="completed" 
                          fill="#16a34a" 
                          radius={[2, 2, 0, 0]}
                          name="Completed"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Severity Distribution Pie Chart */}
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
            </div>

            {/* Right Side - Tables */}
            <div className="space-y-6">
              {/* Repository Vulnerability Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Repository Vulnerabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Repository</th>
                          <th className="text-center p-2">Critical</th>
                          <th className="text-center p-2">High</th>
                          <th className="text-center p-2">Medium</th>
                          <th className="text-center p-2">Low</th>
                          <th className="text-center p-2">Total</th>
                          <th className="text-left p-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {repositoryVulnTable.map((repo, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2 font-medium">{repo.name}</td>
                            <td className="text-center p-2">
                              <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-red-600 rounded-full">
                                {repo.critical}
                              </span>
                            </td>
                            <td className="text-center p-2">
                              <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-orange-600 rounded-full">
                                {repo.high}
                              </span>
                            </td>
                            <td className="text-center p-2">
                              <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-blue-600 rounded-full">
                                {repo.medium}
                              </span>
                            </td>
                            <td className="text-center p-2">
                              <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-green-600 rounded-full">
                                {repo.low}
                              </span>
                            </td>
                            <td className="text-center p-2 font-medium">{repo.total}</td>
                            <td className="p-2">
                              <div className="text-xs">
                                <div className="text-muted-foreground">Last: {repo.lastScan}</div>
                                <div className={repo.status === 'overdue' ? 'text-red-600 font-medium' : 'text-green-600'}>
                                  {repo.delay}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Repository Scan Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Repository Scan Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {repoScanSummary.map((repo, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{repo.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Avg scan time: {repo.avgScanTime}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-foreground">{repo.totalScans}</div>
                          <div className="text-xs text-muted-foreground">scans</div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-lg font-semibold text-red-600">{repo.vulnerabilities}</div>
                          <div className="text-xs text-muted-foreground">vulnerabilities</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Trends Summary Cards */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Monthly Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
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
            </div>
          </div>
        </TabsContent>

        <TabsContent value="org-view" className="space-y-6">
          {/* Organization Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-700">Total Repos</span>
                </div>
                <div className="text-2xl font-bold text-blue-900">23</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-700">At Risk</span>
                </div>
                <div className="text-2xl font-bold text-red-900">8</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-700">Avg Score</span>
                </div>
                <div className="text-2xl font-bold text-orange-900">7.2</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700">Compliant</span>
                </div>
                <div className="text-2xl font-bold text-green-900">15</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Split Layout for Organization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - Charts */}
            <div className="space-y-6">
              {/* Monthly Security Score */}
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

              {/* Compliance Rate Checklist */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Compliance Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={trendChartConfig} className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { check: "Security Scans", completed: 18, pending: 5 },
                        { check: "Vuln Patching", completed: 15, pending: 8 },
                        { check: "Code Review", completed: 20, pending: 3 },
                        { check: "SBOM Updated", completed: 12, pending: 11 },
                        { check: "Access Control", completed: 19, pending: 4 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="check" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="completed" stackId="a" fill="#16a34a" />
                        <Bar dataKey="pending" stackId="a" fill="#dc2626" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Risk Assessment by Repository Type */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Risk Assessment by Type</CardTitle>
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
            </div>

            {/* Right Side - Team Performance and Details */}
            <div className="space-y-6">
              {/* Team Performance Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Team Security Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Team</th>
                          <th className="text-center p-2">Repos</th>
                          <th className="text-center p-2">Score</th>
                          <th className="text-center p-2">Compliance</th>
                          <th className="text-left p-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-medium">Frontend Team</td>
                          <td className="text-center p-2">3</td>
                          <td className="text-center p-2">8.5</td>
                          <td className="text-center p-2">85%</td>
                          <td className="p-2">
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Good</span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium">Backend Team</td>
                          <td className="text-center p-2">8</td>
                          <td className="text-center p-2">6.2</td>
                          <td className="text-center p-2">70%</td>
                          <td className="p-2">
                            <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">Needs Work</span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium">DevOps Team</td>
                          <td className="text-center p-2">5</td>
                          <td className="text-center p-2">9.1</td>
                          <td className="text-center p-2">95%</td>
                          <td className="p-2">
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Excellent</span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium">Mobile Team</td>
                          <td className="text-center p-2">4</td>
                          <td className="text-center p-2">7.8</td>
                          <td className="text-center p-2">78%</td>
                          <td className="p-2">
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Good</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">QA Team</td>
                          <td className="text-center p-2">3</td>
                          <td className="text-center p-2">8.8</td>
                          <td className="text-center p-2">92%</td>
                          <td className="p-2">
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Excellent</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Status Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Compliance Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-foreground">Security Scans</div>
                        <div className="text-sm text-muted-foreground">Weekly automated scanning</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">18/23</div>
                        <div className="text-xs text-muted-foreground">78% complete</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-foreground">Vulnerability Patching</div>
                        <div className="text-sm text-muted-foreground">Critical & High severity fixes</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-orange-600">15/23</div>
                        <div className="text-xs text-muted-foreground">65% complete</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-foreground">Code Review</div>
                        <div className="text-sm text-muted-foreground">Security-focused code reviews</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">20/23</div>
                        <div className="text-xs text-muted-foreground">87% complete</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-foreground">SBOM Updates</div>
                        <div className="text-sm text-muted-foreground">Software Bill of Materials maintenance</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-red-600">12/23</div>
                        <div className="text-xs text-muted-foreground">52% complete</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-foreground">Access Control</div>
                        <div className="text-sm text-muted-foreground">Role-based access implementation</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">19/23</div>
                        <div className="text-xs text-muted-foreground">83% complete</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Backend Team Focus Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Backend Team - Action Required</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-foreground">8 repositories with security issues</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-foreground">Score decreased by 15% this month</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-orange-600" />
                      <span className="text-sm text-foreground">30% compliance gap vs target</span>
                    </div>
                    <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="text-sm font-medium text-orange-800">Recommended Actions:</div>
                      <ul className="mt-2 text-xs text-orange-700 space-y-1">
                        <li>• Complete pending security scans</li>
                        <li>• Address 12 critical vulnerabilities</li>
                        <li>• Update SBOM for 5 repositories</li>
                        <li>• Implement automated security checks</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
