import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface PriorityLevel {
  id: number;
  title: string;
  ranking: number;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
  status: string;
}

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
}