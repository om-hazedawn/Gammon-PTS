import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface BusinessUnit {
  id: number;
  name: string;
  shortName: string;
  tailThreshold: number;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
  status: string;
}

interface BusinessApiResponse {
    data: BusinessUnit[];
}

@Injectable({
  providedIn: 'root'
})
export class BusinessUnitApiService {
    private apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = `${environment.apiUrl}/ptsrisk/BusinessUnit/api/BusinessUnit`;
    }

    getBusinessUnits(): Observable<BusinessUnit[]> {
        console.log('Fetching business units from:', this.apiUrl);
        return this.http.get<BusinessApiResponse>(this.apiUrl)
            .pipe(
                tap(response => {
                    console.log('Business units fetched successfully:', response.data);
                    if (!response.data) {
                        console.error('No data property in response:', response);
                    }
                }),
                map(response => response.data),
                catchError(error => {
                    console.error('Error fetching business units:', error);
                    throw error;
                })
            );
    }

}