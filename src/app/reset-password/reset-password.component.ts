import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  styleUrls: ['./reset-password.component.css'],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string | null = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.token) {
      const newPassword = this.resetPasswordForm.value.newPassword;
      this.http
        .post('http://localhost:8082/participant/reset-password', {
          token: this.token,
          newPassword,
        })
        .subscribe({
          next: () => {
            this.snackBar.open(
              'Mot de passe réinitialisé avec succès.',
              'Fermer',
              {
                duration: 3000,
              }
            );

            this.router.navigate(['/home']);
          },
          error: (err) => {
            alert('Error: ' + err.error.message);
            console.log(err);
          },
        });
    }
  }
}
