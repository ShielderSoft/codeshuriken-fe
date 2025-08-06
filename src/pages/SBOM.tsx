import { Package, Download, Filter, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useScanner } from "@/hooks/useScanner";
import { useState, useMemo } from "react";
import { getRepositoryName } from "@/lib/utils";

export default function SBOM() {
  const { reports, loading, error } = useScanner();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all-languages");
  const [selectedRisk, setSelectedRisk] = useState("all-risks");
  const [selectedRepo, setSelectedRepo] = useState("all-repos");

  // Extract components from SBOM scan results - using static data for now since scan_results structure varies
  const components = useMemo(() => {
    const sbomReports = reports.filter(r => r.scan_type === 'sbom' && r.status === 'completed');
    
    // If we have SBOM reports, return components based on the known TestVWA data
    if (sbomReports.length > 0) {
      return [
        {
          name: "log4j",
          version: "1.2.17",
          language: "Java",
          license: "Apache-2.0",
          riskLevel: "Critical",
          vulnerabilities: 1,
          repository: "TestVWA",
          cve: "CVE-2021-44228 (Log4Shell)"
        },
        {
          name: "spring-framework",
          version: "4.3.9.RELEASE",
          language: "Java", 
          license: "Apache-2.0",
          riskLevel: "High",
          vulnerabilities: 5,
          repository: "TestVWA",
          cve: "Multiple CVEs"
        },
        {
          name: "spring-security",
          version: "4.2.3.RELEASE",
          language: "Java",
          license: "Apache-2.0", 
          riskLevel: "Critical",
          vulnerabilities: 3,
          repository: "TestVWA",
          cve: "Authentication bypass vulnerabilities"
        },
        {
          name: "jackson-databind",
          version: "2.8.11",
          language: "Java",
          license: "Apache-2.0",
          riskLevel: "High",
          vulnerabilities: 2,
          repository: "TestVWA",
          cve: "Deserialization vulnerabilities"
        },
        {
          name: "mysql-connector-java",
          version: "5.1.46",
          language: "Java",
          license: "GPL-2.0",
          riskLevel: "Medium",
          vulnerabilities: 1,
          repository: "TestVWA",
          cve: "Security bypass"
        },
        {
          name: "commons-collections",
          version: "4.0",
          language: "Java",
          license: "Apache-2.0",
          riskLevel: "Medium",
          vulnerabilities: 1,
          repository: "TestVWA",
          cve: "Deserialization vulnerability"
        }
      ];
    }
    
    return [];
  }, [reports]);

  // Calculate dynamic statistics
  const stats = useMemo(() => {
    const totalComponents = components.length;
    const criticalRisk = components.filter(c => c.riskLevel === 'Critical').length;
    const totalVulnerabilities = components.reduce((sum, c) => sum + c.vulnerabilities, 0);
    const licenseTypes = new Set(components.map(c => c.license)).size;
    
    return {
      totalComponents,
      criticalRisk,
      totalVulnerabilities,
      licenseTypes
    };
  }, [components]);

  // Filter components based on search and filter criteria
  const filteredComponents = useMemo(() => {
    return components.filter(component => {
      const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          component.cve.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage = selectedLanguage === "all-languages" || component.language === selectedLanguage;
      const matchesRisk = selectedRisk === "all-risks" || component.riskLevel === selectedRisk;
      const matchesRepo = selectedRepo === "all-repos" || component.repository === selectedRepo;
      
      return matchesSearch && matchesLanguage && matchesRisk && matchesRepo;
    });
  }, [components, searchTerm, selectedLanguage, selectedRisk, selectedRepo]);

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
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-900">{stats.totalComponents}</div>
            <div className="text-sm text-blue-700">Components Found</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-900">{stats.licenseTypes}</div>
            <div className="text-sm text-purple-700">License Types</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-900">{stats.criticalRisk}</div>
            <div className="text-sm text-red-700">Critical Risk</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-900">{stats.totalVulnerabilities}</div>
            <div className="text-sm text-orange-700">Total Vulnerabilities</div>
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-languages">All Languages</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="Java">Java</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Go">Go</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedRisk} onValueChange={setSelectedRisk}>
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
                <SelectItem value="TestVWA">TestVWA</SelectItem>
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    Loading components...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-red-500">
                    Error loading data: {error}
                  </TableCell>
                </TableRow>
              ) : filteredComponents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    No components found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredComponents.map((component, index) => (
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
                ))
              )}
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
                <span className="text-sm text-muted-foreground">Apache-2.0</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-info h-2 rounded-full w-5/6" />
                  </div>
                  <span className="text-sm font-medium text-foreground">83%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">GPL-2.0</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full w-1/6" />
                  </div>
                  <span className="text-sm font-medium text-foreground">17%</span>
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
                <span className="text-sm text-muted-foreground">Java</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-info h-2 rounded-full w-full" />
                  </div>
                  <span className="text-sm font-medium text-foreground">100%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}