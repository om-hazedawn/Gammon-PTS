import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface SystemConfig {
  id: number;
  key: string;
  description: string;
  value: string;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
  status: string;
}

interface SystemConfigApiResponse {
  data: SystemConfig[];
}

@Injectable({
  providedIn: 'root',
})
export class SystemConfigApiService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/ptsrisk/SystemConfig/api/SystemConfig`;
  }

  getSystemConfigs(): Observable<SystemConfig[]> {
    console.log('Fetching system configurations from:', this.apiUrl);
    return this.http.get<SystemConfigApiResponse>(this.apiUrl).pipe(
      tap((response) => {
        console.log('System configurations fetched successfully:', response.data);
        if (!response.data) {
          console.error('No data property in response:', response);
        }
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching system configurations:', error);
        throw error;
      })
    );
  }

  getSystemConfigById(id: number): Observable<SystemConfig> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<{ data: SystemConfig }>(url).pipe(
      tap((response) => {
        console.log('System configuration fetched successfully:', response.data);
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching system configuration:', error);
        throw error;
      })
    );
  }

  createSystemConfig(config: Partial<SystemConfig>): Observable<SystemConfig> {
    const requestBody = {
      key: config.key,
      description: config.description,
      value: config.value,
      status: config.status,
    };
    return this.http.post<{ data: SystemConfig }>(this.apiUrl, requestBody).pipe(
      tap((response) => {
        console.log('System configuration created successfully:', response.data);
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error creating system configuration:', error);
        throw error;
      })
    );
  }

  updateSystemConfig(config: Partial<SystemConfig>): Observable<SystemConfig> {
    const requestBody = {
      id: config.id,
      key: config.key,
      description: config.description,
      value: config.value,
      status: config.status,
    };
    return this.http.put<{ data: SystemConfig }>(this.apiUrl, requestBody).pipe(
      tap((response) => {
        console.log('System configuration updated successfully:', response.data);
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error updating system configuration:', error);
        throw error;
      })
    );
  }
}
