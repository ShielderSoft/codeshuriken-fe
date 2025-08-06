import { useState, useEffect, useCallback } from 'react';
import { scannerService, ScanReport, ScanRequest } from '@/services/scannerService';

export interface UseScannerOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
  initialReports?: ScanReport[];
}

export const useScanner = (options: UseScannerOptions = {}) => {
  const {
    autoRefresh = true,
    refreshInterval = 5000, // 5 seconds
    initialReports = []
  } = options;

  const [reports, setReports] = useState<ScanReport[]>(initialReports);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serviceHealth, setServiceHealth] = useState<{
    status: string;
    healthy: boolean;
  } | null>(null);

  // Check service health
  const checkHealth = useCallback(async () => {
    try {
      const health = await scannerService.healthCheck();
      setServiceHealth({
        status: health.status,
        healthy: health.status === 'healthy'
      });
    } catch (err) {
      setServiceHealth({
        status: 'unhealthy',
        healthy: false
      });
    }
  }, []);

  // Fetch all scan reports
  const fetchReports = useCallback(async (filters?: {
    status?: 'in_progress' | 'completed' | 'failed';
    scan_type?: 'complete' | 'vulnerability' | 'sbom';
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await scannerService.getScanReports({
        limit: 50,
        ...filters
      });
      
      // For completed scans, fetch summary data to get vulnerability counts
      const enhancedReports = await Promise.all(
        response.reports.map(async (report) => {
          if (report.status === 'completed') {
            try {
              const summaryReport = await scannerService.getScanReportSummary(report.report_id);
              return { ...report, vulnerability_count: summaryReport.vulnerability_count };
            } catch (err) {
              // If summary fails, return original report
              console.warn(`Failed to fetch summary for ${report.report_id}:`, err);
              return report;
            }
          }
          return report;
        })
      );
      
      setReports(enhancedReports);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  }, []);

  // Start a new scan
  const startScan = useCallback(async (request: ScanRequest) => {
    try {
      setError(null);
      const response = await scannerService.startRepositoryScan(request);
      
      // Refresh reports to include the new scan
      await fetchReports();
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start scan';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [fetchReports]);

  // Get specific scan report
  const getScanReport = useCallback(async (reportId: string) => {
    try {
      const report = await scannerService.getScanReport(reportId);
      
      // Update the report in the list
      setReports(prev => prev.map(r => 
        r.report_id === reportId ? report : r
      ));
      
      return report;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get scan report');
      throw err;
    }
  }, []);

  // Retry failed scan
  const retryScan = useCallback(async (reportId: string) => {
    try {
      setError(null);
      await scannerService.retryScan(reportId);
      
      // Refresh reports to get updated status
      await fetchReports();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to retry scan');
      throw err;
    }
  }, [fetchReports]);

  // Get scan statistics
  const getStatistics = useCallback(() => {
    // Calculate vulnerability counts from vulnerability_count field
    const vulnerabilityCounts = reports.reduce((acc, r) => {
      if (r.vulnerability_count) {
        acc.critical += r.vulnerability_count.Critical || 0;
        acc.high += r.vulnerability_count.High || 0;
        acc.medium += r.vulnerability_count.Medium || 0;
        acc.low += r.vulnerability_count.Low || 0;
      }
      return acc;
    }, { critical: 0, high: 0, medium: 0, low: 0 });

    const stats = {
      total: reports.length,
      completed: reports.filter(r => r.status === 'completed').length,
      inProgress: reports.filter(r => r.status === 'in_progress').length,
      failed: reports.filter(r => r.status === 'failed').length,
      totalVulnerabilities: vulnerabilityCounts.critical + vulnerabilityCounts.high + 
                           vulnerabilityCounts.medium + vulnerabilityCounts.low,
      criticalVulnerabilities: vulnerabilityCounts.critical,
      highVulnerabilities: vulnerabilityCounts.high,
      mediumVulnerabilities: vulnerabilityCounts.medium,
      lowVulnerabilities: vulnerabilityCounts.low,
      // Legacy fields for backward compatibility
      vulnerabilitiesFromSummary: reports.reduce((sum, r) => 
        sum + (r.summary?.total_vulnerabilities || 0), 0
      ),
      criticalFromSummary: reports.reduce((sum, r) => 
        sum + (r.summary?.critical_vulnerabilities || 0), 0
      )
    };
    
    return stats;
  }, [reports]);

  // Get recent scans (last 10)
  const getRecentScans = useCallback(() => {
    return [...reports]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10);
  }, [reports]);

  // Get running scans
  const getRunningScans = useCallback(() => {
    return reports.filter(r => r.status === 'in_progress');
  }, [reports]);

  // Auto-refresh effect
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      const runningScanIds = getRunningScans().map(r => r.report_id);
      
      // Update running scans
      runningScanIds.forEach(async (reportId) => {
        try {
          await getScanReport(reportId);
        } catch (err) {
          console.error('Failed to update scan:', err);
        }
      });
      
      // Check service health
      checkHealth();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, getRunningScans, getScanReport, checkHealth]);

  // Initial data fetch
  useEffect(() => {
    fetchReports();
    checkHealth();
  }, [fetchReports, checkHealth]);

  return {
    // Data
    reports,
    serviceHealth,
    loading,
    error,
    
    // Actions
    fetchReports,
    startScan,
    getScanReport,
    retryScan,
    
    // Computed data
    getStatistics,
    getRecentScans,
    getRunningScans,
    
    // Utils
    setError: (error: string | null) => setError(error)
  };
};

// Hook for monitoring a specific scan
export const useScanMonitor = (reportId: string | null) => {
  const [report, setReport] = useState<ScanReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshReport = useCallback(async () => {
    if (!reportId) return;

    try {
      setLoading(true);
      setError(null);
      const updatedReport = await scannerService.getScanReport(reportId);
      setReport(updatedReport);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch report');
    } finally {
      setLoading(false);
    }
  }, [reportId]);

  // Auto-refresh if scan is in progress
  useEffect(() => {
    if (!reportId || !report) return;
    if (report.status !== 'in_progress') return;

    const interval = setInterval(refreshReport, 3000); // 3 seconds for active scans
    return () => clearInterval(interval);
  }, [reportId, report, refreshReport]);

  // Initial fetch
  useEffect(() => {
    if (reportId) {
      refreshReport();
    }
  }, [reportId, refreshReport]);

  return {
    report,
    loading,
    error,
    refreshReport
  };
};
