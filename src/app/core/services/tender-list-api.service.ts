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
  private baseUrl2: string;
  private baseUrl3: string;

  constructor(private http: HttpClient) {
    this.baseUrl = '/api/ptsrisk/Tender/api';
    this.baseUrl2 = '/api/ptsrisk/Authorize';
    this.baseUrl3 = '/api/ptsrisk/Snapshot';
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

    return this.http.get<{ data: TenderItem; code: number; message: string | null }>(url).pipe(
      tap((response) => {
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
    return this.http.put(url, request).pipe(
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

    return this.http.put(url, data).pipe(
      tap((response) => {
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

  generateSnapshotDivisionList(): Observable<any> {
    const url = `${this.baseUrl2}/generateSnapshotDivisionList`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error fetching division list:', error);
        throw error;
      })
    );
  }
  periodDropdown() : Observable<any> {
    const url = `${this.baseUrl3}/periodDropdown`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error fetching period dropdown:', error);
        throw error;
      })
    );
  }

  generateSnapshot(period: any, division: string): Observable<any> {
    const url = `${this.baseUrl3}/generateSnapshot`;
    const body = {
      period: period,
      division: division,
    };
    return this.http.post(url, body).pipe(
      catchError((error) => {
        console.error('Error generating snapshot:', error);
        throw error;
      })
    );
  }

  periodDropdownMonthly(): Observable<any> {
    const url = `${this.baseUrl3}/periodDropdownMonthly`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error fetching period dropdown monthly:', error);
        throw error;
      })
    );
  }

  generateMonthlySnapshot(period: any, division: string): Observable<any> {
    const url = `${this.baseUrl3}/generateMonthlySnapshot`;
    const body = {
      period: period,
      division: division,
    };
    return this.http.post(url, body).pipe(
      catchError((error) => {
        console.error('Error generating snapshot:', error);
        throw error;
      })
    );
  }
  generateWeeklySnapshotForTender(period: string, tenderId: number): Observable<any> {
    const url = `${this.baseUrl3}/generateSnapshot`;
    const body = {
      period: period,
      division: '',
      tenderId: tenderId,
    };
    return this.http.post(url, body).pipe(
      catchError((error) => {
        console.error('Error generating weekly snapshot for tender:', error);
        throw error;
      })
    );
  }

  generateMonthlySnapshotForTender(period: string, tenderId: number): Observable<any> {
    const url = `${this.baseUrl3}/generateMonthlySnapshot`;
    const body = {
      period: period,
      division: '',
      tenderId: tenderId,
    };
    return this.http.post(url, body).pipe(
      catchError((error) => {
        console.error('Error generating monthly snapshot for tender:', error);
        throw error;
      })
    );
  }}
