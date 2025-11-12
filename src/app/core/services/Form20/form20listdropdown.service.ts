import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

export interface ObtainRegion {
  [key: string]: string[];
}

export interface BusinessUnitDisplay {
  [key: string]: string;
}

export interface ApprovalUser {
  fullName: string;
  employeeNo: string;
  title: string;
  ad: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class Form20ListDropdownService {
  private baseUrl: string;
  private buildingunit: string;
  private baseUrl2: string;

  constructor(private http: HttpClient) {
    this.baseUrl = '/api/pts20/Form20';
    this.buildingunit = '/api/pts20/Authorize';
    this.baseUrl2 = '/api/Form20';
  }

  obtainBuildingUnit(): Observable<ObtainRegion> {
    return this.http.post<ObtainRegion>(`${this.buildingunit}//functions`, {}).pipe(
      catchError((error) => {
        console.error('Error fetching building units:', error);
        throw error;
      })
    );
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

  obtainJVAgreement(): Observable<ObtainRegion> {
    return this.http.post<ObtainRegion>(`${this.baseUrl}/obtainJVAgreement`, {}).pipe(
      catchError((error) => {
        console.error('Error fetching JV Agreement options:', error);
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

  FORM20_CE(): Observable<ApprovalUser[]> {
    return this.http.post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_CE`, {}).pipe(
      catchError((error) => {
        console.error('Error fetching approval users:', error);
        throw error;
      })
    );
  }

  FORM20_ALL_DCM(): Observable<ApprovalUser[]> {
    return this.http
      .post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_ALL_DCM`, {})
      .pipe(
        catchError((error) => {
          console.error('Error fetching approval users:', error);
          throw error;
        })
      );
  }

  FORM20_ALL_ED(): Observable<ApprovalUser[]> {
    return this.http
      .post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_ALL_ED`, {})
      .pipe(
        catchError((error) => {
          console.error('Error fetching approval users:', error);
          throw error;
        })
      );
  }

  FORM20_INS_MGR(): Observable<ApprovalUser[]> {
    return this.http
      .post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_INS_MGR`, {})
      .pipe(
        catchError((error) => {
          console.error('Error fetching approval users:', error);
          throw error;
        })
      );
  }

  FORM20_ALL_DIR(): Observable<ApprovalUser[]> {
    return this.http
      .post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_ALL_DIR`, {})
      .pipe(
        catchError((error) => {
          console.error('Error fetching approval users:', error);
          throw error;
        })
      );
  }

  FORM20_LAM(): Observable<ApprovalUser[]> {
    return this.http.post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_LAM`, {}).pipe(
      catchError((error) => {
        console.error('Error fetching approval users:', error);
        throw error;
      })
    );
  }

  FORM20_PRO(): Observable<ApprovalUser[]> {
    return this.http.post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_PRO`, {}).pipe(
      catchError((error) => {
        console.error('Error fetching approval users:', error);
        throw error;
      })
    );
  }

  FORM20_FIN_DIR(): Observable<ApprovalUser[]> {
    return this.http
      .post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_FIN_DIR`, {})
      .pipe(
        catchError((error) => {
          console.error('Error fetching approval users:', error);
          throw error;
        })
      );
  }

  FORM20_RISK_OPP(): Observable<ApprovalUser[]> {
    return this.http
      .post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_RISK_OPP`, {})
      .pipe(
        catchError((error) => {
          console.error('Error fetching approval users:', error);
          throw error;
        })
      );
  }

  FORM20_COM_DIR(): Observable<ApprovalUser[]> {
    return this.http
      .post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_COM_DIR`, {})
      .pipe(
        catchError((error) => {
          console.error('Error fetching approval users:', error);
          throw error;
        })
      );
  }

  FORM20_HSEQ(): Observable<ApprovalUser[]> {
    return this.http.post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_HSEQ`, {}).pipe(
      catchError((error) => {
        console.error('Error fetching approval users:', error);
        throw error;
      })
    );
  }

  FORM20_GEN_COUN(): Observable<ApprovalUser[]> {
    return this.http
      .post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_GEN_COUN`, {})
      .pipe(
        catchError((error) => {
          console.error('Error fetching approval users:', error);
          throw error;
        })
      );
  }

  FORM20_BDG_DCM(): Observable<ApprovalUser[]> {
    return this.http
      .post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_BDG_DCM`, {})
      .pipe(
        catchError((error) => {
          console.error('Error fetching approval users:', error);
          throw error;
        })
      );
  }

  FORM20_BDG_DIR(): Observable<ApprovalUser[]> {
    return this.http
      .post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_BDG_DIR`, {})
      .pipe(
        catchError((error) => {
          console.error('Error fetching approval users:', error);
          throw error;
        })
      );
  }

  FORM20_ALL_HOE(): Observable<ApprovalUser[]> {
    return this.http
      .post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_ALL_HOE`, {})
      .pipe(
        catchError((error) => {
          console.error('Error fetching approval users:', error);
          throw error;
        })
      );
  }

  FORM20_CSD_HOE(): Observable<ApprovalUser[]> {
    return this.http
      .post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_CSD_HOE`, {})
      .pipe(
        catchError((error) => {
          console.error('Error fetching approval users:', error);
          throw error;
        })
      );
  }

  FORM20_CSD_CM(): Observable<ApprovalUser[]> {
    return this.http
      .post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_CSD_CM`, {})
      .pipe(
        catchError((error) => {
          console.error('Error fetching approval users:', error);
          throw error;
        })
      );
  }

  FORM20_CSD_DIR(): Observable<ApprovalUser[]> {
    return this.http
      .post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_CSD_DIR`, {})
      .pipe(
        catchError((error) => {
          console.error('Error fetching approval users:', error);
          throw error;
        })
      );
  }

  FORM20_CSD_ED(): Observable<ApprovalUser[]> {
    return this.http
      .post<ApprovalUser[]>(`${this.baseUrl}/obtainStaffByRole/FORM20_CSD_ED`, {})
      .pipe(
        catchError((error) => {
          console.error('Error fetching approval users:', error);
          throw error;
        })
      );
  }

  searchPeople(text: string): Observable<any[]> {
      const searchValue = text && text.trim() ? text.trim() : '';
      return this.http.post<any[]>(
        `${this.baseUrl2}/searchPeople`,
        searchValue,
        { headers: { 'Content-Type': 'application/json' } }
      );
  }

  
}
