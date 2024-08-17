import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css'],
})
export class AdminloginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    console.log(this.email)
    this.adminService.login(this.email, this.password).subscribe(
      (response: any) => {
                    localStorage.setItem(
                      'admin',
                      JSON.stringify(response)
                    );

        this.snackBar.open('Connexion réussie', 'Fermer', {
          duration: 3000,
        });
      this.router.navigate(['/dashboard']);

      },
      (error: any) => {
        console.log(error)
        this.snackBar.open('Échec de la connexion', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }
  goToHome() {
      this.router.navigate(['./home']);

}
  gotoAdmin() {
    this.router.navigate(['./header']);
  }
}
