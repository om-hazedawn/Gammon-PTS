import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Risk Management types
export interface RiskItem {
  id?: number;
  riskNo?: string;
  projectId?: number;
  projectName?: string;
  riskType: string;
  riskCategory: string;
  riskDescription: string;
  likelihood: number; // 1-5 scale
  impact: number; // 1-5 scale
  riskScore: number; // likelihood * impact
  riskLevel: string; // Low, Medium, High, Critical
  owner?: string;
  status: string;
  mitigation?: string;
  contingency?: string;
  targetDate?: Date;
  actualDate?: Date;
  createdDate?: Date;
  createdBy?: string;
  modifiedDate?: Date;
  modifiedBy?: string;
}

export interface RiskRegister {
  id?: number;
  projectId: number;
  projectName: string;
  registerDate: Date;
  totalRisks: number;
  highRisks: number;
  mediumRisks: number;
  lowRisks: number;
  status: string;
  approvedBy?: string;
  approvedDate?: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class RiskApiService {
  private readonly baseUrl = environment.apiUrl || '/api';

  constructor(private http: HttpClient) {}

  // Risk Register methods
  getRiskRegisters(filters?: any): Observable<ApiResponse<RiskRegister[]>> {
    return this.http.post<ApiResponse<RiskRegister[]>>(
      `${this.baseUrl}/risk/RiskRegister/list`,
      filters || {}
    );
  }

  getRiskRegister(id: number): Observable<ApiResponse<RiskRegister>> {
    return this.http.get<ApiResponse<RiskRegister>>(`${this.baseUrl}/risk/RiskRegister/${id}`);
  }

  saveRiskRegister(register: RiskRegister): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(`${this.baseUrl}/risk/RiskRegister/save`, register);
  }

  deleteRiskRegister(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.baseUrl}/risk/RiskRegister/${id}`);
  }

  // Risk Item methods
  getRiskItems(registerId?: number, filters?: any): Observable<ApiResponse<RiskItem[]>> {
    const payload = { registerId, ...filters };
    return this.http.post<ApiResponse<RiskItem[]>>(`${this.baseUrl}/risk/RiskItem/list`, payload);
  }

  getRiskItem(id: number): Observable<ApiResponse<RiskItem>> {
    return this.http.get<ApiResponse<RiskItem>>(`${this.baseUrl}/risk/RiskItem/${id}`);
  }

  saveRiskItem(riskItem: RiskItem): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(`${this.baseUrl}/risk/RiskItem/save`, riskItem);
  }

  deleteRiskItem(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.baseUrl}/risk/RiskItem/${id}`);
  }

  updateRiskStatus(id: number, status: string): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(`${this.baseUrl}/risk/RiskItem/${id}/status`, {
      status,
    });
  }

  // Risk Analysis methods
  getRiskMatrix(registerId: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/risk/Analysis/matrix/${registerId}`);
  }

  getRiskTrends(registerId: number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/risk/Analysis/trends/${registerId}`);
  }

  getRiskSummary(registerId: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/risk/Analysis/summary/${registerId}`);
  }

  // Risk Reports
  exportRiskRegister(registerId: number, format: 'pdf' | 'excel'): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/risk/Reports/register/${registerId}/${format}`, {
      responseType: 'blob',
    });
  }

  exportRiskMatrix(registerId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/risk/Reports/matrix/${registerId}`, {
      responseType: 'blob',
    });
  }

  // Lookup data
  getRiskTypes(): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${this.baseUrl}/risk/Lookup/types`);
  }

  getRiskCategories(): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${this.baseUrl}/risk/Lookup/categories`);
  }

  getRiskStatuses(): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${this.baseUrl}/risk/Lookup/statuses`);
  }

  // Project lookup
  getProjects(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/risk/Lookup/projects`);
  }

  // Risk calculation helpers
  calculateRiskScore(likelihood: number, impact: number): number {
    return likelihood * impact;
  }

  getRiskLevel(score: number): string {
    if (score >= 20) return 'Critical';
    if (score >= 15) return 'High';
    if (score >= 10) return 'Medium';
    if (score >= 5) return 'Low';
    return 'Very Low';
  }

  getRiskLevelColor(level: string): string {
    switch (level) {
      case 'Critical':
        return '#d32f2f';
      case 'High':
        return '#f57c00';
      case 'Medium':
        return '#fbc02d';
      case 'Low':
        return '#689f38';
      default:
        return '#2196f3';
    }
  }
}
