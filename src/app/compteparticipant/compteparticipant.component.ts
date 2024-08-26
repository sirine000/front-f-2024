import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FormateurService } from '../formateur.service';
import { ParticipantService } from '../participant.service';

@Component({
  selector: 'app-compteparticipant',
  templateUrl: './compteparticipant.component.html',
  styleUrls: ['./compteparticipant.component.css'],
})
export class CompteparticipantComponent {
  participantForm: FormGroup;
  participantId!: number;
  selectedFile: File | null = null;
  photoUrl: string = '';
  imgSrc: string | null = null; // Initialize as null

  constructor(
    private fb: FormBuilder,
    private participantService: ParticipantService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.participantForm = this.fb.group({
      id:[''],
      email: [''],
      nom: [''],
      prenom: [''],
    });
  }

  ngOnInit(): void {
    const participant = JSON.parse(localStorage.getItem('participant') || '');
    this.participantId = participant.id;
    this.participantForm.patchValue(participant);
    this.loadParticipant();
  }

  loadParticipant() {
    this.participantService
      .getbyidparticipant(this.participantId)
      .subscribe((data) => {
        this.participantForm.patchValue(data);
        if (data.photo) {
          this.imgSrc = 'data:image/jpeg;base64,' + data.photo;
        }
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      // Optionally preview the selected image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadPhoto() {
    if (this.selectedFile) {
      this.participantService
        .uploadPhoto(this.participantId, this.selectedFile)
        .subscribe(
          () => {
            this.loadParticipant();
            this.snackBar.open('Photo  enregistrée avec succès', 'Fermer', {
              duration: 5000,
            });
          },
          (error: any) => {
            console.log(error);
            this.snackBar.open(
              'Échec du téléchargement de la photo',
              'Fermer',
              {
                duration: 5000,
              }
            );
          }
        );
    }
  }

  updateParticipant(): void {
    const currentParticipant = JSON.parse(
      localStorage.getItem('participant') || '{}'
    );

    // Fusionner les nouvelles informations avec les anciennes
    const updatedParticipant = {
      ...currentParticipant,
      ...this.participantForm.value,
    };

    this.participantService
      .modifierparticipant(this.participantId, updatedParticipant)
      .subscribe(() => {
        localStorage.setItem('participant', JSON.stringify(updatedParticipant));
        this.snackBar.open(
         'Participant mis à jour avec succès',
          'Fermer',
          {
            duration: 3000,
          }
        );
      });
  }
}
