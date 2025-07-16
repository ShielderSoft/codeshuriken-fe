import { AlertTriangle, ExternalLink, Check, Bug, Filter, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ActionItems() {
  const actionItems = [
    {
      id: "AI_001",
      type: "CVE",
      title: "CVE-2024-1234: Critical RCE in Express.js",
      severity: "Critical",
      repository: "api-service",
      component: "express@4.18.1",
      description: "Remote code execution vulnerability in Express.js middleware",
      dateAdded: "2024-01-15",
      status: "Open",
      priority: "High"
    },
    {
      id: "AI_002", 
      type: "Dependency",
      title: "Outdated lodash with known vulnerabilities",
      severity: "High",
      repository: "frontend-app",
      component: "lodash@4.17.19",
      description: "Multiple security vulnerabilities in lodash version",
      dateAdded: "2024-01-14",
      status: "In Progress",
      priority: "High"
    },
    {
      id: "AI_003",
      type: "CVE",
      title: "CVE-2024-5678: JWT Token Bypass",
      severity: "High",
      repository: "auth-microservice", 
      component: "jwt-simple@0.5.6",
      description: "Token validation bypass in JWT library",
      dateAdded: "2024-01-13",
      status: "Open",
      priority: "Medium"
    },
    {
      id: "AI_004",
      type: "Secret",
      title: "Hardcoded API key detected",
      severity: "Medium",
      repository: "payment-gateway",
      component: "config.js",
      description: "API key found in source code",
      dateAdded: "2024-01-12",
      status: "Resolved",
      priority: "Medium"
    },
    {
      id: "AI_005",
      type: "Dependency",
      title: "End-of-life React version",
      severity: "Medium",
      repository: "frontend-app",
      component: "react@16.14.0",
      description: "Using React version that's no longer supported",
      dateAdded: "2024-01-11",
      status: "Open",
      priority: "Low"
    }
  ];

  const recentCVEs = [
    {
      id: "CVE-2024-1234",
      title: "Express.js Remote Code Execution",
      severity: "Critical",
      publishedDate: "2024-01-15",
      affectedRepos: 3
    },
    {
      id: "CVE-2024-5678", 
      title: "JWT Library Bypass Vulnerability",
      severity: "High",
      publishedDate: "2024-01-13",
      affectedRepos: 1
    },
    {
      id: "CVE-2024-9012",
      title: "Node.js Path Traversal",
      severity: "Medium",
      publishedDate: "2024-01-10",
      affectedRepos: 2
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "critical";
      case "High": return "critical";
      case "Medium": return "warning";
      case "Low": return "info";
      default: return "muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "critical";
      case "In Progress": return "warning"; 
      case "Resolved": return "success";
      default: return "muted";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "CVE": return <AlertTriangle className="h-4 w-4" />;
      case "Dependency": return <AlertTriangle className="h-4 w-4" />;
      case "Secret": return <AlertTriangle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Action Items</h1>
          <p className="text-muted-foreground">Prioritized security tasks and vulnerability updates</p>
        </div>
        
        <div className="flex space-x-3">
          <Select defaultValue="all-repos">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by repository" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-repos">All Repositories</SelectItem>
              <SelectItem value="frontend-app">frontend-app</SelectItem>
              <SelectItem value="api-service">api-service</SelectItem>
              <SelectItem value="auth-microservice">auth-microservice</SelectItem>
              <SelectItem value="payment-gateway">payment-gateway</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all-severity">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-severity">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-foreground">12</div>
            <div className="text-sm text-muted-foreground">Open Items</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-foreground">3</div>
            <div className="text-sm text-muted-foreground">Critical</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-foreground">5</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-foreground">8</div>
            <div className="text-sm text-muted-foreground">Resolved This Week</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all-items" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all-items">All Action Items</TabsTrigger>
          <TabsTrigger value="recent-cves">Recent CVEs</TabsTrigger>
          <TabsTrigger value="high-risk">High Risk Libraries</TabsTrigger>
        </TabsList>

        <TabsContent value="all-items">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Prioritized Action Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actionItems.map((item) => (
                  <div key={item.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-lg bg-${getSeverityColor(item.severity)}/10`}>
                          {getTypeIcon(item.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-foreground">{item.title}</h3>
                            <Badge 
                              variant="outline"
                              className={`text-${getSeverityColor(item.severity)} border-${getSeverityColor(item.severity)}`}
                            >
                              {item.severity}
                            </Badge>
                            <Badge variant="outline">{item.type}</Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Repository: {item.repository}</span>
                            <span>Component: {item.component}</span>
                            <span>Added: {item.dateAdded}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant="outline"
                          className={`text-${getStatusColor(item.status)} border-${getStatusColor(item.status)}`}
                        >
                          {item.status}
                        </Badge>
                        
                        <div className="flex space-x-2">
                          {item.status !== "Resolved" && (
                            <>
                              <Button size="sm" variant="outline">
                                <Check className="h-4 w-4 mr-1" />
                                Mark Resolved
                              </Button>
                              <Button size="sm" variant="outline">
                                <Bug className="h-4 w-4 mr-1" />
                                Create Jira Ticket
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="ghost">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent-cves">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Recent CVE Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCVEs.map((cve) => (
                  <div key={cve.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <AlertTriangle className={`h-5 w-5 text-${getSeverityColor(cve.severity)}`} />
                      <div>
                        <div className="font-semibold text-foreground">{cve.id}</div>
                        <div className="text-sm text-muted-foreground">{cve.title}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge 
                        variant="outline"
                        className={`text-${getSeverityColor(cve.severity)} border-${getSeverityColor(cve.severity)}`}
                      >
                        {cve.severity}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {cve.affectedRepos} repos affected
                      </span>
                      <span className="text-sm text-muted-foreground">{cve.publishedDate}</span>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View CVE
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="high-risk">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">High Risk Libraries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-critical/20 bg-critical/5 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <AlertTriangle className="h-5 w-5 text-critical" />
                      <div>
                        <div className="font-semibold text-foreground">lodash@4.17.19</div>
                        <div className="text-sm text-muted-foreground">Multiple critical vulnerabilities</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-critical border-critical">High Risk</Badge>
                      <span className="text-sm text-muted-foreground">Used in 3 repos</span>
                      <Button size="sm">Update Now</Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-warning/20 bg-warning/5 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Clock className="h-5 w-5 text-warning" />
                      <div>
                        <div className="font-semibold text-foreground">react@16.14.0</div>
                        <div className="text-sm text-muted-foreground">End-of-life version with no security updates</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-warning border-warning">Medium Risk</Badge>
                      <span className="text-sm text-muted-foreground">Used in 1 repo</span>
                      <Button size="sm" variant="outline">Plan Upgrade</Button>
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