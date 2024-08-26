import { ChangeDetectorRef, Component } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creercompte',
  templateUrl: './creercompte.component.html',
  styleUrls: ['./creercompte.component.css'],
})
export class CREERCompteComponent {
  participant: any = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
  };

  confirmPassword: string = '';
  passwordsMatch: boolean = true;

  constructor(
    private participantService: ParticipantService,
    private route: Router,
    private snackBar: MatSnackBar,
  ) {}

  addParticipant(): void {
    if (this.participant.password !== this.confirmPassword) {
      this.passwordsMatch = false;
      return;
    }

    this.passwordsMatch = true;

    this.participantService.addParticipant(this.participant).subscribe(
      (response: any) => {
        console.log('Participant ajouté avec succès !', response);
            this.snackBar.open(response.message, 'Fermer', {
              duration: 3000,
            });

        this.route.navigate(['home']);
        // Optionally, reset the form or navigate to another page
      },
      (error: any) => {

            this.snackBar.open(error.error, 'Fermer', {
              duration: 3000,
            });
         console.log(error)
      }
    );
  }
  goToHome() {
        this.route.navigate(['home']);
  }
}
