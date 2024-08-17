import { Component, OnInit } from '@angular/core';
import { CoursServiceService } from '../cours-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ajoutercours',
  templateUrl: './ajoutercours.component.html',
  styleUrls: ['./ajoutercours.component.css'],
})
export class AjoutercoursComponent implements OnInit {
  selectedFiles: File[] = [];
  nomCours: string = '';
  idCycle: number = 0;
  message: string = '';
  description: string = '';

  constructor(
    private coursService: CoursServiceService,
    private route: ActivatedRoute,
    private router:Router
  ) {
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idCycleParam = params.get('idCycle');
      if (idCycleParam) {
        this.idCycle = +idCycleParam; // Convert string to number
      }
    });
  }

  onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  // fetchCycleId() {
  //   this.idCycle = this.getCycleIdFromSomewhere();
  // }

  // getCycleIdFromSomewhere(): number {
  //   return 123; // Replace with actual logic to retrieve cycle ID
  // }

  uploadFiles() {
    if (this.selectedFiles.length === 0) {
      this.message = 'Veuillez sélectionner des fichiers à uploader.';
      return;
    }

    if (!this.nomCours || !this.idCycle) {
      this.message = "Veuillez fournir le nom du cours et l'ID du cycle.";
      return;
    }
    console.log(this.selectedFiles);
    this.coursService
      .uploadMultipleFiles(
        this.selectedFiles,
        this.nomCours,
        this.description,
        this.idCycle
      )
      .subscribe(
        () =>
        {this.message =
          'Fichiers uploadés avec succès et associés au cycle.';

        this.router.navigate(['./listcoursformateur']);},

        (err: any) => {
          console.log(err)
          this.message = "Échec de l'upload des fichiers."
        }
      );
  }
}

