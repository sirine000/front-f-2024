import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DemandeService {
  private apiUrl = 'http://localhost:8082/commandes/';
  constructor(private httpClient: HttpClient) {}

  getlisteDemandes(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'listeCommandes');
  }

  verifierCommande(id: number) {
    return this.httpClient.put(`${this.apiUrl}${id}/verifier`, null);
  }

}
