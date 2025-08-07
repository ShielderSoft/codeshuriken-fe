import { FileText, Download, Calendar, Plus, Filter, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useMemo } from "react";
import { useScanner } from "@/hooks/useScanner";

export default function Reports() {
  const { reports: scanReports, loading, error } = useScanner();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState<boolean>(false);
  const [selectedReportType, setSelectedReportType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedReportIds, setSelectedReportIds] = useState<string[]>([]);
  const [selectedReportFormat, setSelectedReportFormat] = useState<string>("");

  // Generate reports based on actual scan data
  const reports = useMemo(() => {
    return scanReports.map((report, index) => ({
      id: `RPT_${String(index + 1).padStart(3, '0')}`,
      name: `${report.scan_type.toUpperCase()} Scan Report - ${report.repo_url.split('/').pop()?.replace('.git', '') || 'Unknown'}`,
      type: "Automated",
      format: "JSON",
      lastGenerated: new Date(report.created_at).toLocaleString(),
      nextRun: report.status === 'completed' ? "On-Demand" : "In Progress",
      status: report.status === 'completed' ? 'Completed' : 
              report.status === 'failed' ? 'Failed' : 'In Progress',
      scanType: report.scan_type,
      vulnerabilities: report.vulnerabilities?.length || 0,
      repository: report.repo_url
    }));
  }, [scanReports]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "success";
      case "Completed": return "info";
      case "Failed": return "critical";
      default: return "muted";
    }
  };

  const addFilter = (filterType: string, value: string) => {
    const filterTag = `${filterType}:${value}`;
    if (!activeFilters.includes(filterTag)) {
      setActiveFilters([...activeFilters, filterTag]);
    }
  };

  const removeFilter = (filterToRemove: string) => {
    setActiveFilters(activeFilters.filter(filter => filter !== filterToRemove));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSelectedFormat("");
    setSelectedType("");
    setSelectedStatus("");
  };

  const handleGenerateReport = (reportType: string) => {
    setSelectedReportType(reportType);
    setIsGenerateModalOpen(true);
    // Initialize with all reports selected by default
    setSelectedReportIds(reports.map(report => report.id));
  };

  const handleReportSelection = (reportId: string, checked: boolean) => {
    if (checked) {
      setSelectedReportIds(prev => [...prev, reportId]);
    } else {
      setSelectedReportIds(prev => prev.filter(id => id !== reportId));
    }
  };

  const handleSelectAllReports = (checked: boolean) => {
    if (checked) {
      setSelectedReportIds(filteredModalReports.map(report => report.id));
    } else {
      setSelectedReportIds([]);
    }
  };

  const handleGenerateReportSubmit = async () => {
    try {
      // Validate that we have selected reports and format
      if (selectedReportIds.length === 0) {
        alert('Please select at least one report to generate.');
        return;
      }
      
      if (!selectedReportFormat) {
        alert('Please select an output format.');
        return;
      }

      // Prepare the payload
      const payload = {
        reportType: selectedReportType,
        reportIds: selectedReportIds,
        format: selectedReportFormat,
        timestamp: new Date().toISOString()
      };

      console.log('Sending generate report request:', payload);

      // Make API call to backend
      const response = await fetch('http://localhost:3000/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Generate report response:', result);
      
      // Show success message
      alert(`${selectedReportType} generation started successfully! Report will be available shortly.`);
      
      // Close modal and reset state
      setIsGenerateModalOpen(false);
      setSelectedReportType("");
      setSearchTerm("");
      setSelectedReportIds([]);
      setSelectedReportFormat("");
      
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    }
  };

  // Filter reports based on search term for the modal
  const filteredModalReports = reports.filter(report => 
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.repository.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.scanType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReports = reports.filter(report => {
    if (activeFilters.length === 0) return true;
    
    return activeFilters.every(filter => {
      const [filterType, filterValue] = filter.split(':');
      switch (filterType) {
        case 'format':
          return report.format.toLowerCase() === filterValue.toLowerCase();
        case 'type':
          return report.type.toLowerCase() === filterValue.toLowerCase();
        case 'status':
          return report.status.toLowerCase() === filterValue.toLowerCase();
        default:
          return true;
      }
    });
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">Generate and manage security reports</p>
        </div>
        
        <div className="flex space-x-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Filter Reports</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="filter-format">Format</Label>
                  <Select value={selectedFormat} onValueChange={(value) => {
                    setSelectedFormat(value);
                    if (value) addFilter('format', value);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="xls">Excel (XLS)</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="filter-type">Type</Label>
                  <Select value={selectedType} onValueChange={(value) => {
                    setSelectedType(value);
                    if (value) addFilter('type', value);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="on-demand">On-Demand</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="filter-status">Status</Label>
                  <Select value={selectedStatus} onValueChange={(value) => {
                    setSelectedStatus(value);
                    if (value) addFilter('status', value);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={clearAllFilters} className="flex-1">
                    Clear All
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
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
                      <SelectItem value="security-summary">Weekly Security Summary</SelectItem>
                      <SelectItem value="vulnerability-trends">Monthly Vulnerability Trends</SelectItem>
                      <SelectItem value="compliance-status">Compliance Status Report</SelectItem>
                      <SelectItem value="sbom-updates">SBOM Updates Report</SelectItem>
                      <SelectItem value="scan-activity">Scanning Activity Summary</SelectItem>
                      <SelectItem value="risk-assessment">Risk Assessment Report</SelectItem>
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

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">Active Filters:</span>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map((filter, index) => {
                    const [type, value] = filter.split(':');
                    return (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 px-2 py-1"
                      >
                        <span className="capitalize">{type}</span>: <span className="capitalize">{value}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => removeFilter(filter)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    );
                  })}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Security Summary</h3>
            <p className="text-sm text-muted-foreground mb-4">Generate immediate security overview</p>
            <Button size="sm" className="w-full" onClick={() => handleGenerateReport('Security Summary')}>Generate Now</Button>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
          <CardContent className="p-6 text-center">
            <Download className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">SBOM Export</h3>
            <p className="text-sm text-muted-foreground mb-4">Export software bill of materials</p>
            <Button size="sm" variant="outline" className="w-full" onClick={() => handleGenerateReport('SBOM Export')}>Export SBOM</Button>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Compliance Report</h3>
            <p className="text-sm text-muted-foreground mb-4">Generate compliance audit report</p>
            <Button size="sm" variant="outline" className="w-full" onClick={() => handleGenerateReport('Compliance Report')}>Generate Report</Button>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            All Reports {activeFilters.length > 0 && `(${filteredReports.length} of ${reports.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredReports.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {activeFilters.length > 0 ? 'No reports match the current filters.' : 'No reports available.'}
              </p>
              {activeFilters.length > 0 && (
                <Button variant="outline" onClick={clearAllFilters} className="mt-4">
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReports.map((report) => (
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
          )}
        </CardContent>
      </Card>

      {/* Generate Report Modal */}
      <Dialog open={isGenerateModalOpen} onOpenChange={setIsGenerateModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Generate {selectedReportType}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="report-format">Output Format</Label>
              <Select value={selectedReportFormat} onValueChange={setSelectedReportFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="search-reports">Search Available Reports</Label>
              <Input
                id="search-reports"
                placeholder="Search by report name, repository, or scan type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Available Reports</Label>
              <div className="border border-border rounded-md max-h-64 overflow-y-auto">
                <div className="grid grid-cols-12 gap-2 p-3 border-b border-border bg-muted/50 text-sm font-medium">
                  <div className="col-span-1">
                    <Checkbox 
                      id="select-all"
                      checked={selectedReportIds.length === filteredModalReports.length && filteredModalReports.length > 0}
                      onCheckedChange={handleSelectAllReports}
                    />
                  </div>
                  <div className="col-span-5">Report Name</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Vulnerabilities</div>
                </div>
                
                {filteredModalReports.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    {searchTerm ? 'No reports match your search.' : 'No reports available.'}
                  </div>
                ) : (
                  filteredModalReports.map((report) => (
                    <div key={report.id} className="grid grid-cols-12 gap-2 p-3 border-b border-border last:border-b-0 hover:bg-muted/30 text-sm">
                      <div className="col-span-1">
                        <Checkbox 
                          id={`modal-report-${report.id}`} 
                          checked={selectedReportIds.includes(report.id)}
                          onCheckedChange={(checked) => handleReportSelection(report.id, checked as boolean)}
                        />
                      </div>
                      <div className="col-span-5">
                        <div className="font-medium text-foreground truncate" title={report.name}>
                          {report.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {report.repository.split('/').pop()?.replace('.git', '')}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="outline" className="text-xs">
                          {report.scanType}
                        </Badge>
                      </div>
                      <div className="col-span-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs text-${getStatusColor(report.status)} border-${getStatusColor(report.status)}`}
                        >
                          {report.status}
                        </Badge>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="font-medium">{report.vulnerabilities}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email-recipients">Email Recipients (Optional)</Label>
              <Input 
                id="email-recipients" 
                placeholder="Enter email addresses separated by commas" 
                type="email"
              />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsGenerateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={handleGenerateReportSubmit}
                disabled={selectedReportIds.length === 0 || !selectedReportFormat}
              >
                Generate Report ({selectedReportIds.length} selected)
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}