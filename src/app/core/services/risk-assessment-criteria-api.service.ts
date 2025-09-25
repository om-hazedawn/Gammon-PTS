import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface RiskAssessmentCriteria {
  id: number;
  code: string;
  title: string;
  seqNo: number;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
  status: string;
}

interface RiskAssessmentCriteriaApiResponse {
  data: RiskAssessmentCriteria[];
}

@Injectable({
  providedIn: 'root',
})
export class RiskAssessmentCriteriaApiService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/ptsrisk/RiskAssessmentCriteria/api/RiskAssessmentCriteria`;
  }

  getRiskAssessmentCriteria(): Observable<RiskAssessmentCriteria[]> {
    console.log('Fetching risk assessment criteria from:', this.apiUrl);
    return this.http.get<RiskAssessmentCriteriaApiResponse>(this.apiUrl).pipe(
      tap((response) => {
        console.log('Risk assessment criteria fetched successfully:', response.data);
        if (!response.data) {
          console.error('No data property in response:', response);
        }
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching risk assessment criteria:', error);
        throw error;
      })
    );
  }
}
