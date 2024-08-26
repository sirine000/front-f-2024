import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormateurService } from '../formateur.service';
import { Formateur } from 'src/models/formateur';
import { error } from 'jquery';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { catchError, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var $: any;
@Component({
  selector: 'app-ajouter-formateur',
  templateUrl: './ajouter-formateur.component.html',
  styleUrls: ['./ajouter-formateur.component.css'],
})
export class AjouterFormateurComponent  {
  forminput: FormGroup;
  formSubmitted = false;
  submissionMessage = '';

  constructor(
    private router:Router,
    private fb: FormBuilder,
    private authService:FormateurService,
    private snackBar: MatSnackBar
  ) {
    this.forminput = this.fb.group(
      {
        nomEtPrenom: ['', Validators.required],
        tel: ['', [Validators.required, Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        conf_password: ['', Validators.required],
      },
      { validator: this.mustMatch('password', 'conf_password') }
    );
  }

  ajouterformateur() {
    this.formSubmitted = true;
    if (this.forminput.invalid) {
      return;
    }

    const formateur = this.forminput.value;
    this.authService.ajouterformateur(formateur).subscribe(
      (response:any) => {
        this.snackBar.open("Formateur ajouté avec succès", 'Fermer', {
          duration: 3000,
        });
        this.router.navigate(['listeFormateur']);
      },
      (error:any) => {
          error.error.message || 'Une erreur est survenue.';
        this.snackBar.open(error.error.message, 'Fermer', {
          duration: 3000,
          
        });
      }
    );
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}








