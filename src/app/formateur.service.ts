import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CycleEntity } from 'src/models/cycle';
import { Formateur } from 'src/models/formateur';

@Injectable({
  providedIn: 'root',
})
export class FormateurService {
  private apiurlf = 'http://localhost:8082/formateur/';
  constructor(private httpclient: HttpClient) {}

  // formateur :formateur{
  //   id:-1,
  //   email:"",
  //   password:"",
  //   nomEtPrenom:"",
  //   conf_password:"",
  // }
  getlisteformateur(): Observable<Formateur[]> {
    return this.httpclient.get<Formateur[]>(this.apiurlf + 'listeFormateur');
  }

  ajouterformateur(formateur: Formateur) {
    return this.httpclient.post<Formateur>(
      this.apiurlf + 'ajouterformateur',
      formateur
    );
  }

  supprimerformateur(idFormateur: any) {
    return this.httpclient.delete<Formateur>(
      this.apiurlf + 'del/' + idFormateur
    );
  }

  modifierformateur(idFormateur: number, formateur: Formateur) {
    return this.httpclient.put<Formateur>(
      this.apiurlf + 'modifierformateur/' + idFormateur,
      formateur
    );
  }
  getnomidformateur(idFormateur: Number): Observable<string> {
    return this.httpclient.get<string>(
      '${this.apiurlf}/getnomidformateur/${idFormateur}'
    );
  }

  getnomprof(): Observable<Formateur[]> {
    return this.httpclient.get<Formateur[]>(this.apiurlf + 'listenomprof');
  }

  // formateur.service.ts
  seconnecter(email: string, password: string): Observable<Formateur> {
    const seconnecterUrl =
      this.apiurlf +
      'seconnecterformateur?email=' +
      email +
      '&password=' +
      password;
    return this.httpclient.get<Formateur>(seconnecterUrl);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('formateur');
    return !!token;
  }

  // getcycledeformateur(idFormateur: number): Observable<CycleEntity[]>{
  //   return this.httpclient.get<CycleEntity[]>(this.apiurlf+"formateurscyles/"+this.idFormateur)
  // }
  // getCyclesForFormateur(idFormateur: number): Observable<CycleEntity[]> {
  //   const url = `${this.apiurlf}formateurscycles/${idFormateur}`; // Utilisation de l'ID dans l'URL
  //   return this.httpclient.get<any[]>(url);
  // }
  uploadPhoto(formateurId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.httpclient.post(
      `${this.apiurlf}uploadPhoto/${formateurId}`,
      formData,
      {
        headers: new HttpHeaders({
          enctype: 'multipart/form-data',
        }),
        responseType: 'text',
      }
    );
  }
  getbyidformateur(idFormateur: number): Observable<Formateur> {
    return this.httpclient.get<Formateur>(
      this.apiurlf + 'userid/' + idFormateur
    );
  }

  activateFormateur(id: number): Observable<Formateur> {
    const activateUrl = `${this.apiurlf}activateFormateur/${id}`;
    return this.httpclient.put<Formateur>(activateUrl, {});
  }

  deactivateFormateur(id: number): Observable<Formateur> {
    const deactivateUrl = `${this.apiurlf}deactivateFormateur/${id}`;
    return this.httpclient.put<Formateur>(deactivateUrl, {});
  }

  getCoursByFormateur(formateurId: number): Observable<any[]> {
    return this.httpclient.get<any[]>(
      `${this.apiurlf}coursbyFormateur/${formateurId}`
    );
  }
}
