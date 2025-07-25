import { Upload, Play, Clock, CheckCircle, XCircle, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Scanning() {
  const scanJobs = [
    { 
      id: "scan_001", 
      repository: "frontend-app", 
      status: "Completed", 
      scanDate: "2024-01-15", 
<<<<<<< HEAD
      scanType: "Full Security Scan",
      vulnerabilities: 3
=======
      scanEndTime: "14:32",
      scanType: "Full Security Scan",
      vulnerabilities: 3,
      languages: ["JavaScript", "TypeScript", "CSS"],
      filesScanned: 247
>>>>>>> 565ff9b (Initial commit)
    },
    { 
      id: "scan_002", 
      repository: "api-service", 
      status: "Running", 
      scanDate: "2024-01-15", 
<<<<<<< HEAD
      scanType: "Incremental Scan",
      vulnerabilities: 0
=======
      scanEndTime: "15:45",
      scanType: "Incremental Scan",
      vulnerabilities: 0,
      languages: ["Python", "YAML"],
      filesScanned: 89
>>>>>>> 565ff9b (Initial commit)
    },
    { 
      id: "scan_003", 
      repository: "auth-microservice", 
      status: "Pending", 
      scanDate: "2024-01-15", 
<<<<<<< HEAD
      scanType: "Full Security Scan",
      vulnerabilities: 0
=======
      scanEndTime: "16:20",
      scanType: "Full Security Scan",
      vulnerabilities: 0,
      languages: ["Java", "XML"],
      filesScanned: 156
>>>>>>> 565ff9b (Initial commit)
    },
    { 
      id: "scan_004", 
      repository: "payment-gateway", 
      status: "Failed", 
      scanDate: "2024-01-15", 
<<<<<<< HEAD
      scanType: "SCA Analysis",
      vulnerabilities: 0
=======
      scanEndTime: "13:15",
      scanType: "SCA Analysis",
      vulnerabilities: 0,
      languages: ["Go", "JSON"],
      filesScanned: 73
>>>>>>> 565ff9b (Initial commit)
    }
  ];

  const scaAndSbomJobs = [
    {
      id: "sca_001",
      repository: "frontend-app",
      status: "Completed",
      scanDate: "2024-01-15",
<<<<<<< HEAD
      scanType: "SCA Analysis",
      vulnerabilities: 12
=======
      scanEndTime: "12:45",
      scanType: "SCA Analysis",
      vulnerabilities: 12,
      languages: ["JavaScript", "TypeScript"],
      filesScanned: 198
>>>>>>> 565ff9b (Initial commit)
    },
    {
      id: "sbom_001",
      repository: "api-service",
      status: "Completed",
      scanDate: "2024-01-14",
<<<<<<< HEAD
      scanType: "SBOM Generation",
      vulnerabilities: 0
=======
      scanEndTime: "16:30",
      scanType: "SBOM Generation",
      vulnerabilities: 0,
      languages: ["Python", "YAML", "Docker"],
      filesScanned: 67
>>>>>>> 565ff9b (Initial commit)
    },
    {
      id: "sca_002",
      repository: "auth-microservice",
      status: "Running",
      scanDate: "2024-01-15",
<<<<<<< HEAD
      scanType: "SCA Analysis",
      vulnerabilities: 0
=======
      scanEndTime: "14:10",
      scanType: "SCA Analysis",
      vulnerabilities: 0,
      languages: ["Java", "XML", "Properties"],
      filesScanned: 134
>>>>>>> 565ff9b (Initial commit)
    },
    {
      id: "sbom_002",
      repository: "payment-gateway",
      status: "Completed",
      scanDate: "2024-01-14",
<<<<<<< HEAD
      scanType: "SBOM Generation",
      vulnerabilities: 0
=======
      scanEndTime: "11:25",
      scanType: "SBOM Generation",
      vulnerabilities: 0,
      languages: ["Go", "JSON", "YAML"],
      filesScanned: 82
>>>>>>> 565ff9b (Initial commit)
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4 text-success" />;
      case "Running": return <Clock className="h-4 w-4 text-info animate-spin" />;
      case "Pending": return <Clock className="h-4 w-4 text-warning" />;
      case "Failed": return <XCircle className="h-4 w-4 text-critical" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "success";
      case "Running": return "info";
      case "Pending": return "warning";
      case "Failed": return "critical";
      default: return "muted";
    }
  };

  const renderScanItem = (job: any) => (
<<<<<<< HEAD
    <div key={job.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
      <div className="flex items-center space-x-4">
        {getStatusIcon(job.status)}
        <div>
          <div className="font-medium text-foreground">{job.repository}</div>
          <div className="text-sm text-muted-foreground">{job.scanType}</div>
=======
    <div key={job.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        {getStatusIcon(job.status)}
        <div className="flex-1">
          <div className="font-semibold text-foreground mb-1">{job.repository}</div>
          <div className="text-sm text-muted-foreground space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-blue-600 font-medium">Languages:</span>
              <span>{job.languages.join(", ")}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-600 font-medium">{job.filesScanned} files scanned</span>
              <span className="text-purple-600 font-medium">{job.scanType}</span>
            </div>
          </div>
>>>>>>> 565ff9b (Initial commit)
        </div>
      </div>

      <div className="flex items-center space-x-4">
<<<<<<< HEAD
        <div className="text-right text-sm">
=======
        {job.vulnerabilities > 0 && (
          <div className="flex flex-col items-center justify-center bg-red-50 border border-red-200 rounded-lg p-3 min-w-[100px]">
            <div className="text-lg font-bold text-red-700">{job.vulnerabilities}</div>
            <div className="text-xs text-red-600 font-medium text-center">vulnerabilities</div>
          </div>
        )}
        
        <div className="text-right text-sm">
          <div className="font-medium text-foreground">{job.scanEndTime}</div>
>>>>>>> 565ff9b (Initial commit)
          <div className="text-muted-foreground">{job.scanDate}</div>
        </div>

        <Badge 
          variant="outline" 
<<<<<<< HEAD
          className={`text-${getStatusColor(job.status)} border-${getStatusColor(job.status)}`}
=======
          className={`font-medium ${
            job.status === 'Completed' ? 'text-green-700 border-green-600 bg-green-50' :
            job.status === 'Running' ? 'text-blue-700 border-blue-600 bg-blue-50' :
            job.status === 'Pending' ? 'text-yellow-700 border-yellow-600 bg-yellow-50' :
            job.status === 'Failed' ? 'text-red-700 border-red-600 bg-red-50' :
            'text-slate-700 border-slate-600 bg-slate-50'
          }`}
>>>>>>> 565ff9b (Initial commit)
        >
          {job.status}
        </Badge>

<<<<<<< HEAD
        {job.vulnerabilities > 0 && (
          <div className="text-sm font-medium text-foreground">
            {job.vulnerabilities} issues
          </div>
        )}

        <Button variant="ghost" size="sm">
          View Details
=======
        <Button 
          variant="outline" 
          size="sm" 
          className="text-muted-foreground hover:bg-muted hover:text-foreground border-border font-medium px-3"
        >
          ⋯
>>>>>>> 565ff9b (Initial commit)
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Security Scanning</h1>
        <p className="text-muted-foreground">Upload and scan repositories for security vulnerabilities</p>
      </div>

      {/* Scan Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
<<<<<<< HEAD
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-foreground">24</div>
            <div className="text-sm text-muted-foreground">Total Scans Today</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-foreground">18</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-foreground">3</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-foreground">3</div>
            <div className="text-sm text-muted-foreground">Failed</div>
=======
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-900">24</div>
            <div className="text-sm text-blue-700">Total Scans Today</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-900">18</div>
            <div className="text-sm text-green-700">Completed</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-900">3</div>
            <div className="text-sm text-yellow-700">In Progress</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-900">3</div>
            <div className="text-sm text-red-700">Failed</div>
>>>>>>> 565ff9b (Initial commit)
          </CardContent>
        </Card>
      </div>

      {/* Upload and Scan Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Upload Repository</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop your ZIP file here, or click to browse
              </p>
              <Button variant="outline">
                Choose File
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="repo-name">Repository Name</Label>
              <Input id="repo-name" placeholder="Enter repository name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scan-type">Scan Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select scan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Security Scan</SelectItem>
                  <SelectItem value="sca">SCA Only</SelectItem>
                  <SelectItem value="secrets">Secrets Detection</SelectItem>
                  <SelectItem value="sbom">SBOM Generation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90">
              <Play className="h-4 w-4 mr-2" />
              Scan Now
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Schedule Scans</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="repository">Repository</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select repository" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend-app">frontend-app</SelectItem>
                  <SelectItem value="api-service">api-service</SelectItem>
                  <SelectItem value="auth-microservice">auth-microservice</SelectItem>
                  <SelectItem value="payment-gateway">payment-gateway</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="on-commit">On New Commits</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Preferred Time</Label>
              <Input id="time" type="time" defaultValue="02:00" />
            </div>

            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Scan
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Scan Jobs */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">Scan History</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recent">Recent Scans</TabsTrigger>
              <TabsTrigger value="sca-sbom">SCA & SBOM</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-4 mt-6">
              <div className="space-y-4">
                {scanJobs.map(renderScanItem)}
              </div>
            </TabsContent>

            <TabsContent value="sca-sbom" className="space-y-4 mt-6">
              <div className="space-y-4">
                {scaAndSbomJobs.map(renderScanItem)}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 