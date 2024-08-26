import { Component } from '@angular/core';
import { Participant } from 'src/models/participant';

@Component({
  selector: 'app-accparticipant',
  templateUrl: './accparticipant.component.html',
  styleUrls: ['./accparticipant.component.css']
})
export class AccparticipantComponent {
 parconnecte!: Participant;
  ngOnInit(): void {
    const participantdata = localStorage.getItem('participant');
    if (participantdata) {
      this.parconnecte = JSON.parse(participantdata);
    }
  }
}

