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
import { MessageCircle, Users, Mail, MessageSquare, Send, Github, GitBranch, Bug, Settings, Check, AlertCircle, Clock, Shield, Loader2, TestTube, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { IntegrationService } from "@/services/integrationService";
import { toast } from "@/hooks/use-toast";

export default function Integrations() {
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [weeklyReportStatus, setWeeklyReportStatus] = useState("enabled");
  const [monthlyReportStatus, setMonthlyReportStatus] = useState("enabled");
  const [scanAlertsStatus, setScanAlertsStatus] = useState("disabled");
  const [serviceHealth, setServiceHealth] = useState<any>(null);
  const [discordBotStatus, setDiscordBotStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  
  // Form data for connections
  const [telegramChatId, setTelegramChatId] = useState("1587024489"); // Default from API docs
  const [discordUserId, setDiscordUserId] = useState("1392614645944291510"); // Default from API docs

  const communicationTools = [
    { name: "Slack", icon: MessageCircle, connected: true, description: "Team messaging and notifications" },
    { name: "Microsoft Teams", icon: Users, connected: false, description: "Video calls and collaboration" },
    { name: "Outlook", icon: Mail, connected: true, description: "Email notifications and reports" },
    { name: "Discord", icon: MessageSquare, connected: discordBotStatus?.connected || false, description: "Community chat platform", apiEnabled: true },
    { name: "Telegram", icon: Send, connected: false, description: "Instant messaging service", apiEnabled: true }
  ];

  // Check service health and Discord bot status on component mount
  useEffect(() => {
    checkServiceStatus();
  }, []);

  const checkServiceStatus = async () => {
    try {
      setIsLoading(true);
      
      // Check service health
      const healthResponse = await IntegrationService.checkHealth();
      if (healthResponse.success) {
        setServiceHealth(healthResponse.data);
        toast({
          title: "Service Connected",
          description: "Integration service is running and healthy",
        });
      }

      // Check Discord bot status
      const discordResponse = await IntegrationService.getDiscordBotStatus();
      if (discordResponse.success) {
        setDiscordBotStatus(discordResponse.data);
      }
    } catch (error) {
      console.error('Failed to check service status:', error);
      toast({
        title: "Service Unavailable",
        description: "Could not connect to integration service. Make sure it's running on localhost:3000",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async (toolName: string) => {
    setIsTestingConnection(true);
    try {
      let success = false;
      
      if (toolName === "Telegram") {
        success = await IntegrationService.testTelegramConnection(telegramChatId);
      } else if (toolName === "Discord") {
        success = await IntegrationService.testDiscordConnection(discordUserId);
      }

      if (success) {
        toast({
          title: "Connection Successful",
          description: `Test message sent to ${toolName} successfully!`,
        });
      } else {
        toast({
          title: "Connection Failed",
          description: `Failed to send test message to ${toolName}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(`${toolName} connection test failed:`, error);
      toast({
        title: "Connection Error",
        description: `Error testing ${toolName} connection`,
        variant: "destructive",
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const runQuickTestSuite = async () => {
    setIsLoading(true);
    try {
      const results = await IntegrationService.runQuickTestSuite();
      
      let message = "Test Results:\n";
      message += `✅ Service Health: ${results.health ? "OK" : "Failed"}\n`;
      message += `✅ Discord Bot: ${results.discordBot ? "Connected" : "Failed"}`;
      
      toast({
        title: "Quick Test Complete",
        description: message,
      });
    } catch (error) {
      toast({
        title: "Test Suite Failed",
        description: "Could not complete the test suite",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          {/* API-enabled tools show different content */}
          {selectedTool?.apiEnabled ? (
            <div className="space-y-4">
              {selectedTool?.name === "Telegram" && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="chat-id">Chat ID</Label>
                    <Input 
                      id="chat-id" 
                      value={telegramChatId}
                      onChange={(e) => setTelegramChatId(e.target.value)}
                      placeholder="Your Telegram chat ID" 
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Get your chat ID by messaging @userinfobot on Telegram
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h5 className="font-medium text-sm mb-2">Quick Setup:</h5>
                    <ol className="text-xs text-muted-foreground space-y-1">
                      <li>1. Start a chat with the bot</li>
                      <li>2. Get your chat ID from @userinfobot</li>
                      <li>3. Enter the chat ID above</li>
                      <li>4. Test the connection</li>
                    </ol>
                  </div>
                </div>
              )}
              
              {selectedTool?.name === "Discord" && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="user-id">User ID</Label>
                    <Input 
                      id="user-id" 
                      value={discordUserId}
                      onChange={(e) => setDiscordUserId(e.target.value)}
                      placeholder="Your Discord user ID" 
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enable Developer Mode in Discord settings to copy your user ID
                    </p>
                  </div>
                  {discordBotStatus && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Bot Status: Connected</span>
                      </div>
                      <p className="text-xs text-green-700 mt-1">
                        Bot: {discordBotStatus.bot?.username}#{discordBotStatus.bot?.discriminator}
                      </p>
                    </div>
                  )}
                  <div className="p-4 bg-muted rounded-lg">
                    <h5 className="font-medium text-sm mb-2">Quick Setup:</h5>
                    <ol className="text-xs text-muted-foreground space-y-1">
                      <li>1. Enable Developer Mode in Discord</li>
                      <li>2. Right-click your username and "Copy ID"</li>
                      <li>3. Enter your user ID above</li>
                      <li>4. Test the connection</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* Test Connection Button */}
              <Button 
                onClick={() => testConnection(selectedTool?.name)}
                disabled={isTestingConnection}
                className="w-full"
                variant="outline"
              >
                {isTestingConnection ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing Connection...
                  </>
                ) : (
                  <>
                    <TestTube className="mr-2 h-4 w-4" />
                    Test Connection
                  </>
                )}
              </Button>
            </div>
          ) : (
            /* Original connection form for non-API tools */
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

              {/* Setup Guide for non-API tools */}
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
          )}

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
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setIsConnectModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsConnectModalOpen(false)}>
            {selectedTool?.apiEnabled ? "Save Configuration" : "Connect & Test"}
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

      {/* Service Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Integration Service Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full ${serviceHealth ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className={`w-3 h-3 rounded-full ${serviceHealth ? 'bg-green-500' : 'bg-red-500'}`} />
              </div>
              <div>
                <p className="font-medium">
                  {serviceHealth ? 'Service Online' : 'Service Offline'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {serviceHealth ? serviceHealth.service : 'Integration service is not responding'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={checkServiceStatus}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Refresh Status"
                )}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={runQuickTestSuite}
                disabled={isLoading || !serviceHealth}
              >
                <TestTube className="h-4 w-4 mr-2" />
                Quick Test
              </Button>
            </div>
          </div>
          {serviceHealth && (
            <div className="mt-4 text-xs text-muted-foreground">
              Last checked: {new Date(serviceHealth.timestamp).toLocaleString()}
            </div>
          )}
        </CardContent>
      </Card>

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
