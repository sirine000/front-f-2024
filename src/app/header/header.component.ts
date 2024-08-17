import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  id_formateur!: number;
  listeformateur() {
    this.router.navigate(['/listeFormateur']);
  }
  demandeInscription() {
    this.router.navigate(['/demande-inscription']);
  }
  listeCandidats() {
    this.router.navigate(['/liste-candidats']);
  }
  ajouterFormateur() {
    this.router.navigate(['/ajouterformateur']);
  }
  listeparticipant() {
    this.router.navigate(['/listepar']);
  }
  listeOffres() {
    this.router.navigate(['/listOffres']);
  }
  addcycle() {
    this.router.navigate(['/ajouterCycle']);
  }
  addOffre() {
    this.router.navigate(['/ajouterOffre']);
  }
  liste_cycle() {
    this.router.navigate(['/listecycle']);
  }
  deconnection() {
    localStorage.removeItem('admin');

    this.router.navigate(['home']);

    // window.location.reload();
  }

  gotodashbord() {
    this.router.navigate(['/dashboard']);
  }
  goToCompte() {
    this.router.navigate(['/compteAdmin']);
  }
}
