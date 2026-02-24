import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, shareReplay } from 'rxjs';
import { Form20StatusCounts } from '../../../model/entity/dashboard-count';
export interface Form20List {
  id: number;
  status: string;
  tenderNo: string;
  businessUnitCode: string;
  title: string;
  country: string;
  location: string;
  client: string;
  approximateValue: number;
  currency: string;
  period: number;
  periodUnit: string;
  bidTypeId: number;
  dueDate: string;
  keyDate: string;
  approximateValueRemark: string;
}
export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  totalPage: number;
}

export interface Form20ListPagedResult extends PagedResult<Form20List>{}


export interface Form20ListRequest {
  filteringItem: Record<string, string>;
  sortColumn: string;
  sortOrder: string;
  pageSize: number;
  page: number;
}

export interface Form20ListQuery {
  filteringItem: {};
  pageSize: number;
  page: number;
}

@Injectable({
  providedIn: 'root'
})
export class Form20ListService {
  private baseUrl: string;
  private form20ListCache$: Observable<Form20ListPagedResult> | null = null;

  constructor(private http: HttpClient) {
    this.baseUrl = '/api/pts20/Form20';
  }

  

  getForm20List(pageSize: number = -1, page: number = 0): Observable<Form20List[]> {
    const url = `${this.baseUrl}/obtainFormList`;
    const params: Form20ListRequest = {
      filteringItem: {},
      sortColumn: 'id',
      sortOrder: 'asc',
      pageSize,
      page
    };
    
    return this.http.post<Form20List[]>(url, params).pipe(
      catchError(error => {
        console.error('Error fetching Form20 List:', error);
        throw error;
      })
    );
  }

  getPagedForm20List(params: Form20ListQuery = { filteringItem: {}, pageSize: 10, page: 1 }): Observable<Form20ListPagedResult> {
    const url = `${this.baseUrl}/obtainFormList`;
    
    // Cache the request with shareReplay to avoid multiple identical requests
    if (!this.form20ListCache$) {
      this.form20ListCache$ = this.http.post<Form20ListPagedResult>(url, params).pipe(
        shareReplay(1),
        catchError(error => {
          console.error('Error fetching Form20 List:', error);
          // Clear cache on error so next request will retry
          this.form20ListCache$ = null;
          throw error;
        })
      );
    }
    
    return this.form20ListCache$;
  }

  // Method to clear cache when needed (e.g., after form20 is modified)
  clearForm20ListCache(): void {
    this.form20ListCache$ = null;
  }

  getForm20StatusCounts(): Observable<Form20StatusCounts> {
    const url = `${this.baseUrl}/obtainFormListCount`;
    return this.http.post<Form20StatusCounts>(url, {}).pipe(
      catchError(error => {
        console.error('Error fetching Form20 Status Counts:', error);
        throw error;
      })
    );
  }
  
}