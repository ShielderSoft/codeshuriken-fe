import { FileText, Download, Calendar, Plus, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

export default function Reports() {
  const reports = [
    {
      id: "RPT_001",
      name: "Weekly Security Summary",
      type: "Scheduled",
      format: "PDF",
      lastGenerated: "2024-01-15 09:00",
      nextRun: "2024-01-22 09:00",
      status: "Active"
    },
    {
      id: "RPT_002", 
      name: "Critical Vulnerabilities Report",
      type: "On-Demand",
      format: "PDF",
      lastGenerated: "2024-01-14 16:30",
      nextRun: "-",
      status: "Completed"
    },
    {
      id: "RPT_003",
      name: "SBOM Export - All Repositories",
      type: "Scheduled",
      format: "XLS",
      lastGenerated: "2024-01-13 02:00",
      nextRun: "2024-01-20 02:00",
      status: "Active"
    },
    {
      id: "RPT_004",
      name: "Compliance Audit Report",
      type: "On-Demand",
      format: "PDF",
      lastGenerated: "2024-01-10 14:15",
      nextRun: "-",
      status: "Completed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "success";
      case "Completed": return "info";
      case "Failed": return "critical";
      default: return "muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">Generate and manage security reports</p>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Schedule New Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule New Report</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-name">Report Name</Label>
                  <Input id="report-name" placeholder="Enter report name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="security-summary">Security Summary</SelectItem>
                      <SelectItem value="vulnerability-details">Vulnerability Details</SelectItem>
                      <SelectItem value="sbom">SBOM Report</SelectItem>
                      <SelectItem value="compliance">Compliance Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="format">Format</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
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
                      <SelectItem value="on-demand">On-Demand Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label>Include Repositories</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="frontend-app" />
                      <Label htmlFor="frontend-app" className="text-sm">frontend-app</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="api-service" />
                      <Label htmlFor="api-service" className="text-sm">api-service</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="auth-microservice" />
                      <Label htmlFor="auth-microservice" className="text-sm">auth-microservice</Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1">Cancel</Button>
                  <Button className="flex-1">Schedule Report</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Security Summary</h3>
            <p className="text-sm text-muted-foreground mb-4">Generate immediate security overview</p>
            <Button size="sm" className="w-full">Generate Now</Button>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
          <CardContent className="p-6 text-center">
            <Download className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">SBOM Export</h3>
            <p className="text-sm text-muted-foreground mb-4">Export software bill of materials</p>
            <Button size="sm" variant="outline" className="w-full">Export SBOM</Button>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Compliance Report</h3>
            <p className="text-sm text-muted-foreground mb-4">Generate compliance audit report</p>
            <Button size="sm" variant="outline" className="w-full">Generate Report</Button>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">All Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-foreground">{report.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {report.id} • {report.type} • {report.format}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right text-sm">
                    <div className="text-muted-foreground">Last: {report.lastGenerated}</div>
                    {report.nextRun !== "-" && (
                      <div className="text-muted-foreground">Next: {report.nextRun}</div>
                    )}
                  </div>
                  
                  <Badge 
                    variant="outline" 
                    className={`text-${getStatusColor(report.status)} border-${getStatusColor(report.status)}`}
                  >
                    {report.status}
                  </Badge>
                  
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Available Formats</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">PDF Report</span>
                  </div>
                  <Badge variant="outline" className="text-success border-success">Available</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Excel Spreadsheet</span>
                  </div>
                  <Badge variant="outline" className="text-success border-success">Available</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">CSV Data</span>
                  </div>
                  <Badge variant="outline" className="text-success border-success">Available</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Delivery Options</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Email Delivery</span>
                  <Badge variant="outline" className="text-success border-success">Enabled</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Slack Integration</span>
                  <Badge variant="outline" className="text-success border-success">Enabled</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Teams Integration</span>
                  <Badge variant="outline">Disabled</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cloud Storage</span>
                  <Badge variant="outline" className="text-success border-success">S3 Bucket</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}