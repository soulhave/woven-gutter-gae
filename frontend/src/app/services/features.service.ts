import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Feature } from "../model/feature.model"
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  constructor(
    private http: HttpClient
  ) { }

  loadAll(): Observable<Feature[]> {
    return this.http.get<Feature[]>(`${environment.url}/switch`);
  }

  updateStatus(feature: Feature, state: string): Observable<Feature> {
    const _id = encodeURIComponent(feature.id);
    return this.http.patch<Feature>(
      `${environment.url}/switch/${_id}`,
      {"state": state}
    );
  }
}
