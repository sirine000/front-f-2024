import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormateurService } from '../formateur.service';
import { Formateur } from 'src/models/formateur';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-connecterformateur',
  templateUrl: './connecterformateur.component.html',
  styleUrls: ['./connecterformateur.component.css'],
})
export class ConnecterformateurComponent implements OnInit {
  email: String = '';
  password: String = '';
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private formateurService: FormateurService,
    private snackBar: MatSnackBar
  ) {}

  gotoformateurAcceuil() {
    this.router.navigate(['./accformateur']);
  }
  forminput!: FormGroup;
  ngOnInit(): void {
    this.forminput = this.formBuilder.group({
      email: ['', [Validators.required ,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  formSubmitted = false;
  submissionMessage = '';

  resetForm() {
    this.forminput.reset();
    this.formSubmitted = true;
    this.submissionMessage = '';
  }

  // component.ts
  seconnecter() {
    if (this.forminput.valid) {
      const formValue = this.forminput.value;
      this.formateurService
        .seconnecter(formValue.email, formValue.password)
        .subscribe(
          (formateur: Formateur) => {
            localStorage.setItem('formateur', JSON.stringify(formateur));

            this.submissionMessage = 'Connexion réussite !';
            this.snackBar.open('Connexion réussite', 'Fermer', {
              duration: 3000,
            });
            this.formSubmitted = true;
            this.gotoformateurAcceuil();
            this.resetForm();
          },
          (error) => {
            console.error('Erreur de connexion', error);
            this.submissionMessage = 'Vérifiez vos données !';
            this.formSubmitted = true;
          }
        );
    } else {
      console.error('Formulaire invalide');
      this.submissionMessage = 'Vos données sont invalides !';
      this.formSubmitted = true;
    }
  }
}
