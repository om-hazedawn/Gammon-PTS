import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Form20MaintenanceService {
  private baseUrl = '/api/pts20/Maintenance';

  constructor(private http: HttpClient) {}

  /**
   * Fetch lookup table data for a specific table
   * @param tableKey - The lookup table key (e.g., 'bidType', 'currency', etc.)
   * @returns Observable of table data
   */
  getLookupTableData(tableKey: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/obtainList`, `"${tableKey}"`, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  /**
   * Save lookup table data
   * @param tableKey - The lookup table key
   * @param data - Array of values to save
   * @returns Observable of save response
   */
  saveLookupTableData(tableKey: string, data: string[]): Observable<any> {
    const payload = {
      key: tableKey,
      values: data,
    };
    return this.http.post<any>(`${this.baseUrl}/update/${tableKey}`, payload);
  }

  /**
   * Set Tender No
   * @param tenderNo - Tender number to set
   * @returns Observable of response
   */
  setTenderNo(tenderNo: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/setTenderNo`, { tenderNo });
  }

  /**
   * Migrate from old PTS
   * @returns Observable of migration response
   */
  migrateFromOldPTS(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/migrate`, {});
  }

  /**
   * Update tender no running no
   * @returns Observable of update response
   */
  updateTenderNoRunningNo(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/updateTenderNo`, {});
  }

  /**
   * Tender value remark
   * @returns Observable of response
   */
  tenderValueRemark(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tenderValueRemark`, {});
  }

  /**
   * Others maintenance tasks
   * @returns Observable of response
   */
  others(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/others`, {});
  }
}
