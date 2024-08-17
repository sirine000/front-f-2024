// job-application.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offre } from 'src/models/offre';

@Injectable({
  providedIn: 'root',
})
export class JobapplicationService {
  private apiUrl = 'http://localhost:8082/offres/';

  constructor(private http: HttpClient) {}

  submitApplication(formData: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}add`, formData);
  }

  getlisteCandidats(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'listeCandidats');
  }

  ajouterOffre(offre: any) {
    const params = new HttpParams()
      .set('nomOffre', offre.nomOffre)
      .set('description', offre.description)
      .set('responsabilite', offre.responsabilite)
      .set('qualifications', offre.qualifications);

    return this.http.post<any>(this.apiUrl + 'ajouterOffre', {}, { params });
  }

  getlisteOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(this.apiUrl + 'listeOffres');
  }


  supprimerOffre(idOffre: Offre) {
    return this.http.delete<any>(this.apiUrl + 'del/' + idOffre);
  }

  modifierOffre(idOffre: number, offre: Offre) {
    console.log(offre)
    return this.http.put<Offre>(
      this.apiUrl + 'modifierOffre/' + idOffre,
      offre
    );
  }
}
