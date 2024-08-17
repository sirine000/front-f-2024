import { Component, OnInit } from '@angular/core';
import { JobapplicationService } from '../jobapplication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Offre } from 'src/models/offre';

@Component({
  selector: 'app-listeoffres',
  templateUrl: './listeoffres.component.html',
  styleUrls: ['./listeoffres.component.css'],
})
export class ListeoffresComponent implements OnInit {
  listeOffres: Offre[] = [];
  forminput: FormGroup;
  jobToUpdate: any;
  jobtodelete: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private jobService: JobapplicationService
  ) {
    this.forminput = this.fb.group({
      nomOffre: ['', Validators.required],
      description: ['', [Validators.required]],
      responsabilite: ['', [Validators.required]],
      qualifications: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadOffres();
  }

  back() {
    this.router.navigate(['./header']);
  }

  confirmdelete(offre: any) {
    this.jobtodelete = offre;
    $('#deleteModal').modal('show');
  }

  closeDelete() {
    $('#deleteModal').modal('hide');
  }

  closeUpdate() {
    $('#updateModal').modal('hide');
  }

  deletec() {
    this.jobService.supprimerOffre(this.jobtodelete.id).subscribe(() => {
      $('#deleteModal').modal('hide');
      this.loadOffres();
    });
  }

  openUpdateModal(job: any) {
    this.jobToUpdate = job;
    this.forminput.patchValue(job);
    $('#updateModal').modal('show');
  }

  updateOffre() {
    if (this.forminput.valid) {
      this.jobService
        .modifierOffre(this.jobToUpdate.id, this.forminput.value)
        .subscribe(() => {
          console.log('Updated');
          this.snackBar.open('Offre mis a jour ', 'Fermer', {
            duration: 3000,
          });
          $('#updateModal').modal('hide');
          this.loadOffres();
        });
    }
  }

  loadOffres() {
    this.jobService.getlisteOffres().subscribe((list: any) => {
      this.listeOffres = list.jobs;
    });
  }

}
