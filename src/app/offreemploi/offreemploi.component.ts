import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobapplicationService } from '../jobapplication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-offreemploi',
  templateUrl: './offreemploi.component.html',
  styleUrls: ['./offreemploi.component.css'],
})
export class OffreemploiComponent implements OnInit {
  jobApplicationForm: FormGroup;
  cvFile: File | null = null;
  listeOffres: any;

  constructor(
    private fb: FormBuilder,
    private jobApplicationService: JobapplicationService,
    private snackBar: MatSnackBar,
    private jobService:JobapplicationService
  ) {
    this.jobApplicationForm = this.fb.group({
      nomPrenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      cv: [null, Validators.required],
    });
  }
  ngOnInit(): void {
      this.loadOffres();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.cvFile = file;
      this.jobApplicationForm.patchValue({ cv: file.name });
    }
  }
  onSubmit() {
    if (this.jobApplicationForm.valid) {
      const formData = new FormData();
      formData.append(
        'nomPrenom',
        this.jobApplicationForm.get('nomPrenom')?.value
      );
      formData.append('email', this.jobApplicationForm.get('email')?.value);
      formData.append(
        'telephone',
        this.jobApplicationForm.get('telephone')?.value
      );
      formData.append('adresse', this.jobApplicationForm.get('adresse')?.value);

      if (this.cvFile) {
        formData.append('cv', this.cvFile);
      }

      this.jobApplicationService.submitApplication(formData).subscribe(
        (response: any) => {
          console.log('Application submitted successfully', response);
          this.snackBar.open(
            'Votre application a été envoyée. Veuillez attendre notre retour.',
            'Fermer',
            {
              duration: 3000,
            }
          );
          this.jobApplicationForm.reset();
          $('#exampleModal').modal('hide');
        },
        (error) => {
          console.error('Error submitting application', error);
          this.snackBar.open('Echec.', 'Fermer', {
            duration: 3000,
          });
          // Optionally, show an error message
        }
      );
    }
  }

  loadOffres() {
    this.jobService.getlisteOffres().subscribe((list: any) => {
      this.listeOffres = list.jobs;
    });
  }
}
