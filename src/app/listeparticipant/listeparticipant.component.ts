import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Participant } from 'src/models/participant';
import { ParticipantService } from '../participant.service';
import { AnonymousSubject } from 'rxjs/internal/Subject';
declare var $ :any
@Component({
  selector: 'app-listeparticipant',
  templateUrl: './listeparticipant.component.html',
  styleUrls: ['./listeparticipant.component.css'],
})
export class ListeparticipantComponent {
  listefor: any[] = [];
  forminput: FormGroup;
  participantToUpdate!: any;
  constructor(
    private participantService: ParticipantService,
    private router: Router,
    private participantservice: ParticipantService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.forminput = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      conf_password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadParticipants();
  }

  back() {
    this.router.navigate(['./header']);
  }

  // gotoajoutercycletest(idParticipant: number) {
  //   this.router.navigate(['./postcycleetparticipant', idParticipant]);
  // }

  participanttodelete!: any;
  confirmdelete(participant: Participant) {
    this.participanttodelete = participant;
    $('#deleteModal').modal('show');
  }
  closeDelete() {
    $('#deleteModal').modal('hide');
  }
  closeUpdate() {
   $('#updateModal').modal('hide');
}
  deletec() {
    this.participantservice
      .supprimerparticipant(this.participanttodelete.id)
      .subscribe(() => {
        $('#deleteModal').modal('hide');
        this.loadParticipants();
      });
  }

  openUpdateModal(participant: any) {
    this.participantToUpdate = participant;
    this.forminput.patchValue(participant);
    $('#updateModal').modal('show');
  }

  updateParticipant() {
    if (this.forminput.valid) {
      this.participantService
        .modifierparticipant(
          this.participantToUpdate.id,
          this.forminput.value
        )
        .subscribe(() => {
          console.log('Updated');
          this.snackBar.open('Participant mis a jour ', 'Fermer', {
            duration: 3000,
          });
          $('#updateModal').modal('hide');
          this.loadParticipants();
        });
    }
  }

  loadParticipants() {
    this.participantservice.getlisteparticipant().subscribe((list: any) => {
      this.listefor = list;

    });
  }
  // activateParticipant(id: number) {
  //   this.participantService.activateParticipant(id).subscribe(
  //     (participant: Participant) => {
  //       console.log('Participant activated', participant);
  //       this.snackBar.open('Participant activé', 'Fermer', {
  //         duration: 3000,
  //       });
  //       this.loadParticipants();
  //     },
  //     (error:any) => {
  //       console.error('Error activating participant', error);
  //     }
  //   );
  // }

  // deactivateParticipant(id: number) {
  //   this.participantService.deactivateParticipant(id).subscribe(
  //     (participant: Participant) => {
  //       console.log('Participant deactivated', participant);
  //       this.snackBar.open('Participant deactivé', 'Fermer', {
  //         duration: 3000,
  //       });
  //       this.loadParticipants();
  //     },
  //     (error:any) => {
  //       console.error('Error deactivating participant', error);
  //     }
  //   );
  // }
}
