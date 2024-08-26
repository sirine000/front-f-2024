import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      this.http
        .post('http://localhost:8082/participant/forgot-password', { email })
        .subscribe({
          next: () => {
            this.snackBar.open(
              'Lien de réinitialisation du mot de passe envoyé à votre adresse e-mail.',
              'Fermer',
              {
                duration: 3000,
              }
            );

            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.log(err);
            alert('Error: ' + err.error.message);
          },
        });
    }
  }
}
