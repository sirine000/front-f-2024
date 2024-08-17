import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParticipantService } from '../participant.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: ParticipantService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  creercompte() {
    this.router.navigate(['./creercompte']);
  }

  GoToAdminLog() {
    this.router.navigate(['./adminlogin']);
  }

  GoToformateur() {
    this.router.navigate(['./seconnecterformateur']);
  }
  GoToParticipantSpace() {
    this.router.navigate(['./user']);
  }
  GoToParticipantLogin() {
this.router.navigate(['/home']).then(() => {
  window.scrollTo(0, 0);
});  }
  seconnecteruser() {
    this.router.navigate(['./creercompte']);
  }

  offreemploi() {
    this.router.navigate(['./offreemploi']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        (response: any) => {
             localStorage.setItem('participant', JSON.stringify(response));
          this.snackBar.open('Connexion réussite', 'Fermer', {
            duration: 3000,
          });

          this.GoToParticipantSpace();
        },
        (error: any) => {
          let errorMessage = 'Une erreur est survenue.';
          if (error.status === 401) {
            errorMessage = error.error;
          }
          this.snackBar.open(errorMessage, 'Fermer', {
            duration: 3000,
          });
          console.error('Error:', error);
        }
      );
    }
  }
}
