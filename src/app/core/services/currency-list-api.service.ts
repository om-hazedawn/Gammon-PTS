import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Currency } from '../../model/entity/pts-risk/currency-list';


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

  getCurrencyDropdown(): Observable<Currency[]> {
    const url = `${environment.apiUrl}/ptsrisk/Currency/api/CurrencyDropdown`;
    console.log('Fetching currencies for dropdown from:', url);
    return this.http.get<CurrencyApiResponse>(url).pipe(
      tap((response) => {
        console.log('Currencies for dropdown fetched successfully:', response.data);
        if (!response.data) {
          console.error('No data property in response:', response);
        }
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching currencies for dropdown:', error);
        throw error;
      })
    );
  }

  getCurrencyById(id: number): Observable<Currency> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<{ data: Currency }>(url)
    .pipe(
      tap((response) => {
        console.log('Currency fetched successfully:', response.data);
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error(`Error fetching currency with ID ${id}:`, error);
        throw error;
      })
    );
  }

  createCurrency(currency: Partial<Currency>): Observable<Currency> {
    const requestBody = {
      code: currency.code,
      exchangeRateToHKD: currency.exchangeRateToHKD,
      status: currency.status
    };

    return this.http.post<{ data: Currency }>(this.apiUrl, requestBody)
    .pipe(
      tap((response) => {
        console.log('Currency created successfully:', response.data);
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error creating currency:', error);
        throw error;
      })
    );
  }

  updateCurrency(currency: Currency): Observable<Currency> {
    const requestBody = {
      id: currency.id,
      code: currency.code,
      exchangeRateToHKD: currency.exchangeRateToHKD,
      status: currency.status
    };

    return this.http.put<{ data: Currency }>(this.apiUrl, requestBody)
    .pipe(
      tap((response) => {
        console.log('Currency updated successfully:', response.data);
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error updating currency:', error);
        throw error;
      })
    );
  }

}
