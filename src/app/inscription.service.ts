import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  private apiUrl = 'http://localhost:8082/commandes/'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  submitRegistration(formData: FormData) {
    return this.http.post(`${this.apiUrl}add`, formData);
  }
  loadValidCours(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}valid-courses`, {
      params: new HttpParams().set('email', email),
    });
  }



}
