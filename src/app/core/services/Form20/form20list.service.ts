import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

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
  approximateValueRemark: string;
}


export interface Form20ListRequest {
  filteringItem: Record<string, string>;
  sortColumn: string;
  sortOrder: string;
  pageSize: number;
  page: number;
}

@Injectable({
  providedIn: 'root'
})
export class Form20ListService {
  private baseUrl: string;

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
  
  
}