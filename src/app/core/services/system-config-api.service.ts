import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface SystemConfig {
    id: number;
    key: string;
    description: string;
    value: string;
    createdBy: string;
    createdOn: string;
    lastModifiedBy: string;
    lastModifiedOn: string;
    status: string;
}

interface SystemConfigApiResponse {
    data: SystemConfig[];
}

@Injectable({
    providedIn: 'root'
})

export class SystemConfigApiService {
    private apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = `${environment.apiUrl}/ptsrisk/SystemConfig/api/SystemConfig`;
    }

    getSystemConfigs(): Observable<SystemConfig[]> {
        console.log('Fetching system configurations from:', this.apiUrl);
        return this.http.get<SystemConfigApiResponse>(this.apiUrl).pipe(
            tap((response) => {
                console.log('System configurations fetched successfully:', response.data);
                if (!response.data) {
                    console.error('No data property in response:', response);
                }
            }),
            map((response) => response.data),
            catchError((error) => {
                console.error('Error fetching system configurations:', error);
                throw error;
            })
        );
    }

}