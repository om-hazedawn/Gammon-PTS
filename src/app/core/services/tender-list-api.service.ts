import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, of } from 'rxjs';
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
    // Check if we're running on Vercel
    const isVercel = window.location.hostname.includes('vercel.app');
    
    // Use the full URL for Vercel deployment, relative path for local development
    this.baseUrl = isVercel
      ? 'https://gammon-pts.vercel.app/api/ptsrisk/Tender/api'
      : '/api/ptsrisk/Tender/api';
      
    console.log('API Base URL:', this.baseUrl);
  }

    private isVercelEnvironment(): boolean {
        return window.location.hostname.includes('vercel.app');
    }

    private handleVercelResponse(response: any): any {
        if (this.isVercelEnvironment()) {
            // For Vercel, handle potential string responses
            if (typeof response === 'string') {
                try {
                    return JSON.parse(response);
                } catch (e) {
                    console.warn('Could not parse string response:', e);
                    return { data: [], totalCount: 0 };
                }
            }
            
            // Handle potential wrapped responses from Vercel proxy
            if (response && response.body) {
                try {
                    if (typeof response.body === 'string') {
                        return JSON.parse(response.body);
                    }
                    return response.body;
                } catch (e) {
                    console.warn('Could not parse response body:', e);
                }
            }
        }
        return response;
    }

    getTenders(pageSize: number = 10, page: number = 1): Observable<{ data: TenderItem[], totalCount: number }> {
        const url = `${this.baseUrl}/tenders/?pageSize=${pageSize}&page=${page}`;
        console.log('Fetching tenders from:', url);
        
        return this.http.get(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).pipe(
            tap((response: any) => {
                console.log('Raw response:', response);
                if (!response) {
                    throw new Error('Empty response received');
                }
            }),
            map((response: any) => {
                // Handle Vercel-specific response format
                const processedResponse = this.handleVercelResponse(response);
                console.log('Processed response:', processedResponse);

                // Handle different response formats
                const data = Array.isArray(processedResponse) ? processedResponse :
                           processedResponse.data ? processedResponse.data :
                           processedResponse.items ? processedResponse.items : [];
                           
                const totalCount = typeof processedResponse.totalCount === 'number' ? processedResponse.totalCount :
                                 Array.isArray(processedResponse) ? processedResponse.length : 0;

                // Validate and clean the data
                const validatedData = data.map((item: any) => {
                    return {
                        ...item,
                        // Ensure required fields have default values if missing
                        id: item.id || 0,
                        division: item.division || '',
                        tenderStatus: item.tenderStatus || '',
                        reportDate: item.reportDate || null,
                        businessUnitId: item.businessUnitId || 0,
                        projectName: item.projectName || '',
                        estimatedTenderValue: item.estimatedTenderValue || 0,
                        // Ensure nested objects are handled properly
                        businessUnit: item.businessUnit || { id: 0, name: '', shortName: '' },
                        biddingGammonEntity: item.biddingGammonEntity || null,
                        marketSector: item.marketSector || null,
                        currency: item.currency || null,
                        standardResponsePriorityLevel: item.standardResponsePriorityLevel || null,
                        upgradeDowngradePriorityLevel: item.upgradeDowngradePriorityLevel || null,
                        riskAssessmentCriteria: item.riskAssessmentCriteria || { id: 0, code: '', title: '' },
                        excomDecisionPriorityLevel: item.excomDecisionPriorityLevel || null
                    } as TenderItem;
                });

                return {
                    data: validatedData,
                    totalCount: totalCount
                };
            }),
            catchError((error) => {
                console.error('Error fetching tenders:', error);
                if (error.status === 200 && error.ok === false) {
                    // Handle Vercel-specific error response
                    try {
                        const errorBody = this.handleVercelResponse(error.error);
                        console.error('Processed error response:', errorBody);
                        if (errorBody && errorBody.data) {
                            return of({ data: errorBody.data, totalCount: errorBody.data.length });
                        }
                    } catch (parseError) {
                        console.error('Could not process error response:', parseError);
                    }
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