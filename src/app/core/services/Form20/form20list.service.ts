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

  constructor(private http: HttpClient) {
    this.baseUrl = '/api/pts20/Form20';
  }

  getForm20List(params = {}): Observable<Form20List[]> {
     const url = `${this.baseUrl}/obtainFormList`;
    return this.http.post<Form20List[]>(url, params).pipe(
      catchError(error => {
        console.error('Error fetching Form20 List:', error);
        throw error;
      })
    );
  }

  getPagedForm20List(params: Form20ListQuery = { filteringItem: {}, pageSize: 10, page: 1 }): Observable<Form20List[]> {
     const url = `${this.baseUrl}/obtainFormList`;
    return this.http.post<Form20List[]>(url, params).pipe(
      catchError(error => {
        console.error('Error fetching Form20 List:', error);
        throw error;
      })
    );
  }
  
}