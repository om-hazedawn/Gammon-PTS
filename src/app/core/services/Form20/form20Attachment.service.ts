import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

export interface Form20Attachment {
  id: number;
  headerID: number;
  keyDateId: number | null;
  attachmentType: string | null;
  fileName: string;
  isDeleted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Form20AttachmentService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = '/api/pts20/Form20';
  }

  obtainAttachmentsList(formId: number): Observable<Form20Attachment[]> {
    return this.http.post<Form20Attachment[]>(`${this.baseUrl}/obtainAttachmentList/${formId}`, {});
  }
  
  saveAttachment(file: File, formId: number, attachmentType?: string): Observable<Form20Attachment> {
    const formData = new FormData();
    formData.append('file', file);
    
    // Build query parameters
    let url = `${this.baseUrl}/saveAttachment?formId=${formId}`;
    if (attachmentType) {
      url += `&type=${attachmentType}`;
    }
    
    return this.http.post<Form20Attachment>(url, formData);
  }

  downloadAttachment(attachmentId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/attachment/${attachmentId}`, { responseType: 'blob' });
  }
}
