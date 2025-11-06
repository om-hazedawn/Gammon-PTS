import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TenderResponse {
  data: TenderItem[];
  totalCount: number;
}

export interface TenderItem {
  id: number;
  division: string;
  tenderStatus: string;
  reportDate?: string | null;
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

export interface TenderSorted {
  column?: string;
  order?: string;
  pageSize?: number;
  page?: number;
}

export interface TenderAttachment {
  id: number;
  tenderId: number;

  fileMimeType: string;

  fileFullPath: string;
  originalFileName: string;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
  status: string;
}

export interface UpdateTenderStatusRequest {
  tenderStatus: string;
  reportDate?: string;
}

export interface UpdateTenderMarketIntelligenceRequest  {
  tenderId: number;
  winningCompetitor?: string;
  marginLostPercentage?: number;
  otherReasonsForLoss?: string;
  reportDate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TenderListApiService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = '/api/ptsrisk/Tender/api';
  }

  getTenderPageSorted(request: TenderSorted): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tenders`, request);
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
    request: UpdateTenderMarketIntelligenceRequest
  ): Observable<any> {
    const url = `${this.baseUrl}/tenderMarketIntelligence`;
    console.log('Request body:', request); // Debug log
    console.log('Full URL:', url); // Debug log
    return this.http.put(url, request).pipe(
      tap((response) => console.log('Response:', response)),
      catchError((error) => {
        console.error('Request failed:', error);
        console.error('Full URL:', url);
        console.error('Request body:', request);
        throw error;
      })
    );
  }

  putandaddTender(data: { tender: any }): Observable<any> {
    const url = `${this.baseUrl}/tender`;
    console.log('Sending tender data:', data);

    return this.http.put(url, data).pipe(
      tap((response) => {
        console.log('Tender saved successfully:', response);
      }),
      catchError((error) => {
        console.error('Error saving tender:', error);
        console.error('Request URL:', url);
        console.error('Request body:', data);
        throw error;
      })
    );
  }

  deleteTender(id: number): Observable<any> {
    const url = `${this.baseUrl}/tender/${id}`;

    return this.http.delete(url).pipe(
      tap((response) => 
        console.log('Tender deleted successfully:', response
        )),
      catchError((error) => {
        console.error('Error deleting tender:', error);
        throw error;
      })
    );
  }

  updateStatus(
    tenderId: number,
    tenderStatus: string,
    reportDate?: any
  ): Observable<any> {
    const request: UpdateTenderStatusRequest = {
      tenderStatus,
    };

    const url = `${this.baseUrl}/tender/${tenderId}/status`;

    if (reportDate) {
      request.reportDate = reportDate.utc ? reportDate.utc(true) : reportDate;
    }

    return this.http.put(
      url,
      request
    );
  }
}
