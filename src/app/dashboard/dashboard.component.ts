import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { CycleServiceService } from '../cycle-service.service';
import { FormateurService } from '../formateur.service';
import { ParticipantService } from '../participant.service';
import { DemandeService } from '../demande.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  nbFormateur: number = 0;
  nbParticipant: number = 0;
  nbCycle: number = 0;
  nbCommande: number = 0;

  constructor(
    private cycleService: CycleServiceService,
    private formateurService: FormateurService,
    private participantService: ParticipantService,
    private demandeService: DemandeService
  ) {}

  ngOnInit() {
    this.loadNbFormateur();
    this.loadNbParticipant();
    this.loadNbCycles();
    this.loadNbCommandes();
  }

  loadNbFormateur(): number {
    this.formateurService.getlisteformateur().subscribe(
      (data: any) => {
        this.nbFormateur = data.formateurmap.length;
      },
      (err) => {
        console.log('Erreur');
      }
    );
    return this.nbFormateur;
  }

  loadNbParticipant(): void {
    this.participantService.getlisteparticipant().subscribe(
      (data) => {
        this.nbParticipant = data.length;
      },
      (err) => {
        console.log('Erreur');
      }
    );
  }
  loadNbCycles(): void {
    this.cycleService.getlistecycle().subscribe(
      (data) => {
        console.log(data);

        this.nbCycle = data.length;
      },
      (err) => {
        console.log('Erreur');
      }
    );
  }
  loadNbCommandes(): void {
    this.demandeService.getlisteDemandes().subscribe(
      (data:any) => {
        console.log(data);

        this.nbCommande = data.commandes.length;
      },
      (err) => {
        console.log('Erreur');
      }
    );
  }
}
