import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  ownerId: number;
}

export interface PetRequest {
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  ownerId: number;
}

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private readonly apiUrl = 'https://ve-158dd3ec9d0b49db8d3b08b5a109f490.ecs.us-east-2.on.aws/api/pets';

  constructor(private readonly http: HttpClient) {
  }

  findAll(
    species?: string,
    ownerId?: number | null
  ): Observable<Pet[]> {

    let params = new HttpParams();

    if (species?.trim()) {
      params = params.set('species', species.trim());
    }

    if (ownerId !== null && ownerId !== undefined) {
      params = params.set('ownerId', ownerId);
    }

    return this.http.get<Pet[]>(this.apiUrl, { params });
  }

  findById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`);
  }

  create(request: PetRequest): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, request);
  }

  update(id: number, request: PetRequest): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
