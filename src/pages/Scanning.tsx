import { Upload, Play, Clock, CheckCircle, XCircle, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useScanner } from "@/hooks/useScanner";
import { useState } from "react";
import { getRepositoryName } from "@/lib/utils";

export default function Scanning() {
  const { reports, getStatistics, serviceHealth, loading, error, startScan } = useScanner();
  const [repoUrl, setRepoUrl] = useState("https://github.com/SarthakShieldersoft/TestVWA.git");
  const [branch, setBranch] = useState("main");
  const [scanType, setScanType] = useState<"complete" | "vulnerability" | "sbom">("vulnerability");
  
  const stats = getStatistics();
  
  // Filter scans by type
  const vulnerabilityScans = reports.filter(r => r.scan_type === 'vulnerability' || r.scan_type === 'complete');
  const sbomScans = reports.filter(r => r.scan_type === 'sbom' || r.scan_type === 'complete');

  // Handle scan start
  const handleStartScan = async () => {
    try {
      await startScan({
        repo_url: repoUrl,
        branch: branch,
        scan_type: scanType
      });
    } catch (err) {
      console.error("Failed to start scan:", err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-success" />;
      case "in_progress": return <Clock className="h-4 w-4 text-info animate-spin" />;
      case "failed": return <XCircle className="h-4 w-4 text-critical" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success";
      case "in_progress": return "info";
      case "failed": return "critical";
      default: return "muted";
    }
  };

  const renderScanItem = (job: any) => {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const formatTime = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const getLanguagesDisplay = (languages: any) => {
      if (typeof languages === 'object' && languages !== null) {
        return Object.keys(languages).join(", ");
      }
      return Array.isArray(languages) ? languages.join(", ") : "";
    };

    return (
      <div key={job.report_id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-4">
          {getStatusIcon(job.status)}
          <div className="flex-1">
            <div className="font-semibold text-foreground mb-1">{getRepositoryName(job.repo_url)}</div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-medium">Scan ID:</span>
                <span className="text-xs">{job.report_id.split('_')[0]}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-green-600 font-medium">{job.progress ? job.progress.total_files : 0} files</span>
                <span className="text-purple-600 font-medium">{job.scan_type.toUpperCase()}</span>
                {job.status === "in_progress" && job.progress && (
                  <span className="text-orange-600 font-medium">{job.progress.percentage}% complete</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {((job.summary && job.summary.total_vulnerabilities > 0) || (job.scan_results && job.scan_results.vulnerabilities_detected > 0)) && (
            <div className="flex flex-col items-center justify-center bg-red-50 border border-red-200 rounded-lg p-3 min-w-[100px]">
              <div className="text-lg font-bold text-red-700">
                {job.summary?.total_vulnerabilities || job.scan_results?.vulnerabilities_detected || 0}
              </div>
              <div className="text-xs text-red-600 font-medium text-center">vulnerabilities</div>
            </div>
          )}
          
          <div className="text-right text-sm">
            <div className="font-medium text-foreground">
              {job.status === "completed" && job.completed_at ? formatTime(job.completed_at) : 
               job.status === "in_progress" ? "Running..." : 
               formatTime(job.created_at)}
            </div>
            <div className="text-muted-foreground">{formatDate(job.created_at)}</div>
            {job.scan_duration && (
              <div className="text-xs text-green-600">{job.scan_duration}</div>
            )}
          </div>

          <Badge 
            variant="outline" 
            className={`font-medium ${
              job.status === 'completed' ? 'text-green-700 border-green-600 bg-green-50' :
              job.status === 'in_progress' ? 'text-blue-700 border-blue-600 bg-blue-50' :
              job.status === 'failed' ? 'text-red-700 border-red-600 bg-red-50' :
              'text-slate-700 border-slate-600 bg-slate-50'
            }`}
          >
            {job.status.replace('_', ' ')}
          </Badge>

          <Button 
            variant="outline" 
            size="sm" 
            className="text-muted-foreground hover:bg-muted hover:text-foreground border-border font-medium px-3"
          >
            ⋯
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Security Scanning</h1>
        <p className="text-muted-foreground">Upload and scan repositories for security vulnerabilities</p>
      </div>

      {/* Scan Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
            <div className="text-sm text-blue-700">Total Scans</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-900">{stats.completed}</div>
            <div className="text-sm text-green-700">Completed</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-900">{stats.inProgress}</div>
            <div className="text-sm text-yellow-700">In Progress</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-900">{stats.failed}</div>
            <div className="text-sm text-red-700">Failed</div>
          </CardContent>
        </Card>
      </div>

      {/* Upload and Scan Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Start Repository Scan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="repo-url">Repository URL</Label>
              <Input 
                id="repo-url" 
                placeholder="https://github.com/username/repository.git" 
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Input 
                id="branch" 
                placeholder="main" 
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scan-type">Scan Type</Label>
              <Select value={scanType} onValueChange={(value: "complete" | "vulnerability" | "sbom") => setScanType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select scan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="complete">Complete Scan (All files)</SelectItem>
                  <SelectItem value="vulnerability">Vulnerability Scan (Code files only)</SelectItem>
                  <SelectItem value="sbom">SBOM Generation (Dependencies only)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={handleStartScan}
              disabled={loading || !repoUrl.trim()}
            >
              <Play className="h-4 w-4 mr-2" />
              {loading ? "Starting..." : "Start Scan"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Scan Monitoring</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Service Status</Label>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${serviceHealth?.healthy ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-foreground">
                  {serviceHealth?.healthy ? 'Scanner Service Online' : 'Scanner Service Offline'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Queue Status</Label>
              <div className="text-sm text-muted-foreground">
                {stats.inProgress} scans in progress, {stats.failed} failed
              </div>
            </div>

            <div className="space-y-2">
              <Label>Total Scans</Label>
              <div className="text-sm text-muted-foreground">
                {stats.total} total scans, {stats.completed} completed successfully
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              View System Logs
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
                {loading && <div className="text-center text-muted-foreground">Loading scans...</div>}
                {error && <div className="text-center text-red-600">Error: {error}</div>}
                {!loading && vulnerabilityScans.length === 0 && (
                  <div className="text-center text-muted-foreground">No vulnerability scans found</div>
                )}
                {vulnerabilityScans.map(renderScanItem)}
              </div>
            </TabsContent>

            <TabsContent value="sca-sbom" className="space-y-4 mt-6">
              <div className="space-y-4">
                {loading && <div className="text-center text-muted-foreground">Loading scans...</div>}
                {error && <div className="text-center text-red-600">Error: {error}</div>}
                {!loading && sbomScans.length === 0 && (
                  <div className="text-center text-muted-foreground">No SBOM scans found</div>
                )}
                {sbomScans.map(renderScanItem)}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
