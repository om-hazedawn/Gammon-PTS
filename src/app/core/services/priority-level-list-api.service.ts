import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PriorityLevel } from '../../model/entity/pts-risk/priority-level-list';
interface PriorityLevelApiResponse {
  data: PriorityLevel[];
}

@Injectable({
  providedIn: 'root',
})
export class PriorityLevelListApiService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/ptsrisk/PriorityLevel/api/PriorityLevel`;
  }

  getPriorityLevels(): Observable<PriorityLevel[]> {
    console.log('Fetching priority levels from:', this.apiUrl);
    return this.http.get<PriorityLevelApiResponse>(this.apiUrl).pipe(
      tap((response) => {
        console.log('Received priority levels:', response.data);
        if (!response.data) {
          console.error('No data property in response:', response);
        }
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching priority levels:', error);
        throw error;
      })
    );
  }

  getPriorityLevelsForDropdown(): Observable<PriorityLevel[]> {
    const url = `${environment.apiUrl}/ptsrisk/PriorityLevel/api/PriorityLevelDropdown`;
    console.log('Fetching priority levels for dropdown from:', url);
    return this.http.get<PriorityLevelApiResponse>(url).pipe(
      tap((response) => {
        console.log('Priority levels for dropdown fetched successfully:', response.data);
        if (!response.data) {
          console.error('No data property in response:', response);
        }
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching priority levels for dropdown:', error);
        throw error;
      })
    );
  }

  getPriorityLevelById(id: number): Observable<PriorityLevel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<{ data: PriorityLevel }>(url).pipe(
      tap((response) => {
        console.log('Priority level fetched successfully:', response.data);
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching priority level by ID:', error);
        throw error;
      })
    );
  }

  createPriorityLevel(priorityLevel: PriorityLevel): Observable<PriorityLevel> {
    const requestBody = {
      title: priorityLevel.title,
      ranking: priorityLevel.ranking,
      status: priorityLevel.status,
    };
    return this.http.post<{ data: PriorityLevel }>(this.apiUrl, requestBody)
    .pipe(
      tap((response) => {
        console.log('Priority level created successfully:', response.data);
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error creating priority level:', error);
        throw error;
      })
    );
  }

  updatePriorityLevel(priorityLevel: PriorityLevel): Observable<PriorityLevel> {
    const requestBody = {
      id: priorityLevel.id,
      title: priorityLevel.title,
      ranking: priorityLevel.ranking,
      status: priorityLevel.status,
    };

    return this.http
      .put<{ data: PriorityLevel }>(this.apiUrl, requestBody)
      .pipe(
        tap((response) => {
          console.log('Priority level updated successfully:', response.data);
        }),
        map((response) => response.data),
        catchError((error) => {
          console.error('Error updating priority level:', error);
          throw error;
        })
      );
  }
}
