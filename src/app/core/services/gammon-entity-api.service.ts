import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface GammonEntity {
  id: number;
  name: string;
  shortName: string;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
  status: string;
}

interface ApiResponse {
  data: GammonEntity[];
}

@Injectable({
  providedIn: 'root'
})
export class GammonEntityApiService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/ptsrisk/GammonEntity/api/GammonEntity`;
  }

  getGammonEntities(): Observable<GammonEntity[]> {
    return this.http.get<ApiResponse>(this.apiUrl)
      .pipe(
        map(response => response.data)
      );
  }
}