import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { TenderItem } from '../../model/entity/pts-risk/TenderItem';
import { UpdateTenderMarketIntelligenceRequest } from '../../model/entity/pts-risk/UpdateTenderMarketIntelligenceRequest';
import { TenderSorted } from '../../model/entity/pts-risk/TenderSorted';
import { UpdateTenderStatusRequest } from '../../model/entity/pts-risk/UpdateTenderStatusRequest';


@Injectable({
  providedIn: 'root',
})
export class TenderListApiService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = '/api/ptsrisk/Tender/api';
  }

  getTenderPageSorted(request: TenderSorted): Observable<any> {
    // Remove pagination parameters - handle pagination on frontend only
    const apiRequest = {
      column: request.column,
      order: request.order,
    };
    return this.http.post<any>(`${this.baseUrl}/tenders`, apiRequest);
  }

  getTenderById(
    id: number
  ): Observable<{ data: TenderItem; code: number; message: string | null }> {
    const url = `${this.baseUrl}/tender/${id}`;
    console.log('Fetching tenders from:', url);

    return this.http.get<{ data: TenderItem; code: number; message: string | null }>(url).pipe(
      tap((response) => {
        console.log('Tender details fetched successfully:', response.data);
        if (!response.data) {
          console.error('No data property in response:', response);
        }
      }),
      catchError((error) => {
        console.error('Error fetching tender details:', error);
        throw error;
      })
    );
  }

  exportTenderExcel(): Observable<Blob> {
    const url = `${this.baseUrl}/exportTenderExcel`;
    return this.http.get(url, { responseType: 'blob' });
  }

  putTenderExcomDecision(
    tenderId: number,
    excomDecisionPriorityLevelId: number,
    excomDecisionNotes: string
  ): Observable<any> {
    const url = `${this.baseUrl}/tenderExcomDecision`;
    const body = {
      tenderId: tenderId,
      excomDecisionPriorityLevelId: excomDecisionPriorityLevelId,
      excomDecisionNotes: excomDecisionNotes,
    };
    return this.http.put(url, body).pipe(
      tap((response) => console.log('Response:', response)),
      catchError((error) => {
        console.error('Request failed:', error);
        console.error('Full URL:', url);
        console.error('Request body:', body);
        throw error;
      })
    );
  }

  putTenderMarketIntelligence(
    request: UpdateTenderMarketIntelligenceRequest
  ): Observable<any> {
    const url = `${this.baseUrl}/tenderMarketIntelligence`;
    console.log('Request body:', request); // Debug log
    console.log('Full URL:', url); // Debug log
    return this.http.put(url, request).pipe(
      tap((response) => console.log('Response:', response)),
      catchError((error) => {
        console.error('Request failed:', error);
        console.error('Full URL:', url);
        console.error('Request body:', request);
        throw error;
      })
    );
  }

  putandaddTender(data: { tender: any }): Observable<any> {
    const url = `${this.baseUrl}/tender`;
    console.log('Sending tender data:', data);

    return this.http.put(url, data).pipe(
      tap((response) => {
        console.log('Tender saved successfully:', response);
      }),
      catchError((error) => {
        console.error('Error saving tender:', error);
        console.error('Request URL:', url);
        console.error('Request body:', data);
        throw error;
      })
    );
  }

  deleteTender(id: number): Observable<any> {
    const url = `${this.baseUrl}/tender/${id}`;

    return this.http.delete(url).pipe(
      tap((response) => 
        console.log('Tender deleted successfully:', response
        )),
      catchError((error) => {
        console.error('Error deleting tender:', error);
        throw error;
      })
    );
  }

  updateStatus(
    tenderId: number,
    tenderStatus: string,
    reportDate?: any
  ): Observable<any> {
    const request: UpdateTenderStatusRequest = {
      tenderStatus,
    };

    const url = `${this.baseUrl}/tender/${tenderId}/status`;

    if (reportDate) {
      request.reportDate = reportDate.utc ? reportDate.utc(true) : reportDate;
    }

    return this.http.put(
      url,
      request
    );
  }
}
