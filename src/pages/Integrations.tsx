import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Users, Mail, MessageSquare, Send, Github, GitBranch, Bug, Settings, Check, AlertCircle, Clock, Shield } from "lucide-react";
import { useState } from "react";

export default function Integrations() {
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [weeklyReportStatus, setWeeklyReportStatus] = useState("enabled");
  const [monthlyReportStatus, setMonthlyReportStatus] = useState("enabled");
  const [scanAlertsStatus, setScanAlertsStatus] = useState("disabled");

  const communicationTools = [
    { name: "Slack", icon: MessageCircle, connected: true, description: "Team messaging and notifications" },
    { name: "Microsoft Teams", icon: Users, connected: false, description: "Video calls and collaboration" },
    { name: "Outlook", icon: Mail, connected: true, description: "Email notifications and reports" },
    { name: "Discord", icon: MessageSquare, connected: false, description: "Community chat platform" },
    { name: "Telegram", icon: Send, connected: false, description: "Instant messaging service" }
  ];

  const developmentTools = [
    { name: "GitHub", icon: Github, connected: true, description: "Source code repository management" },
    { name: "GitLab", icon: GitBranch, connected: true, description: "DevOps lifecycle management" },
    { name: "Jira", icon: Bug, connected: false, description: "Issue tracking and project management" }
  ];

  const handleButtonClick = (tool: any) => {
    setSelectedTool(tool);
    if (tool.connected) {
      setIsConfigureModalOpen(true);
    } else {
      setIsConnectModalOpen(true);
    }
  };

  const renderIntegrationCard = (tool: any) => (
    <div key={tool.name} className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-muted rounded-lg">
            <tool.icon className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{tool.name}</h3>
            <p className="text-sm text-muted-foreground">{tool.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge 
            variant={tool.connected ? "default" : "outline"}
            className={tool.connected ? "bg-success text-success-foreground" : ""}
          >
            {tool.connected ? "Connected" : "Not Connected"}
          </Badge>
          <Button 
            variant={tool.connected ? "outline" : "default"}
            size="sm"
            onClick={() => handleButtonClick(tool)}
          >
            {tool.connected ? "Configure" : "Connect"}
          </Button>
        </div>
      </div>
    </div>
  );

  // Configure Modal Component
  const ConfigureModal = () => (
    <Dialog open={isConfigureModalOpen} onOpenChange={setIsConfigureModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {selectedTool?.icon && <selectedTool.icon className="h-6 w-6" />}
            Configure {selectedTool?.name}
          </DialogTitle>
          <DialogDescription>
            Manage notification preferences and connection settings for {selectedTool?.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Connection Status */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Connected</p>
                <p className="text-sm text-muted-foreground">
                  {selectedTool?.name === "Slack" ? "ShielderSoft Workspace" : 
                   selectedTool?.name === "Outlook" ? "user@company.com" : 
                   "Connected Account"}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-600">
              Active
            </Badge>
          </div>

          {/* Notification Preferences */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Alert Notifications
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Critical Vulnerabilities</p>
                  <p className="text-xs text-muted-foreground">Immediate alerts for critical security issues</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">High Severity Issues</p>
                  <p className="text-xs text-muted-foreground">Alerts within 1 hour</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Medium/Low Issues</p>
                  <p className="text-xs text-muted-foreground">Daily digest summary</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          <Separator />

          {/* Channel/Email Configuration */}
          <div className="space-y-4">
            <h4 className="font-medium">Delivery Settings</h4>
            {selectedTool?.name === "Slack" || selectedTool?.name === "Microsoft Teams" || selectedTool?.name === "Discord" ? (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="channel">Channel/Room</Label>
                  <Select defaultValue="security">
                    <SelectTrigger>
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="security">#security</SelectItem>
                      <SelectItem value="alerts">#alerts</SelectItem>
                      <SelectItem value="dev-team">#dev-team</SelectItem>
                      <SelectItem value="general">#general</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Mention @channel for critical alerts</p>
                    <p className="text-xs text-muted-foreground">Notify entire channel for urgent issues</p>
                  </div>
                  <Switch />
                </div>
              </div>
            ) : (
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="security@company.com" 
                  defaultValue="security@company.com"
                />
              </div>
            )}
          </div>

          <Separator />

          {/* Report Settings */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security Reports
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Weekly Security Report</p>
                  <p className="text-xs text-muted-foreground">Comprehensive weekly security summary</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Monthly SBOM Report</p>
                  <p className="text-xs text-muted-foreground">Software Bill of Materials report</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Scan Completion Alerts</p>
                  <p className="text-xs text-muted-foreground">Notify when scans complete</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setIsConfigureModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsConfigureModalOpen(false)}>
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Connect Modal Component
  const ConnectModal = () => (
    <Dialog open={isConnectModalOpen} onOpenChange={setIsConnectModalOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {selectedTool?.icon && <selectedTool.icon className="h-6 w-6" />}
            Connect to {selectedTool?.name}
          </DialogTitle>
          <DialogDescription>
            Set up your {selectedTool?.name} integration to receive security alerts and reports
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Connection Steps */}
          <div className="space-y-4">
            {selectedTool?.name === "Slack" && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="workspace">Workspace URL</Label>
                  <Input 
                    id="workspace" 
                    placeholder="your-workspace.slack.com" 
                  />
                </div>
                <div>
                  <Label htmlFor="bot-token">Bot Token</Label>
                  <Input 
                    id="bot-token" 
                    type="password" 
                    placeholder="xoxb-your-bot-token" 
                  />
                </div>
              </div>
            )}
            
            {selectedTool?.name === "Microsoft Teams" && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="tenant">Tenant ID</Label>
                  <Input 
                    id="tenant" 
                    placeholder="your-tenant-id" 
                  />
                </div>
                <div>
                  <Label htmlFor="webhook">Webhook URL</Label>
                  <Input 
                    id="webhook" 
                    placeholder="https://outlook.office.com/webhook/..." 
                  />
                </div>
              </div>
            )}
            
            {selectedTool?.name === "Discord" && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="server">Server ID</Label>
                  <Input 
                    id="server" 
                    placeholder="Your Discord server ID" 
                  />
                </div>
                <div>
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input 
                    id="webhook-url" 
                    placeholder="https://discord.com/api/webhooks/..." 
                  />
                </div>
              </div>
            )}
            
            {selectedTool?.name === "Telegram" && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="bot-token">Bot Token</Label>
                  <Input 
                    id="bot-token" 
                    type="password" 
                    placeholder="Your Telegram bot token" 
                  />
                </div>
                <div>
                  <Label htmlFor="chat-id">Chat ID</Label>
                  <Input 
                    id="chat-id" 
                    placeholder="Your chat ID" 
                  />
                </div>
              </div>
            )}
          </div>

          {/* Initial Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Initial Notification Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Critical alerts</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Weekly reports</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Setup Guide */}
          <div className="p-4 bg-muted rounded-lg">
            <h5 className="font-medium text-sm mb-2">Setup Instructions:</h5>
            <ol className="text-xs text-muted-foreground space-y-1">
              <li>1. Create a {selectedTool?.name} bot/application</li>
              <li>2. Copy the required credentials</li>
              <li>3. Test the connection</li>
              <li>4. Configure notification preferences</li>
            </ol>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setIsConnectModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsConnectModalOpen(false)}>
            Connect & Test
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Integrations</h1>
        <p className="text-muted-foreground">Connect your tools and services to CodeShuriken</p>
      </div>

      {/* Single Card with Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-foreground">Integration Management</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage all your integrations, development tools, and notification preferences in one place
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="communication" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="communication" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Communication
              </TabsTrigger>
              <TabsTrigger value="development" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                Development
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Notification Settings
              </TabsTrigger>
            </TabsList>

            {/* Communication Tools Tab */}
            <TabsContent value="communication" className="space-y-4 mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-foreground mb-2">Communication Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Receive security alerts and reports through your preferred channels
                </p>
              </div>
              <div className="space-y-4">
                {communicationTools.map(renderIntegrationCard)}
              </div>
            </TabsContent>

            {/* Development Tools Tab */}
            <TabsContent value="development" className="space-y-4 mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-foreground mb-2">Development & Project Management</h3>
                <p className="text-sm text-muted-foreground">
                  Integrate with your development workflow and issue tracking
                </p>
              </div>
              <div className="space-y-4">
                {developmentTools.map(renderIntegrationCard)}
              </div>
            </TabsContent>

            {/* Notification Settings Tab */}
            <TabsContent value="notifications" className="space-y-4 mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-foreground mb-2">Notification Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure how and when you receive notifications and reports
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Alert Thresholds</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-full">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-red-900">Critical Vulnerabilities</span>
                          <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-red-100 text-red-700 border-red-200">
                            CRITICAL
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 border-red-600 bg-white hover:bg-red-50 hover:text-red-700 font-medium px-4 py-2 rounded-md shadow-sm"
                      >
                        Immediate
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-full">
                          <Clock className="h-4 w-4 text-orange-600" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-orange-900">High Severity Issues</span>
                          <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 border-orange-200">
                            HIGH
                          </Badge>
                        </div>
                      </div>
                      <Select defaultValue="15-minutes">
                        <SelectTrigger className="w-44 border-orange-300 focus:border-orange-500 focus:ring-orange-500 bg-white shadow-sm font-medium">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15-minutes" className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            Within 15 minutes
                          </SelectItem>
                          <SelectItem value="30-minutes" className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            Within 30 minutes
                          </SelectItem>
                          <SelectItem value="45-minutes" className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            Within 45 minutes
                          </SelectItem>
                          <SelectItem value="1-hour" className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            Within 1 hour
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 rounded-full">
                          <Shield className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-yellow-900">Medium/Low Issues</span>
                          <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 border-yellow-200">
                            MED/LOW
                          </Badge>
                        </div>
                      </div>
                      <Select defaultValue="4-hours">
                        <SelectTrigger className="w-44 border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500 bg-white shadow-sm font-medium">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4-hours" className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            Within 4 hours
                          </SelectItem>
                          <SelectItem value="8-hours" className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            Within 8 hours
                          </SelectItem>
                          <SelectItem value="daily-digest" className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            Daily digest
                          </SelectItem>
                          <SelectItem value="2-days" className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            Within 2 days
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Report Delivery</h4>
                  <div className="space-y-4">
                    <div className={`flex items-center justify-between p-3 rounded-lg border ${
                      weeklyReportStatus === 'enabled' 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <span className={`text-sm font-medium ${
                        weeklyReportStatus === 'enabled' 
                          ? 'text-green-900' 
                          : 'text-red-900'
                      }`}>
                        Weekly Security Report
                      </span>
                      <Select value={weeklyReportStatus} onValueChange={setWeeklyReportStatus}>
                        <SelectTrigger className={`w-32 shadow-sm font-medium ${
                          weeklyReportStatus === 'enabled' 
                            ? 'bg-green-100 border-green-300 text-green-800 hover:bg-green-200 focus:border-green-500 focus:ring-green-500' 
                            : 'bg-red-100 border-red-300 text-red-800 hover:bg-red-200 focus:border-red-500 focus:ring-red-500'
                        }`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled" className="text-green-600">Enabled</SelectItem>
                          <SelectItem value="disabled" className="text-red-600">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className={`flex items-center justify-between p-3 rounded-lg border ${
                      monthlyReportStatus === 'enabled' 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <span className={`text-sm font-medium ${
                        monthlyReportStatus === 'enabled' 
                          ? 'text-green-900' 
                          : 'text-red-900'
                      }`}>
                        Monthly SBOM Report
                      </span>
                      <Select value={monthlyReportStatus} onValueChange={setMonthlyReportStatus}>
                        <SelectTrigger className={`w-32 shadow-sm font-medium ${
                          monthlyReportStatus === 'enabled' 
                            ? 'bg-green-100 border-green-300 text-green-800 hover:bg-green-200 focus:border-green-500 focus:ring-green-500' 
                            : 'bg-red-100 border-red-300 text-red-800 hover:bg-red-200 focus:border-red-500 focus:ring-red-500'
                        }`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled" className="text-green-600">Enabled</SelectItem>
                          <SelectItem value="disabled" className="text-red-600">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className={`flex items-center justify-between p-3 rounded-lg border ${
                      scanAlertsStatus === 'enabled' 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <span className={`text-sm font-medium ${
                        scanAlertsStatus === 'enabled' 
                          ? 'text-green-900' 
                          : 'text-red-900'
                      }`}>
                        Scan Completion Alerts
                      </span>
                      <Select value={scanAlertsStatus} onValueChange={setScanAlertsStatus}>
                        <SelectTrigger className={`w-32 shadow-sm font-medium ${
                          scanAlertsStatus === 'enabled' 
                            ? 'bg-green-100 border-green-300 text-green-800 hover:bg-green-200 focus:border-green-500 focus:ring-green-500' 
                            : 'bg-red-100 border-red-300 text-red-800 hover:bg-red-200 focus:border-red-500 focus:ring-red-500'
                        }`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled" className="text-green-600">Enabled</SelectItem>
                          <SelectItem value="disabled" className="text-red-600">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Modals */}
      <ConfigureModal />
      <ConnectModal />
    </div>
  );
}
