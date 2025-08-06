// Scanner Service API Client
// Base URL configuration for the backend scanner service

const SCANNER_API_BASE_URL = 'http://localhost:3000';

export interface ScanRequest {
  repo_url: string;
  branch?: string;
  scan_type: 'complete' | 'vulnerability' | 'sbom';
}

export interface ScanResponse {
  report_id: string;
  repo_id: string;
  scan_type: string;
  status: 'in_progress' | 'completed' | 'failed';
  files_to_scan: number;
  message: string;
}

export interface ScanReport {
  report_id: string;
  repo_id: string;
  repo_url: string;
  scan_type: string;
  status: 'in_progress' | 'completed' | 'failed';
  progress?: {
    total_files: number;
    processed_files?: number;
    percentage: number;
    current_file?: string;
  };
  summary?: {
    total_vulnerabilities: number;
    critical_vulnerabilities?: number;
    clean_files?: number;
  };
  vulnerability_count?: {
    Low: number;
    Medium: number;
    High: number;
    Critical: number;
  };
  repository_info?: {
    total_files: number;
    languages: Record<string, number>;
    file_types?: Record<string, number>;
  };
  scan_duration?: string;
  created_at: string;
  completed_at?: string;
  updated_at?: string;
  vulnerabilities?: any[];
  scan_results?: any;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  database: string;
  service: string;
}

export class ScannerService {
  private baseUrl: string;

  constructor(baseUrl: string = SCANNER_API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Check if the scanner service is healthy
   */
  async healthCheck(): Promise<HealthResponse> {
    const response = await fetch(`${this.baseUrl}/health`);
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Start a new repository scan
   */
  async startRepositoryScan(request: ScanRequest): Promise<ScanResponse> {
    const response = await fetch(`${this.baseUrl}/scan-repository`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Scan request failed: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get scan report by report ID
   */
  async getScanReport(reportId: string): Promise<ScanReport> {
    const response = await fetch(`${this.baseUrl}/scan-report/${reportId}`);
    if (!response.ok) {
      throw new Error(`Failed to get scan report: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get scan report summary by report ID (includes vulnerability counts)
   */
  async getScanReportSummary(reportId: string): Promise<ScanReport> {
    const response = await fetch(`${this.baseUrl}/scan-report/${reportId}/summary`);
    if (!response.ok) {
      throw new Error(`Failed to get scan report summary: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get all scan reports with pagination
   */
  async getScanReports(params?: {
    page?: number;
    limit?: number;
    status?: 'in_progress' | 'completed' | 'failed';
    scan_type?: 'complete' | 'vulnerability' | 'sbom';
  }): Promise<{
    reports: ScanReport[];
    pagination: {
      current_page: number;
      total_pages: number;
      total_reports: number;
      has_next: boolean;
      has_previous: boolean;
    };
  }> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.status) searchParams.set('status', params.status);
    if (params?.scan_type) searchParams.set('scan_type', params.scan_type);

    const response = await fetch(`${this.baseUrl}/scan-reports?${searchParams}`);
    if (!response.ok) {
      throw new Error(`Failed to get scan reports: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Retry a failed scan
   */
  async retryScan(reportId: string): Promise<{
    report_id: string;
    status: string;
    message: string;
    files_remaining: number;
    estimated_time: string;
  }> {
    const response = await fetch(`${this.baseUrl}/retry-scan/${reportId}`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Retry scan failed: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Direct code scanning (for small code snippets)
   */
  async scanCode(code: string, dependencies?: Record<string, string>): Promise<{
    analysis: {
      vulnerabilities: any[];
    };
    timestamp: string;
  }> {
    const response = await fetch(`${this.baseUrl}/scan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, dependencies }),
    });

    if (!response.ok) {
      throw new Error(`Code scan failed: ${response.statusText}`);
    }

    return response.json();
  }
}

// Create a default instance
export const scannerService = new ScannerService();

// Utility functions
export const formatScanDuration = (duration: string): string => {
  // Duration comes in format "HH:MM:SS"
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
};

export const formatFileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

export const getStatusBadgeClass = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'text-green-700 border-green-600 bg-green-50';
    case 'in_progress':
      return 'text-blue-700 border-blue-600 bg-blue-50';
    case 'failed':
      return 'text-red-700 border-red-600 bg-red-50';
    default:
      return 'text-slate-700 border-slate-600 bg-slate-50';
  }
};

export const getRiskLevelClass = (riskLevel: string): string => {
  switch (riskLevel.toLowerCase()) {
    case 'critical':
      return 'text-red-700 border-red-600 bg-red-50';
    case 'high':
      return 'text-orange-700 border-orange-600 bg-orange-50';
    case 'medium':
      return 'text-yellow-700 border-yellow-600 bg-yellow-50';
    case 'low':
      return 'text-green-700 border-green-600 bg-green-50';
    default:
      return 'text-slate-700 border-slate-600 bg-slate-50';
  }
};
