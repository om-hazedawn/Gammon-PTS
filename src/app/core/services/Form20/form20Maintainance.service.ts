import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Form20MaintenanceService {
  private baseUrl = '/api/pts20/Maintenance';
  private form20BaseUrl = '/api/pts20/Form20';

  constructor(private http: HttpClient) {}

 
  getLookupTableData(tableKey: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/obtainList`, `"${tableKey}"`, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

 
  saveLookupTableData(tableKey: string, data: string[]): Observable<any> {
    const payload = {
      key: tableKey,
      values: data,
    };
    return this.http.post<any>(`${this.baseUrl}/update/${tableKey}`, payload);
  }


  setTenderNo(formId: number, tenderNo: string): Observable<any> {
    return this.http.post<any>(
      `${this.form20BaseUrl}/setTenderNo/${formId}`, 
      JSON.stringify(tenderNo),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  migrateFromOldPTS(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/migrate`, {});
  }


  updateTenderNoRunningNo(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/updateTenderNo`, {});
  }


  getTenderNoRunningNo(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/obtainTenderNoRunningNo`, {});
  }

 
  updateTenderNoRunningNoByYear(tenderYear: number, lastNo: number): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/updateTenderNoRunningNo/${tenderYear}`,
      JSON.stringify(lastNo),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }


  tenderValueRemark(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tenderValueRemark`, {});
  }

  cancelApproval(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/cancelApproval/${id}`, {});
  }

}
