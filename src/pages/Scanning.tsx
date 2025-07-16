import { Upload, Play, Clock, CheckCircle, XCircle, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Scanning() {
  const scanJobs = [
    { 
      id: "scan_001", 
      repository: "frontend-app", 
      status: "Completed", 
      startTime: "2024-01-15 10:30", 
      duration: "2m 45s",
      vulnerabilities: 3,
      type: "Full Scan"
    },
    { 
      id: "scan_002", 
      repository: "api-service", 
      status: "Running", 
      startTime: "2024-01-15 11:15", 
      duration: "1m 20s",
      vulnerabilities: null,
      type: "Incremental"
    },
    { 
      id: "scan_003", 
      repository: "auth-microservice", 
      status: "Pending", 
      startTime: "Scheduled for 12:00", 
      duration: null,
      vulnerabilities: null,
      type: "Full Scan"
    },
    { 
      id: "scan_004", 
      repository: "payment-gateway", 
      status: "Failed", 
      startTime: "2024-01-15 09:45", 
      duration: "Failed after 30s",
      vulnerabilities: null,
      type: "Full Scan"
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Security Scanning</h1>
        <p className="text-muted-foreground">Upload and scan repositories for security vulnerabilities</p>
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
          <CardTitle className="text-lg font-semibold text-foreground">Recent Scan Jobs</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scanJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(job.status)}
                  <div>
                    <div className="font-medium text-foreground">{job.repository}</div>
                    <div className="text-sm text-muted-foreground">{job.type} • {job.id}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge 
                    variant="outline" 
                    className={`text-${getStatusColor(job.status)} border-${getStatusColor(job.status)}`}
                  >
                    {job.status}
                  </Badge>
                  
                  <div className="text-right text-sm">
                    <div className="text-muted-foreground">{job.startTime}</div>
                    {job.duration && (
                      <div className="text-muted-foreground">{job.duration}</div>
                    )}
                  </div>

                  {job.vulnerabilities !== null && (
                    <div className="text-sm font-medium text-foreground">
                      {job.vulnerabilities} issues
                    </div>
                  )}

                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scan Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}