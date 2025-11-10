import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateKeyDateRequest } from '../../model/entity/pts-risk/CreateKeyDateRequest';
import { TenderKeyDate } from '../../model/entity/pts-risk/tenderkeydate';

interface ApiResponse<T> {
  data: T;
  code: number;
  message: string | null;
}


@Injectable({
  providedIn: 'root'
})
export class TenderKeyDateApiService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = '/api/ptsrisk/Tender/api/tender';
  }

  getKeyDates(tenderId: number): Observable<TenderKeyDate[]> {
    const url = `${this.baseUrl}/${tenderId}/obtainKeyDate`;
    
    console.log('Fetching key dates:', {
      url,
      tenderId
    });

    return this.http.post<ApiResponse<TenderKeyDate[]>>(url, {}).pipe(
      map(response => {
        if (response.code === 200) {
          return response.data;
        }
        throw new Error(response.message || 'Failed to fetch key dates');
      }),
      catchError(this.handleError)
    );
  }

  createKeyDate(tenderId: number, request: CreateKeyDateRequest): Observable<TenderKeyDate> {
    const url = `${this.baseUrl}/${tenderId}/updateKeyDate`;
    const payload = [request];
    
    console.log('Creating key date:', {
      url,
      tenderId,
      payload
    });

    return this.http.post<ApiResponse<TenderKeyDate>>(url, payload).pipe(
      map(response => {
        console.log('Create key date response:', response);
        if (response.code === 200) {
          return response.data;
        }
        throw new Error(response.message || 'Failed to create key date');
      }),
      catchError(this.handleError)
    );
  }
  
  updateKeyDate(tenderId: number, keyDateId: number, keyDate: Partial<TenderKeyDate>): Observable<TenderKeyDate> {
    const url = `${this.baseUrl}/${tenderId}/updateKeyDate`;
    const payload = {
      ...keyDate,
      id: keyDateId,
      tenderId
    };

    console.log('Updating key date:', {
      url,
      tenderId,
      keyDateId,
      payload
    });

    return this.http.put<ApiResponse<TenderKeyDate>>(url, payload).pipe(
      map(response => {
        console.log('Update key date response:', response);
        if (response.code === 200) {
          return response.data;
        }
        throw new Error(response.message || 'Failed to update key date');
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API error:', {
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      error: error.error,
      message: error.message
    });
    
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 400) {
      // Bad request - likely validation error
      errorMessage = error.error?.message || 'Invalid request data';
    } else if (error.status === 404) {
      // Not found
      errorMessage = 'Resource not found';
    } else if (error.status === 401 || error.status === 403) {
      // Auth errors
      errorMessage = 'Authorization error';
    } else {
      // Other server errors
      errorMessage = error.error?.message || error.message || 'Server error occurred';
    }
    
    return throwError(() => new Error(errorMessage));
  }
}