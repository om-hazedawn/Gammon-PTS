import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Currency {
  id: number;
  code: string;
  exchangeRateToHKD: number;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
  status: string;
}

interface CurrencyApiResponse {
  data: Currency[];
}

@Injectable({
  providedIn: 'root',
})
export class CurrencyListApiService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/ptsrisk/Currency/api/Currency`;
  }

  getCurrencies(): Observable<Currency[]> {
    console.log('Fetching currencies from:', this.apiUrl);
    return this.http.get<CurrencyApiResponse>(this.apiUrl).pipe(
      tap((response) => {
        console.log('Currencies fetched successfully:', response.data);
        if (!response.data) {
          console.error('No data property in response:', response);
        }
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching currencies:', error);
        throw error;
      })
    );
  }
}
