import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JobapplicationService } from '../jobapplication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ajouteroffre',
  templateUrl: './ajouteroffre.component.html',
  styleUrls: ['./ajouteroffre.component.css'],
})
export class AjouteroffreComponent {
  forminput!: FormGroup;
  formSubmitted = false;
  submissionMessage = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private jobService: JobapplicationService,
    private snackBar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.forminput = this.formBuilder.group({
      nomOffre: ['', Validators.required],
      description: ['', Validators.required],
      responsabilite: ['', Validators.required],
      qualifications: ['', Validators.required]
    });
  }

  ajouter() {
    if (this.forminput.valid) {
      const formValue = this.forminput.value;
      console.log('Form Value:', formValue); // Add this line to debug

      const offre: any = {
        nomOffre: formValue.nomOffre,
        description: formValue.description,
        responsabilite: formValue.responsabilite,
        qualifications: formValue.qualifications,
      };

      this.jobService.ajouterOffre(offre).subscribe(
        (response: any) => {
          console.log('Offre ajouté avec succès:', response);
          this.resetForm();
          this.submissionMessage = 'Formulaire enregistré avec succès !';
          this.snackBar.open("L'offre a été vérifiée avec succès.", 'Fermer', {
            duration: 3000,
          });
          this.formSubmitted = true;
        },
        (error) => {
          console.error('Erreur lors de la soumission du formulaire:', error);
          this.submissionMessage =
            'Erreur lors de la soumission du formulaire !';
          this.formSubmitted = true;
        }
      );
    } else {
      console.error(
        'Formulaire invalide. Veuillez remplir tous les champs correctement.'
      );
      this.submissionMessage = 'Le formulaire est invalide !';
      this.formSubmitted = true;
    }
  }

  resetForm() {
    this.forminput.reset();
    this.formSubmitted = true;
    this.submissionMessage = '';
  }

  back() {
    this.router.navigate(['./header']);
  }

  confirmdelete() {
    $('#deleteModal').modal('show');
  }
  closeDelete() {
    $('#deleteModal').modal('hide');
  }
}
