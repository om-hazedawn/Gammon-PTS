import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BusinessUnit } from '../../model/entity/pts-risk/business-unit';


interface BusinessApiResponse {
  data: BusinessUnit[];
}

@Injectable({
  providedIn: 'root',
})
export class BusinessUnitApiService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/ptsrisk/BusinessUnit/api/BusinessUnit`;
  }

  getBusinessUnits(): Observable<BusinessUnit[]> {
    console.log('Fetching business units from:', this.apiUrl);
    return this.http.get<BusinessApiResponse>(this.apiUrl).pipe(
      tap((response) => {
        console.log('Business units fetched successfully:', response.data);
        if (!response.data) {
          console.error('No data property in response:', response);
        }
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching business units:', error);
        throw error;
      })
    );
  }

  getBussinessUnitDropdown(): Observable<BusinessUnit[]> {
    const url = `${environment.apiUrl}/ptsrisk/BusinessUnit/api/BusinessUnitDropdown`;
    console.log('Fetching business units for dropdown from:', url);
    return this.http.get<BusinessApiResponse>(url).pipe(
      tap((response) => {
        console.log('Business units for dropdown fetched successfully:', response.data);
        if (!response.data) {
          console.error('No data property in response:', response);
        }
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching business units for dropdown:', error);
        throw error;
      })
    );
  }

  getBusinessUnitById(id: number): Observable<BusinessUnit> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<{ data: BusinessUnit }>(url).pipe(
      tap((response) => {
        console.log('Business unit fetched successfully:', response.data);
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error(`Error fetching business unit with id ${id}:`, error);
        throw error;
      })
    );
  }

  createBusinessUnit(businessUnit: Partial<BusinessUnit>): Observable<BusinessUnit> {
    const requestBody = {
      name: businessUnit.name,
      shortName: businessUnit.shortName,
      tailThreshold: businessUnit.tailThreshold,
      status: businessUnit.status,
    };

    return this.http.post<{ data: BusinessUnit }>(this.apiUrl, requestBody).pipe(
      tap((response) => {
        console.log('Business unit created successfully:', response.data);
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error creating business unit:', error);
        throw error;
      })
    );
  }

  updateBusinessUnit(businessUnit: BusinessUnit): Observable<BusinessUnit> {
    const requestBody = {
      id: businessUnit.id,
      name: businessUnit.name,
      shortName: businessUnit.shortName,
      tailThreshold: businessUnit.tailThreshold,
      status: businessUnit.status,
    };

    return this.http.put<{ data: BusinessUnit }>(this.apiUrl, requestBody).pipe(
      tap((response) => {
        console.log('Business unit updated successfully:', response.data);
      }),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error updating business unit:', error);
        throw error;
      })
    );
  }
}
