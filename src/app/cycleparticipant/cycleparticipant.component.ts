import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CycleEntity } from 'src/models/cycle';
import { CycleServiceService } from '../cycle-service.service';
import { InscriptionService } from '../inscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cycleparticipant',
  templateUrl: './cycleparticipant.component.html',
  styleUrls: ['./cycleparticipant.component.css'],
})
export class CycleparticipantComponent implements OnInit {
  cycletodelete!: CycleEntity;
  cyclee!: CycleEntity;
  formateurs: any[] = [];
  listecycle: any[] = [];
  updateForm!: FormGroup;
  selectedCycleId!: number;
  registrationForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private CycleServiceService: CycleServiceService,
    private inscriptionService: InscriptionService,
    private snackBar: MatSnackBar
  ) {}
ch:string="pas de cycle pour le moment !";


  ngOnInit(): void {
    this.loadCycles();

    this.registrationForm = this.fb.group({
      cycleId: ['', Validators.required],
      nomPrenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      bonDeCommande: ['', Validators.required], // Use 'bonDeCommande' consistently
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.registrationForm.patchValue({ bonDeCommande: file.name }); // Updated to 'bonDeCommande'
    }
  }

  onSubmit() {
    if (this.registrationForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('cycleId', this.registrationForm.get('cycleId')?.value);
      formData.append(
        'nomPrenom',
        this.registrationForm.get('nomPrenom')?.value
      );
      formData.append('email', this.registrationForm.get('email')?.value);
      formData.append(
        'telephone',
        this.registrationForm.get('telephone')?.value
      );
      formData.append('adresse', this.registrationForm.get('adresse')?.value);
      formData.append('bonDeCommande', this.selectedFile); // Ensure file is included

      this.inscriptionService.submitRegistration(formData).subscribe(
        (response) => {
          this.snackBar.open(
            'Votre inscription est ajoutée. Veuillez attendre la vérification de votre bon de commande pour accéder à vos cours !',
            'Fermer',
            {
              duration: 5000,
            }
          );
          // Reset the form after submission
          this.registrationForm.reset();
          this.selectedFile = null;
          this.closeInscrit();
        },
        (error) => {
          console.error('Erreur lors de la soumission de la commande:', error);
          this.snackBar.open(
            "Une erreur est survenue lors de l'enregistrement de votre commande. Veuillez vérifier vos données.",
            'Fermer',
            {
              duration: 3000,
            }
          );
        }
      );
    }
  }

  closeInscrit(): void {
    $('#inscriptionModal').modal('hide');
  }

  loadCycles(): void {
    this.CycleServiceService.getlistecycle().subscribe(
      (cycles: any) => {
        this.listecycle = cycles || [];
        console.log(this.listecycle);
      },
      (error: any) => {
        console.error('Erreur lors du chargement des cycles:', error);
      }
    );
  }


  

  
}
