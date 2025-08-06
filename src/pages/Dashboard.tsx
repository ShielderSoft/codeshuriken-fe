import { Shield, AlertTriangle, Package, TrendingUp, CheckCircle, XCircle, Play, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useScanner } from "@/hooks/useScanner";
import { useEffect, useState } from "react";
import { getRepositoryName } from "@/lib/utils";

export default function Dashboard() {
  const { reports, getStatistics, getRecentScans, serviceHealth, loading, error, startScan } = useScanner();
  const [selectedRepo, setSelectedRepo] = useState("all-repos");
  
  const stats = getStatistics();
  const recentScans = getRecentScans();
  // Calculate total SBOM components from completed SBOM scans
  const sbomComponents = reports
    .filter(r => r.scan_type === 'sbom' && r.status === 'completed')
    .reduce((total, report) => {
      return total + (report.scan_results?.components_found || 0);
    }, 0);

  const statusCards = [
    {
      title: "Total Scans",
      value: stats.total.toString(),
      subtitle: "All Time",
      status: "info",
      icon: Shield,
      color: "blue"
    },
    {
      title: "Active Vulnerabilities", 
      value: stats.totalVulnerabilities.toString(),
      subtitle: `Critical: ${stats.criticalVulnerabilities} | High: ${stats.highVulnerabilities}`,
      status: "critical", 
      icon: AlertTriangle,
      color: "red"
    },
    {
      title: "SBOM Components",
      value: sbomComponents.toString(),
      subtitle: "Libraries Tracked",
      status: "success", 
      icon: Package,
      color: "green"
    }
  ];

  // Calculate vulnerability criticality breakdown from actual data
  const getCriticalityData = () => {
    let critical = 0, high = 0, medium = 0, low = 0;
    
    // Aggregate from vulnerability_count data
    reports.forEach(report => {
      if (report.vulnerability_count) {
        critical += report.vulnerability_count.Critical || 0;
        high += report.vulnerability_count.High || 0;
        medium += report.vulnerability_count.Medium || 0;
        low += report.vulnerability_count.Low || 0;
      }
    });
    
    const total = critical + high + medium + low;
    
    if (total === 0) {
      return [
        { label: "No Data", value: 100, color: "#6b7280" }
      ];
    }
    
    return [
      { label: "Critical", value: Math.round((critical / total) * 100), color: "#dc2626" },
      { label: "High", value: Math.round((high / total) * 100), color: "#ea580c" },
      { label: "Medium", value: Math.round((medium / total) * 100), color: "#f59e0b" },
      { label: "Low", value: Math.round((low / total) * 100), color: "#10b981" }
    ].filter(item => item.value > 0);
  };

  const getScanStatusData = () => {
    const totalScans = stats.total;
    
    if (totalScans === 0) {
      return [{ label: "No Scans", value: 100, color: "#6b7280" }];
    }
    
    const completed = stats.completed;
    const inProgress = stats.inProgress;
    const failed = stats.failed;
    
    const result = [];
    
    if (completed > 0) {
      result.push({
        label: "Completed",
        value: Math.round((completed / totalScans) * 100),
        color: "#10b981"
      });
    }
    
    if (inProgress > 0) {
      result.push({
        label: "In Progress",
        value: Math.round((inProgress / totalScans) * 100),
        color: "#f59e0b"
      });
    }
    
    if (failed > 0) {
      result.push({
        label: "Failed",
        value: Math.round((failed / totalScans) * 100),
        color: "#ef4444"
      });
    }
    
    return result.length > 0 ? result : [{ label: "No Data", value: 100, color: "#6b7280" }];
  };

  const chartData = {
    criticality: getCriticalityData(),
    scanStatus: getScanStatusData()
  };

  // Handle new scan trigger
  const handleNewScan = async () => {
    try {
      await startScan({
        repo_url: "https://github.com/SarthakShieldersoft/TestVWA.git",
        branch: "main",
        scan_type: "vulnerability"
      });
    } catch (err) {
      console.error("Failed to start scan:", err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in_progress": return <Play className="h-4 w-4 text-blue-600" />;
      case "failed": return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getCardGradient = (color: string) => {
    switch (color) {
      case "blue": return "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200";
      case "green": return "bg-gradient-to-br from-green-50 to-green-100 border-green-200";
      case "red": return "bg-gradient-to-br from-red-50 to-red-100 border-red-200";
      case "orange": return "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200";
      default: return "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200";
    }
  };

  const getCardTextColor = (color: string) => {
    switch (color) {
      case "blue": return "text-blue-900";
      case "green": return "text-green-900";
      case "red": return "text-red-900";
      case "orange": return "text-orange-900";
      default: return "text-gray-900";
    }
  };

  const getCardSubtitleColor = (color: string) => {
    switch (color) {
      case "blue": return "text-blue-700";
      case "green": return "text-green-700";
      case "red": return "text-red-700";
      case "orange": return "text-orange-700";
      default: return "text-gray-700";
    }
  };

  const PieChart = ({ data, title }: { data: any[], title: string }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Calculate actual counts for display
    const getTotalCount = () => {
      if (title === "Vulnerability Breakdown") {
        return stats.totalVulnerabilities;
      } else {
        return stats.total;
      }
    };

    const getActualCount = (segment: any, index: number) => {
      const totalCount = getTotalCount();
      return Math.round((segment.value / 100) * totalCount);
    };

    return (
      <div className="relative">
        {/* Modern glass-morphism card */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative z-10">
            <h3 className="text-center font-bold text-xl text-gray-800 mb-8 tracking-tight">{title}</h3>
            
            {/* Chart container with modern styling */}
            <div className="relative flex flex-col items-center mb-8">
              {/* Modern donut chart */}
              <div className="relative w-56 h-56 group">
                <svg 
                  className="w-56 h-56 transform rotate-0 transition-transform duration-700 group-hover:rotate-12" 
                  viewBox="0 0 140 140"
                >
                  <defs>
                    {/* Enhanced gradients */}
                    {data.map((segment, index) => (
                      <radialGradient key={index} id={`radial-${title.replace(/\s+/g, '')}-${index}`} cx="50%" cy="30%">
                        <stop offset="0%" stopColor={segment.color} stopOpacity="1" />
                        <stop offset="70%" stopColor={segment.color} stopOpacity="0.8" />
                        <stop offset="100%" stopColor={segment.color} stopOpacity="0.6" />
                      </radialGradient>
                    ))}
                    
                    {/* Glow filters */}
                    {data.map((_, index) => (
                      <filter key={index} id={`glow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    ))}
                  </defs>
                  
                  {/* Background track */}
                  <circle
                    cx="70"
                    cy="70"
                    r="50"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="16"
                    className="opacity-30"
                  />
                  
                  {/* Data segments */}
                  {data.map((segment, index) => {
                    const percentage = segment.value;
                    let cumulativePercentage = 0;
                    
                    for (let i = 0; i < index; i++) {
                      cumulativePercentage += data[i].value;
                    }
                    
                    const startAngle = (cumulativePercentage / 100) * 360;
                    const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
                    
                    const startAngleRad = ((startAngle - 90) * Math.PI) / 180;
                    const endAngleRad = ((endAngle - 90) * Math.PI) / 180;
                    
                    const largeArcFlag = percentage > 50 ? 1 : 0;
                    const outerRadius = hoveredIndex === index ? 55 : 50;
                    const innerRadius = hoveredIndex === index ? 32 : 30;
                    
                    const x1Outer = 70 + outerRadius * Math.cos(startAngleRad);
                    const y1Outer = 70 + outerRadius * Math.sin(startAngleRad);
                    const x2Outer = 70 + outerRadius * Math.cos(endAngleRad);
                    const y2Outer = 70 + outerRadius * Math.sin(endAngleRad);
                    
                    const x1Inner = 70 + innerRadius * Math.cos(startAngleRad);
                    const y1Inner = 70 + innerRadius * Math.sin(startAngleRad);
                    const x2Inner = 70 + innerRadius * Math.cos(endAngleRad);
                    const y2Inner = 70 + innerRadius * Math.sin(endAngleRad);
                    
                    const pathData = [
                      `M ${x1Outer} ${y1Outer}`,
                      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2Outer} ${y2Outer}`,
                      `L ${x2Inner} ${y2Inner}`,
                      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1Inner} ${y1Inner}`,
                      `Z`
                    ].join(' ');
                    
                    return (
                      <path
                        key={index}
                        d={pathData}
                        fill={`url(#radial-${title.replace(/\s+/g, '')}-${index})`}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer transition-all duration-300 ease-out"
                        style={{
                          filter: hoveredIndex === index ? `url(#glow-${index})` : 'none',
                          transformOrigin: '70px 70px'
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                    );
                  })}
                </svg>
                
                {/* Center content with modern design */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-white/90 backdrop-blur-sm rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg border border-white/30">
                    <div className="text-2xl font-bold text-gray-800">
                      {getTotalCount()}
                    </div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
                      {title === "Vulnerability Breakdown" ? "vulns" : "scans"}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating tooltip */}
              {hoveredIndex !== null && (
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-4 py-3 rounded-xl text-sm font-medium shadow-2xl z-20 border border-gray-700/50">
                  <div className="text-center">
                    <div className="font-bold text-white">{data[hoveredIndex].label}</div>
                    <div className="text-gray-300 text-xs mt-1">
                      {getActualCount(data[hoveredIndex], hoveredIndex)} items • {data[hoveredIndex].value}%
                    </div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
                </div>
              )}
            </div>
            
            {/* Modern legend with cards */}
            <div className="space-y-2">
              {data.map((segment, index) => (
                <div 
                  key={index} 
                  className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer border ${
                    hoveredIndex === index 
                      ? 'bg-gray-50/80 shadow-md border-gray-200 transform scale-[1.02]' 
                      : 'hover:bg-gray-50/50 border-transparent hover:border-gray-100'
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          hoveredIndex === index ? 'scale-125 shadow-lg' : ''
                        }`}
                        style={{ 
                          backgroundColor: segment.color,
                          boxShadow: hoveredIndex === index ? `0 0 20px ${segment.color}40` : 'none'
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      {segment.label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-gray-900">
                      {getActualCount(segment, index)}
                    </span>
                    <div className={`text-xs px-2 py-1 rounded-full font-medium transition-all duration-300 ${
                      hoveredIndex === index 
                        ? 'bg-white shadow-sm text-gray-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {segment.value}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
          <Select value={selectedRepo} onValueChange={setSelectedRepo}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select repository" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-repos">All Repositories</SelectItem>
              {Array.from(new Set(reports.map(r => getRepositoryName(r.repo_url)))).map(repoName => (
                <SelectItem key={repoName} value={repoName}>{repoName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={handleNewScan}
            disabled={loading}
          >
            <Play className="h-4 w-4 mr-2" />
            {loading ? "Starting..." : "Trigger New Scan"}
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
                {loading && <div className="text-center text-muted-foreground">Loading scans...</div>}
                {error && <div className="text-center text-red-600">Error: {error}</div>}
                {!loading && recentScans.length === 0 && (
                  <div className="text-center text-muted-foreground">No scans found</div>
                )}
                {recentScans.map((scan) => (
                  <div key={scan.report_id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(scan.status)}
                        <div className="flex-1">
                          <div className="font-semibold text-foreground">{getRepositoryName(scan.repo_url)}</div>
                          <div className="text-xs text-muted-foreground mb-1">
                            {scan.scan_type.toUpperCase()} • {scan.progress ? `${scan.progress.total_files} files` : 'Processing...'}
                          </div>
                          {scan.status === "in_progress" ? (
                            <div className="text-sm text-muted-foreground">
                              {scan.progress ? `${scan.progress.processed_files || 0}/${scan.progress.total_files || 0} processed` : 'Starting scan...'}
                            </div>
                          ) : scan.status === "completed" ? (
                            <div className="text-sm text-muted-foreground">
                              <span className="text-green-600 font-semibold">Completed</span> • {scan.completed_at ? new Date(scan.completed_at).toLocaleString() : 'Recently'}
                              {scan.vulnerability_count && (
                                <div className="mt-1">
                                  <span className="text-red-600 font-medium">Critical: {scan.vulnerability_count.Critical}</span> • 
                                  <span className="text-orange-600 font-medium"> High: {scan.vulnerability_count.High}</span> • 
                                  <span className="text-yellow-600 font-medium"> Medium: {scan.vulnerability_count.Medium}</span> • 
                                  <span className="text-green-600 font-medium"> Low: {scan.vulnerability_count.Low}</span>
                                </div>
                              )}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      
                      {scan.status === "in_progress" && scan.progress && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-foreground">{scan.progress.percentage}%</span>
                          <div className="w-24">
                            <Progress value={scan.progress.percentage} className="h-2" />
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
        <div className="space-y-6">
          <PieChart data={chartData.criticality} title="Vulnerability Breakdown" />
          <PieChart data={chartData.scanStatus} title="Scan Status" />
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
                <Badge variant="outline" className={
                  serviceHealth?.healthy 
                    ? "text-green-700 border-green-600 bg-green-50" 
                    : "text-red-700 border-red-600 bg-red-50"
                }>
                  {serviceHealth?.healthy ? "Online" : "Offline"}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Active Scans</span>
                <span className="text-sm text-foreground">{stats.inProgress}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completed Today</span>
                <span className="text-sm text-foreground">
                  {reports.filter(r => {
                    const today = new Date().toDateString();
                    const scanDate = new Date(r.created_at).toDateString();
                    return scanDate === today && r.status === 'completed';
                  }).length}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Repositories Monitored</span>
                <span className="text-sm text-foreground">
                  {new Set(reports.map(r => getRepositoryName(r.repo_url))).size}
                </span>
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
                <span className="text-sm text-muted-foreground">Total Vulnerabilities</span>
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium text-red-600">{stats.totalVulnerabilities}</div>
                  <div className="text-xs text-muted-foreground">found</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Critical Issues</span>
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium text-red-600">{stats.criticalVulnerabilities}</div>
                  <div className="text-xs text-muted-foreground">critical</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Scan Success Rate</span>
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium text-green-600">
                    {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                  </div>
                  <div className="text-xs text-muted-foreground">success</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Failed Scans</span>
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium text-orange-600">{stats.failed}</div>
                  <div className="text-xs text-muted-foreground">failed</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
