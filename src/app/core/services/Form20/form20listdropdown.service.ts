import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

export interface ObtainRegion {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class Form20ListDropdownService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = '/api/pts20/Form20';
  }

  obtainRegion(): Observable<ObtainRegion> {
    return this.http.post<ObtainRegion>(`${this.baseUrl}/obtainRegion`, {}).pipe(
      catchError((error) => {
        console.error('Error fetching regions:', error);
        throw error;
      })
    );
  }

  obtainCurrency(): Observable<ObtainRegion> {
    return this.http.post<ObtainRegion>(`${this.baseUrl}/obtainCurrency`, {}).pipe(
      catchError((error) => {
        console.error('Error fetching currencies:', error);
        throw error;
      })
    );
  }

  obtainTenderType(): Observable<ObtainRegion> {
    return this.http.post<ObtainRegion>(`${this.baseUrl}/obtainTenderType`, {}).pipe(
      catchError((error) => {
        console.error('Error fetching tender types:', error);
        throw error;
      })
    );
  }

  obtainFinanceStanding(): Observable<ObtainRegion> {
    return this.http.post<ObtainRegion>(`${this.baseUrl}/obtainFinanceStanding`, {}).pipe(
      catchError((error) => {
        console.error('Error fetching finance standings:', error);
        throw error;
      })
    );
  }

  obtainFinanceTechnicalSplit(): Observable<ObtainRegion> {
    return this.http.post<ObtainRegion>(`${this.baseUrl}/obtainFinanceTechnicalSplit`, {}).pipe(
      catchError((error) => {
        console.error('Error fetching finance/technical split options:', error);
        throw error;
      })
    );
  }

  obtainBidType(): Observable<ObtainRegion> {
    return this.http.post<ObtainRegion>(`${this.baseUrl}/obtainBidType`, {}).pipe(
      catchError((error) => {
        console.error('Error fetching bid types:', error);
        throw error;
      })
    );
  }

  obtainYesNoNA(): Observable<ObtainRegion> {
    return this.http.post<ObtainRegion>(`${this.baseUrl}/obtainYesNoNA`, {}).pipe(
      catchError((error) => {
        console.error('Error fetching Yes/No/NA options:', error);
        throw error;
      })
    );
  }

  obtainContractType(): Observable<ObtainRegion> {
    return this.http.post<ObtainRegion>(`${this.baseUrl}/obtainContractType`, {}).pipe(
      catchError((error) => {
        console.error('Error fetching contract types:', error);
        throw error;
      })
    );
  }
  
  obtainMeasurementDetails(): Observable<ObtainRegion> {
    return this.http.post<ObtainRegion>(`${this.baseUrl}/obtainMeasurement`, {}).pipe(
      catchError((error) => {
        console.error('Error fetching measurement details:', error);
        throw error;
      })
    );
  }

  obtainFluctuation(): Observable<ObtainRegion> {
    return this.http.post<ObtainRegion>(`${this.baseUrl}/obtainFluctuation`, {}).pipe(
      catchError((error) => {
        console.error('Error fetching fluctuation details:', error);
        throw error;
      })
    );
  }

  obtainMaintenanceDefect(): Observable<ObtainRegion> {
    return this.http.post<ObtainRegion>(`${this.baseUrl}/obtainMaintenanceDefect`, {}).pipe(
      catchError((error) => {
        console.error('Error fetching maintenance defects:', error);
        throw error;
      })
    );
  }


  obtainJVAgreement(): Observable<ObtainRegion> {
    return this.http.post<ObtainRegion>(`${this.baseUrl}/obtainJVAgreement`, {}).pipe(
      catchError((error) => {
        console.error('Error fetching JV agreements:', error);
        throw error;
      })
    );
  }
  
}
