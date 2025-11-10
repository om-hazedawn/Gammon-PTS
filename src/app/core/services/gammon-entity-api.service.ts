import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { GammonEntity } from '../../model/entity/pts-risk/gammon-entity';
interface ApiResponse<T> {
  data: T;
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
    return this.http.get<ApiResponse<GammonEntity[]>>(this.apiUrl)
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

  getgammonEntityDropdown(): Observable<GammonEntity[]> {
    const url = `${environment.apiUrl}/ptsrisk/GammonEntity/api/GammonEntityDropdown`;
    console.log('Fetching entities for dropdown from:', url);
    return this.http.get<ApiResponse<GammonEntity[]>>(url).pipe(
      tap((response) => {
        console.log('Raw Dropdown Response:', response);
        if (!response.data) {
          console.error('No data property in response:', response);
        }
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching entities for dropdown:', error);
        throw error;
      })
    );
  }
          

 

  getGammonEntityById(id: number): Observable<GammonEntity> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ApiResponse<GammonEntity>>(url)
      .pipe(
        tap(response => {
          console.log('Raw Entity Response:', response);
        }),
        map(response => response.data),
        catchError(error => {
          console.error('Error fetching entity by id:', error);
          throw error;
        })
      );
  }

  createGammonEntity(entity: { name: string; shortName: string; status: string }): Observable<GammonEntity> {
    const requestBody = {
      name: entity.name,
      shortName: entity.shortName,
      status: entity.status
    };
    
    return this.http.post<ApiResponse<GammonEntity>>(this.apiUrl, requestBody)
      .pipe(
        tap(response => {
          console.log('Created entity:', response);
        }),
        map(response => response.data),
        catchError(error => {
          console.error('Error creating entity:', error);
          throw error;
        })
      );
  }

  updateGammonEntity(entity: GammonEntity): Observable<GammonEntity> {
    const requestBody = {
      id: entity.id,
      name: entity.name,
      shortName: entity.shortName,
      status: entity.status
    };
    
    return this.http.put<ApiResponse<GammonEntity>>(this.apiUrl, requestBody).pipe(
      tap(response => {
        console.log('Updated entity:', response);
      }),
      map(response => response.data),
      catchError(error => {
        console.error('Error updating entity:', error);
        throw error;
      })
    );
  }
}