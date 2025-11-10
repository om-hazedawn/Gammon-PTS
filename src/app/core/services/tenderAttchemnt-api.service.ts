import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { TenderAttachment } from '../../model/entity/pts-risk/tenderAttchemnt';

@Injectable({
  providedIn: 'root',
})
export class TenderAttachmentApiService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = '/api/ptsrisk/TenderAttachment/api';
    console.log('TenderAttachment service baseUrl:', this.baseUrl);
  }


  uploadAttachment(tenderId: number, file: File): Observable<HttpEvent<any>> {
    const url = `${this.baseUrl}/tender/${tenderId}/attachment`;
    const formData = new FormData();
    formData.append('formFile', file);
    console.log('Full attachment upload URL:', url);
    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events',
      headers: {
        'Accept': 'application/json'
      }
    }).pipe(
      tap((response) => {
        console.log('Attachment uploaded successfully:', response);
      }),
      catchError((error) => {
        console.error('Error uploading attachment:', error);
        throw error;
      })
    );
  }

  getAttachment(id: number): Observable<TenderAttachment> {
    const url = `${this.baseUrl}/tenderAttachment/${id}`;
    return this.http.get<TenderAttachment>(url).pipe(
      tap((response) => console.log('Attachment fetched:', response)),
      catchError((error) => {
        console.error('Error fetching attachment:', error);
        throw error;
      })
    );
  }
}