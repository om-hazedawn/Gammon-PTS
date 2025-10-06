import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface TenderResponse {
  data: TenderItem[];
  totalCount: number;
}

export interface TenderItem {
  id: number;
  division: string;
  tenderStatus: string;
  reportDate: string | null;
  businessUnitId: number;
  isExternal: string;
  region: string;
  projectName: string | null;
  expectedTenderIssueDate: string;
  expectedTenderSubmissionDate: string;
  projectDuration: number | null;
  biddingGammonEntityId: number | null;
  projectDescription: string | null;
  customerName: string | null;
  marketSectorId: number | null;
  marketSectorVal: string;
  currencyId: number | null;
  estimatedTenderValue: number;
  estimatedTenderValueInHKD: number | null;
  isExternalMainContractor: string | null;
  isKeyCustomer: string;
  isKeySector: string;
  isJointVenture: string;
  foreseenBUCapacity: string;
  standardResponsePriorityLevelId: number | null;
  standardResponseHint: string | null;
  upgradeDowngradePriorityLevelId: number | null;
  upgradeDowngradeRationale: string | null;
  riskAssessmentCriteriaId: number;
  riskAssessmentLevel: string | null;
  riskAssessmentRationale: string | null;
  excomDecisionItem: string | null;
  excomDecisionPriorityLevelId: number | null;
  excomDecisionDate: string | null;
  excomDecisionNotes: string | null;
  winningCompetitor: string | null;
  marginLostPercentage: number | null;
  otherReasonsForLoss: string | null;
  additionalNote: string | null;
  changeSinceLastDecisionMade: boolean;
  form20Id: number | null;
  businessUnit: BusinessUnit;
  biddingGammonEntity: BiddingGammonEntity | null;
  marketSector: MarketSector | null;
  currency: Currency | null;
  standardResponsePriorityLevel: PriorityLevel | null;
  upgradeDowngradePriorityLevel: PriorityLevel | null;
  riskAssessmentCriteria: RiskAssessmentCriteria;
  excomDecisionPriorityLevel: excomDecisionPriorityLevel | null;
  tenderAttachments: TenderAttachment | null;
  tenderKeyDates: any | null;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
  status: string;
}

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

export interface BiddingGammonEntity {
  id: number;
  name: string;
  shortName: string;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
  status: string;
}

export interface Currency {
  id: number;
  code: string;
  exchangeRateToHKD: number;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
  status: string;
}
export interface MarketSector {
  id: number;
  name: string;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
  status: string;
}

export interface excomDecisionPriorityLevel {
  id: number;
  title: string;
  ranking: number;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
  status: string;
}

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

export interface RiskAssessmentCriteria {
  id: number;
  code: string;
  title: string;
  seqNo: number;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
  status: string;
}

export interface TenderAttachment {
  id: number;
  tenderId: number;

  fileMimeType: string;

  originalFileName: string;
}

@Injectable({
  providedIn: 'root',
})
export class TenderListApiService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = '/api/ptsrisk/Tender/api';
  }

  getTenders(
    pageSize: number = 10,
    page: number = 1
  ): Observable<{ data: TenderItem[]; totalCount: number }> {
    // If pageSize is -1, set a large number to fetch all records
    const url = `${this.baseUrl}/tenders?pageSize=${
      pageSize === -1 ? 999999 : pageSize
    }&page=${page}`;
    console.log('Fetching tenders from:', url);

    return this.http.get<TenderResponse>(url).pipe(
      tap((response) => {
        console.log('Tenders fetched successfully:', response.data);
        if (!response.data) {
          console.error('No data property in response:', response);
        }
      }),
      map((response) => ({
        data: response.data,
        totalCount: response.totalCount,
      })),
      catchError((error) => {
        console.error('Error fetching tenders:', error);
        throw error;
      })
    );
  }

  getTenderById(
    id: number
  ): Observable<{ data: TenderItem; code: number; message: string | null }> {
    const url = `${this.baseUrl}/tender/${id}`;
    console.log('Fetching tenders from:', url);

    return this.http.get<{ data: TenderItem; code: number; message: string | null }>(url).pipe(
      tap((response) => {
        console.log('Tender details fetched successfully:', response.data);
        if (!response.data) {
          console.error('No data property in response:', response);
        }
      }),
      catchError((error) => {
        console.error('Error fetching tender details:', error);
        throw error;
      })
    );
  }

  exportTenderExcel(): Observable<Blob> {
    const url = `${this.baseUrl}/exportTenderExcel`;
    return this.http.get(url, { responseType: 'blob' });
  }

  putTenderExcomDecision(
    tenderId: number,
    excomDecisionPriorityLevelId: number,
    excomDecisionNotes: string
  ): Observable<any> {
    const url = `${this.baseUrl}/tenderExcomDecision`;
    const body = {
      tenderId: tenderId,
      excomDecisionPriorityLevelId: excomDecisionPriorityLevelId,
      excomDecisionNotes: excomDecisionNotes,
    };
    return this.http.put(url, body).pipe(
      tap((response) => console.log('Response:', response)),
      catchError((error) => {
        console.error('Request failed:', error);
        console.error('Full URL:', url);
        console.error('Request body:', body);
        throw error;
      })
    );
  }

  putTenderMarketIntelligence(
    tenderId: number,
    winningCompetitor: string,
    marginLostPercentage: number,
    otherReasonsForLoss: string,
    reportDate?: string
  ): Observable<any> {
    const url = `${this.baseUrl}/tenderMarketIntelligence`;
    const body = {
      tenderId: tenderId,
      winningCompetitor: winningCompetitor,
      marginLostPercentage: marginLostPercentage,
      otherReasonsForLoss: otherReasonsForLoss,
      reportDate: reportDate || new Date().toISOString(),
    };
    console.log('Request body:', body); // Debug log
    console.log('Full URL:', url); // Debug log
    return this.http.put(url, body).pipe(
      tap((response) => console.log('Response:', response)),
      catchError((error) => {
        console.error('Request failed:', error);
        console.error('Full URL:', url);
        console.error('Request body:', body);
        throw error;
      })
    );
  }

  putandaddTender(tender: TenderItem): Observable<any> {
    const url = `${this.baseUrl}/tender`;
    // If id is 0, it's a new tender (create), otherwise it's an update
    console.log(`${tender.id === 0 ? 'Creating' : 'Updating'} tender:`, tender);
    
    return this.http.put(url, { tender }).pipe(
      tap(response => {
        console.log('Tender saved successfully:', response);
      }),
      catchError(error => {
        console.error('Error saving tender:', error);
        console.error('Request URL:', url);
        console.error('Request body:', { tender });
        throw error;
      })
    );
  }
}
