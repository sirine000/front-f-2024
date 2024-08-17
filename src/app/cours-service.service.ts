import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cours } from 'src/models/cours';

@Injectable({
  providedIn: 'root',
})
export class CoursServiceService {
  private coursUrl = 'http://localhost:8082/cours';

  constructor(private http: HttpClient) {}

  selectedFiles!: FileList;
  nomCours!: string;
  idCycle!: number;

  uploadMultipleFiles(
    files: File[],
    nomCours: string,
    description: string,
    idCycle: number
  ): Observable<any> {
    const formData: FormData = new FormData();
    files.forEach((file) => formData.append('fichiers', file));
    formData.append('nomCours', nomCours);
    formData.append('description', description);
    formData.append('idCycle', idCycle.toString());

    return this.http.post(`${this.coursUrl}/inserercyclecours`, formData, {
      headers: new HttpHeaders({
        enctype: 'multipart/form-data',
      }),
      responseType: 'text',
    });
  }

  modifierCours(id: number, cours: Cours): Observable<Cours> {
    return this.http.put<Cours>(`${this.coursUrl}/update/${id}`, cours);
  }

  getCoursesByCycle(cycleId: number): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.coursUrl}/cycle/${cycleId}`);
  }

  getCoursesByCycleId(cycleId: number): Observable<any> {
    return this.http.get(`${this.coursUrl}/cycle/${cycleId}`, {
      params: { cycleId },
    });
  }
}
