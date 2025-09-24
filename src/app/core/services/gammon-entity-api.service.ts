import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface GammonEntity {
  id: number;
  name: string;
  shortName: string;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
  status: string;
}

interface ApiResponse {
  data: GammonEntity[];
}

@Injectable({
  providedIn: 'root'
})
export class GammonEntityApiService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/ptsrisk/GammonEntity/api/GammonEntity`;
  }

  getGammonEntities(): Observable<GammonEntity[]> {
    console.log('Fetching entities from:', this.apiUrl);
    return this.http.get<ApiResponse>(this.apiUrl)
      .pipe(
        tap(response => {
          console.log('Raw API Response:', response);
          if (!response.data) {
            console.error('No data property in response:', response);
          }
        }),
        map(response => {
          console.log('Mapped entities:', response.data);
          return response.data;
        }),
        catchError(error => {
          console.error('Error fetching entities:', error);
          console.log('Error response body:', error.error);
          throw error;
        })
      );
  }
}