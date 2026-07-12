import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Owner {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string | null;
}

export interface OwnerRequest {
  name: string;
  phone: string;
  email: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private readonly apiUrl = 'https://ve-0e2bd784d9fe4afb9a3d91f44adba958.ecs.us-east-2.on.aws/api/owners';

  constructor(private readonly http: HttpClient) {
  }

  findAll(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.apiUrl);
  }

  findById(id: number): Observable<Owner> {
    return this.http.get<Owner>(`${this.apiUrl}/${id}`);
  }

  create(request: OwnerRequest): Observable<Owner> {
    return this.http.post<Owner>(this.apiUrl, request);
  }

  update(id: number, request: OwnerRequest): Observable<Owner> {
    return this.http.put<Owner>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
