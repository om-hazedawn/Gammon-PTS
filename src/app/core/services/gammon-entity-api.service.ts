import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private apiUrl = 'api/ptsrisk/GammonEntity/api/GammonEntity';

  constructor(private http: HttpClient) { }

  getGammonEntities(): Observable<GammonEntity[]> {
    return this.http.get<ApiResponse>(this.apiUrl)
      .pipe(
        map(response => response.data)
      );
  }
}