import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Formateur } from 'src/models/formateur';
import { DemandeService } from '../demande.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-demande-inscription',
  templateUrl: './demande-inscription.component.html',
  styleUrls: ['./demande-inscription.component.css'],
})
export class DemandeInscriptionComponent implements OnInit {
  listefor: any[] = [];
  forminput: FormGroup;
  selectedImageUrl: string | null = null;

  constructor(
    private demandeService: DemandeService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.forminput = this.fb.group({
      nomPrenom: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', [Validators.required, Validators.minLength(8)]],
      bonDeCommande: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadDemandes();
    console.log(this.listefor);
  }

  loadDemandes() {
    this.demandeService.getlisteDemandes().subscribe((list: any) => {
      this.listefor = list.commandes;
    });
  }

  openModal(url: string): void {
    this.selectedImageUrl = 'data:image/jpeg;base64,'+ url;
      $('#imageModal').modal('show');
  }

   verifierCommande(id: number): void {
    this.demandeService.verifierCommande(id).subscribe(
      (response) => {
        this.snackBar.open('La commande a été vérifiée avec succès.', 'Fermer', {
          duration: 3000,
        });
        this.loadDemandes(); // Reload the commandes to update the verification status
      },
      (error) => {
        console.error('Erreur lors de la vérification de la commande:', error);
        this.snackBar.open('Erreur lors de la vérification de la commande.', 'Fermer', {
          duration: 3000,
        });
      }
    );
   }
  
  activateFormateur(id: number) {
    // this.demandeService.activateFormateur(id).subscribe(
    //   (formateur: Formateur) => {
    //     console.log('Formateur activated', formateur);
    //     this.snackBar.open('Formateur activé', 'Fermer', {
    //       duration: 3000,
    //     });
    //     this.loadDemandes();
    //   },
    //   (error) => {
    //     console.error('Error activating formateur', error);
    //   }
    // );
  }

  deactivateFormateur(id: number) {
    // this.demandeService.deactivateFormateur(id).subscribe(
    //   (formateur: Formateur) => {
    //     console.log('Formateur deactivated', formateur);
    //     this.snackBar.open('Formateur deactivé', 'Fermer', {
    //       duration: 3000,
    //     });
    //     this.loadDemandes();
    //   },
    //   (error) => {
    //     console.error('Error deactivating formateur', error);
    //   }
    // );
  }
}
