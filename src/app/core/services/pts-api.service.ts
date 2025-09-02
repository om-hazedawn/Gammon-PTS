import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// API Response types based on swagger.json
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface Form20 {
  id?: number;
  tenderNo?: string;
  projectName: string;
  clientName: string;
  contractValue: number;
  currency: string;
  tenderClosingDate?: Date;
  projectDescription?: string;
  contractType?: string;
  contractDuration?: number;
  status?: string;
  createdDate?: Date;
  createdBy?: string;
  modifiedDate?: Date;
  modifiedBy?: string;
}

export interface Form20List {
  id: number;
  tenderNo: string;
  projectName: string;
  status: string;
  createdDate: Date;
  contractValue: number;
  currency: string;
}

export interface KeyDate {
  id?: number;
  formId: number;
  dateType: string;
  plannedDate: Date;
  actualDate?: Date;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PtsApiService {
  private readonly baseUrl = environment.apiUrl || '/api';

  constructor(private http: HttpClient) {}

  // PTS20 Form API methods
  getFormList(filters?: any): Observable<ApiResponse<Form20List[]>> {
    return this.http.post<ApiResponse<Form20List[]>>(
      `${this.baseUrl}/pts20/Form20/obtainFormList`,
      filters || {}
    );
  }

  getForm(id: number): Observable<ApiResponse<Form20>> {
    return this.http.post<ApiResponse<Form20>>(`${this.baseUrl}/pts20/Form20/obtainForm`, id);
  }

  saveForm(form: Form20): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(`${this.baseUrl}/pts20/Form20/saveForm`, form);
  }

  submitForm(id: number): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      `${this.baseUrl}/pts20/Form20/submitForm/${id}`,
      {}
    );
  }

  deleteForm(id: number): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      `${this.baseUrl}/pts20/Form20/deleteForm/${id}`,
      {}
    );
  }

  getFormPDF(formId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/pts20/Form20/formPDF/${formId}`, {
      responseType: 'blob',
    });
  }

  // Key Dates management
  getKeyDates(formId: number): Observable<ApiResponse<KeyDate[]>> {
    return this.http.post<ApiResponse<KeyDate[]>>(
      `${this.baseUrl}/pts20/Form20/obtainKeyDates/${formId}`,
      {}
    );
  }

  updateKeyDates(keyDates: KeyDate[]): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      `${this.baseUrl}/pts20/Form20/updateKeyDates`,
      keyDates
    );
  }

  // Lookup data methods
  getRegions(): Observable<ApiResponse<any[]>> {
    return this.http.post<ApiResponse<any[]>>(`${this.baseUrl}/pts20/Form20/obtainRegion`, {});
  }

  getCurrencies(): Observable<ApiResponse<any[]>> {
    return this.http.post<ApiResponse<any[]>>(`${this.baseUrl}/pts20/Form20/obtainCurrency`, {});
  }

  getTenderTypes(): Observable<ApiResponse<any[]>> {
    return this.http.post<ApiResponse<any[]>>(`${this.baseUrl}/pts20/Form20/obtainTenderType`, {});
  }

  getContractTypes(): Observable<ApiResponse<any[]>> {
    return this.http.post<ApiResponse<any[]>>(
      `${this.baseUrl}/pts20/Form20/obtainContractType`,
      {}
    );
  }

  getBidTypes(): Observable<ApiResponse<any[]>> {
    return this.http.post<ApiResponse<any[]>>(`${this.baseUrl}/pts20/Form20/obtainBidType`, {});
  }

  // Search people
  searchPeople(searchTerm: string): Observable<ApiResponse<any[]>> {
    return this.http.post<ApiResponse<any[]>>(
      `${this.baseUrl}/pts20/Form20/searchPeople`,
      searchTerm
    );
  }

  // Get staff by role
  getStaffByRole(role: string): Observable<ApiResponse<any[]>> {
    return this.http.post<ApiResponse<any[]>>(
      `${this.baseUrl}/pts20/Form20/obtainStaffByRole/${role}`,
      {}
    );
  }

  // Authorization methods
  getUserFunctions(): Observable<ApiResponse<string[]>> {
    return this.http.post<ApiResponse<string[]>>(`${this.baseUrl}/pts20/Authorize/functions`, {});
  }

  getUserRoles(): Observable<ApiResponse<string[]>> {
    return this.http.post<ApiResponse<string[]>>(`${this.baseUrl}/pts20/Authorize/roles`, {});
  }

  // Attachment methods
  getAttachmentList(formId: number): Observable<ApiResponse<any[]>> {
    return this.http.post<ApiResponse<any[]>>(
      `${this.baseUrl}/pts20/Form20/obtainAttachmentList/${formId}`,
      {}
    );
  }

  saveAttachment(formData: FormData): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.baseUrl}/pts20/Form20/saveAttachment`,
      formData
    );
  }

  getAttachment(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/pts20/Form20/attachment/${id}`, {
      responseType: 'blob',
    });
  }

  // Health check methods
  anonymousTest(): Observable<ApiResponse<string>> {
    return this.http.get<ApiResponse<string>>(`${this.baseUrl}/pts20/HealthCheck/AnonymousTest`);
  }

  authorizeTest(): Observable<ApiResponse<string>> {
    return this.http.get<ApiResponse<string>>(`${this.baseUrl}/pts20/HealthCheck/AuthorizeTest`);
  }

  databaseTest(): Observable<ApiResponse<string>> {
    return this.http.get<ApiResponse<string>>(`${this.baseUrl}/pts20/HealthCheck/DatabaseTest`);
  }
}
