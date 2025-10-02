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

    getTenders(pageSize: number = 10, page: number = 1): Observable<{ data: TenderItem[], totalCount: number }> {
        const url = `${this.baseUrl}/tenders/?pageSize=${pageSize}&page=${page}`;
        console.log('Fetching tenders from:', url);
        
        return this.http.get(url).pipe(
            tap((response: any) => {
                console.log('Raw response:', response);
                if (!response) {
                    throw new Error('Empty response received');
                }
            }),
            map((response: any) => {
                // Handle different response formats
                const data = Array.isArray(response) ? response :
                           response.data ? response.data :
                           response.items ? response.items : [];
                           
                const totalCount = typeof response.totalCount === 'number' ? response.totalCount :
                                 Array.isArray(response) ? response.length : 0;

                return {
                    data: data as TenderItem[],
                    totalCount: totalCount
                };
            }),
            catchError((error) => {
                console.error('Error fetching tenders:', error);
                if (error.status === 200 && error.ok === false) {
                    console.error('Response format mismatch:', error);
                }
                throw error;
            })
        );
    }

    getTenderById(id: number): Observable<{ data: TenderItem, code: number, message: string | null }> {
        const url = `${this.baseUrl}/tender//${id}`;
        console.log('Fetching tenders from:', url);
        
        return this.http.get<{ data: TenderItem, code: number, message: string | null }>(url).pipe(
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
}