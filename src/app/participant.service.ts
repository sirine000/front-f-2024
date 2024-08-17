import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Participant } from 'src/models/participant';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  private apiUrl = 'http://localhost:8082/participant/'; // Your backend API URL

  constructor(private http: HttpClient) {}

  addParticipant(participant: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}add`, participant);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, user);
  }

  getlisteparticipant(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.apiUrl + 'listeParticipant');
  }

  ajouterparticipant(participant: Participant) {
    return this.http.post<Participant>(
      this.apiUrl + 'ajouterparticipant',
      participant
    );
  }
  uploadPhoto(participantId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(
      `${this.apiUrl}uploadPhoto/${participantId}`,
      formData,
      {
        headers: new HttpHeaders({
          enctype: 'multipart/form-data',
        }),
        responseType: 'text',
      }
    );
  }
  getbyidparticipant(idParticipant: number): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + 'userid/' + idParticipant
    );
  }
  supprimerparticipant(idParticipant: any) {
    return this.http.delete<Participant>(this.apiUrl + 'del/' + idParticipant);
  }

  modifierparticipant(idParticipant: number, participant: Participant) {
    return this.http.put<Participant>(
      this.apiUrl + 'modifierparticipant/' + idParticipant,
      participant
    );
  }
  getnomidparticipant(idParticipant: Number): Observable<string> {
    return this.http.get<string>(
      '${this.apiUrl}/getnomidparticipant/${idParticipant}'
    );
  }

  activateParticipant(id: number): Observable<Participant> {
    const activateUrl = `${this.apiUrl}activateParticipant/${id}`;
    return this.http.put<Participant>(activateUrl, {});
  }

  deactivateParticipant(id: number): Observable<Participant> {
    const deactivateUrl = `${this.apiUrl}deactivateParticipant/${id}`;
    return this.http.put<Participant>(deactivateUrl, {});
  }
}
