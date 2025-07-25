import { Package, Download, Filter, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SBOM() {
  const components = [
    {
      name: "react",
      version: "18.2.0",
      language: "JavaScript",
      license: "MIT",
      riskLevel: "Low",
      vulnerabilities: 0,
      repository: "frontend-app"
    },
    {
      name: "express",
      version: "4.18.2",
      language: "JavaScript", 
      license: "MIT",
      riskLevel: "Medium",
      vulnerabilities: 2,
      repository: "api-service"
    },
    {
      name: "lodash",
      version: "4.17.19",
      language: "JavaScript",
      license: "MIT", 
      riskLevel: "High",
      vulnerabilities: 3,
      repository: "frontend-app"
    },
    {
      name: "spring-boot",
      version: "2.7.0",
      language: "Java",
      license: "Apache-2.0",
      riskLevel: "Low",
      vulnerabilities: 0,
      repository: "auth-microservice"
    },
    {
      name: "jwt-simple",
      version: "0.5.6",
      language: "JavaScript",
      license: "MIT",
      riskLevel: "Critical",
      vulnerabilities: 1,
      repository: "auth-microservice"
    },
    {
      name: "bcrypt",
      version: "5.0.1",
      language: "JavaScript",
      license: "MIT",
      riskLevel: "Low",
      vulnerabilities: 0,
      repository: "auth-microservice"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Critical": return "critical";
      case "High": return "critical";
      case "Medium": return "warning";
      case "Low": return "success";
      default: return "muted";
    }
  };

  const getLanguageIcon = (language: string) => {
    return <Package className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Software Bill of Materials (SBOM)</h1>
          <p className="text-muted-foreground">Track components and dependencies across all repositories</p>
        </div>
        
        <Button className="bg-primary hover:bg-primary/90">
          <Download className="h-4 w-4 mr-2" />
          Download SBOM
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
<<<<<<< HEAD
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-foreground">156</div>
            <div className="text-sm text-muted-foreground">Total Components</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-foreground">23</div>
            <div className="text-sm text-muted-foreground">Unique Licenses</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-foreground">8</div>
            <div className="text-sm text-muted-foreground">High Risk</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-foreground">6</div>
            <div className="text-sm text-muted-foreground">With Vulnerabilities</div>
=======
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-900">156</div>
            <div className="text-sm text-blue-700">Total Components</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-900">23</div>
            <div className="text-sm text-purple-700">Unique Licenses</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-900">8</div>
            <div className="text-sm text-red-700">High Risk</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-900">6</div>
            <div className="text-sm text-orange-700">With Vulnerabilities</div>
>>>>>>> 565ff9b (Initial commit)
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search components..."
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select defaultValue="all-languages">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-languages">All Languages</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="go">Go</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all-risks">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-risks">All Risk Levels</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            
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
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Components Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Components & Dependencies</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>License</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Vulnerabilities</TableHead>
                <TableHead>Repository</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {components.map((component, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getLanguageIcon(component.language)}
                      <span className="font-medium text-foreground">{component.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{component.version}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{component.language}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{component.license}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={`text-${getRiskColor(component.riskLevel)} border-${getRiskColor(component.riskLevel)}`}
                    >
                      {component.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {component.vulnerabilities > 0 ? (
                      <Badge variant="outline" className="text-critical border-critical">
                        {component.vulnerabilities}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{component.repository}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* License Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">License Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">MIT</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full w-3/4" />
                  </div>
                  <span className="text-sm font-medium text-foreground">75%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Apache-2.0</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-info h-2 rounded-full w-1/5" />
                  </div>
                  <span className="text-sm font-medium text-foreground">20%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">BSD-3-Clause</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full w-1/20" />
                  </div>
                  <span className="text-sm font-medium text-foreground">5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Language Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">JavaScript</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full w-3/5" />
                  </div>
                  <span className="text-sm font-medium text-foreground">60%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Java</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-info h-2 rounded-full w-1/4" />
                  </div>
                  <span className="text-sm font-medium text-foreground">25%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Python</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full w-3/20" />
                  </div>
                  <span className="text-sm font-medium text-foreground">15%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}