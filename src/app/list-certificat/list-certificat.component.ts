import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../demande.service';
import { InscriptionService } from '../inscription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-certificat',
  templateUrl: './list-certificat.component.html',
  styleUrls: ['./list-certificat.component.css'],
})
export class ListCertificatComponent implements OnInit {
  userEmail!: string;
  participant: any;
  validCycles: any;
  displayCourses!: boolean;
  constructor(
    private commandService: InscriptionService,
    private router: Router
  ) {}
  ngOnInit() {
    this.participant = JSON.parse(localStorage.getItem('participant') || '');
    this.userEmail = this.participant.email;
    this.loadCourses();
  }

  loadCourses(): void {
    console.log(this.userEmail);
    this.commandService.loadValidCours(this.userEmail).subscribe({
      next: (cycles) => {
        this.validCycles = cycles;
        this.displayCourses = this.validCycles.length > 0;
        console.log(cycles);
      },
      error: (err) => {
        console.error('Error loading courses:', err);
      },
    });
  }

  openCertif(nom: string,prenom:String, cycle: string, date: String) {
  if (!nom || !cycle || !date) {
    console.error('One of the parameters is undefined:', { nom, cycle, date });
    return;
  }

  this.router.navigate(['certificat', nom,prenom, cycle, date.toString()]);  }
}
