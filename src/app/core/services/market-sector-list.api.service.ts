import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface MarketSector {
  id: number;
  name: string;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
  status: string;
}

interface ApiResponse<T> {
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class MarketSectorListApiService {
  private apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/ptsrisk/MarketSector/api`;
  }

  getMarketSectors(): Observable<MarketSector[]> {
    const url = `${this.apiUrl}/MarketSector`;
    console.log('Fetching market sectors from:', url);
    return this.http.get<ApiResponse<MarketSector[]>>(url).pipe(
      tap((response) => {
        console.log('Market sectors fetched successfully:', response.data);
        if (!response.data) {
          console.error('No data property in response:', response);
        }
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching market sectors:', error);
        throw error;
      })
    );
  }

  getMarketSectorDropdown(): Observable<MarketSector[]> {
    const url = `${this.apiUrl}/MarketSectorDropdown`;
    console.log('Fetching market sector dropdown from:', url);

    return this.http.get<ApiResponse<MarketSector[]>>(url).pipe(
      tap((response) => {
        console.log('Market sector dropdown fetched successfully:', response.data);
        if (!response.data) {
          console.error('No data property in response:', response);
        }
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching market sector dropdown:', error);
        throw error;
      })
    );
  }

  getMarketSectorById(id: number): Observable<MarketSector> {
    const url = `${this.apiUrl}/MarketSector/${id}`;
    return this.http.get<{ data: MarketSector }>(url).pipe(
      tap((response) => {
        console.log('Market sector fetched successfully:', response.data);
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching market sector by ID:', error);
        throw error;
      })
    );
  }

  createMarketSector(marketSector: MarketSector): Observable<MarketSector> {
    const requestBody = {
      name: marketSector.name,
      status: marketSector.status,
    };

    return this.http.post<{ data: MarketSector }>(`${this.apiUrl}/MarketSector`, requestBody).pipe(
      tap((response) => {
        console.log('Market sector created successfully:', response.data);
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error creating market sector:', error);
        throw error;
      })
    );
  }

  updateMarketSector(marketSector: MarketSector): Observable<MarketSector> {
    const requestBody = {
      id: marketSector.id,
      name: marketSector.name,
      status: marketSector.status,
    };
    return this.http.put<{ data: MarketSector }>(`${this.apiUrl}/MarketSector`, requestBody).pipe(
      tap((response) => {
        console.log('Market sector updated successfully:', response.data);
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error updating market sector:', error);
        throw error;
      })
    );
  }

  
}
