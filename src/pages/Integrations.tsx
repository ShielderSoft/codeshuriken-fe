import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users, Mail, MessageSquare, Send, Github, GitBranch, Bug } from "lucide-react";

export default function Integrations() {
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

  const renderIntegrationCard = (tool: any) => (
    <Card key={tool.name} className="border-border">
      <CardContent className="p-6">
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
            >
              {tool.connected ? "Configure" : "Connect"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Integrations</h1>
        <p className="text-muted-foreground">Connect your tools and services to CodeShuriken</p>
      </div>

      {/* Communication Tools */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">Communication Tools</CardTitle>
            <p className="text-sm text-muted-foreground">
              Receive security alerts and reports through your preferred channels
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {communicationTools.map(renderIntegrationCard)}
          </CardContent>
        </Card>
      </div>

      {/* Development Tools */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">Development & Project Management</CardTitle>
            <p className="text-sm text-muted-foreground">
              Integrate with your development workflow and issue tracking
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {developmentTools.map(renderIntegrationCard)}
          </CardContent>
        </Card>
      </div>

      {/* Integration Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Alert Thresholds</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Critical Vulnerabilities</span>
                  <Badge variant="outline" className="text-critical border-critical">Immediate</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">High Severity Issues</span>
                  <Badge variant="outline">Within 1 hour</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Medium/Low Issues</span>
                  <Badge variant="outline">Daily digest</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Report Delivery</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Weekly Security Report</span>
                  <Badge variant="outline" className="text-success border-success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Monthly SBOM Report</span>
                  <Badge variant="outline" className="text-success border-success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Scan Completion Alerts</span>
                  <Badge variant="outline">Disabled</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}