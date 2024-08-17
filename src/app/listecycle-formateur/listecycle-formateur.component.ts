import { Component, OnInit } from '@angular/core';
import { CycleServiceService } from '../cycle-service.service';
import { CycleEntity } from 'src/models/cycle';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormateurService } from '../formateur.service';
import { STRING_TYPE } from '@angular/compiler';
import { Formateur } from 'src/models/formateur';

@Component({
  selector: 'app-listecycle-formateur',
  templateUrl: './listecycle-formateur.component.html',
  styleUrls: ['./listecycle-formateur.component.css']
})
export class ListecycleFormateurComponent implements OnInit {
  constructor(private cycleServiceService:CycleServiceService, private formateurService:FormateurService ,private route:ActivatedRoute,private router:Router ){}
  ajoutercours(idCycle:number)
  {
     this.router.navigate(["./inserercyclecours",idCycle])
  }
  password!:String;
  nomEtprenom!:String;

  cycles: any[] = [];
  idFormateur: number | undefined;
  formateurConnecte: Formateur | undefined;


  ngOnInit(): void {
    // console.log('Début ngOnInit');

   const formateurData = localStorage.getItem('formateur');
   console.log('formateurData:', formateurData);

   if (formateurData) {
     try {
       // Parse the JSON string to an object
       const formateur = JSON.parse(formateurData);
       console.log('Formateur data:', formateur);

       // Check if the parsed data has the 'id_formateur' property
       if (formateur && formateur.id_formateur) {
         this.idFormateur = formateur.id_formateur;
         this.formateurConnecte = formateur;

         console.log('ID du formateur récupéré :', this.idFormateur);
         this.loadCycles(this.idFormateur);
       } else {
         console.error('ID du formateur non trouvé dans les données parsées.');
         // Gérer le cas où l'ID du formateur n'est pas trouvé dans les données parsées
       }
     } catch (e) {
       console.error('Erreur lors de la parsing des données du formateur:', e);
       // Gérer le cas où le JSON est invalide ou la parsing échoue
     }
   } else {
     console.error('Aucune donnée de formateur trouvée dans localStorage.');
     // Gérer le cas où aucune donnée de formateur n'est trouvée
   }

    console.log('Fin ngOnInit');
  }
ch:string="";
loadCycles(idFormateur: any): void {
  this.cycleServiceService.getCyclesForFormateur(idFormateur).subscribe(
    (cycles) => {
      if (cycles && cycles.length > 0) {
        this.cycles = cycles;
        console.log('Cycles récupérés avec succès', cycles);
      } else {
        this.ch = 'Aucun cycle pour vous !';
      }
    },
    (error) => {
      console.error('Erreur lors de la récupération des cycles', error);
      if (error.status === 404) {
        console.error(
          'Formateur non trouvé ou cycles non disponibles pour cet ID.'
        );
        this.ch = 'Formateur non trouvé ou cycles non disponibles pour cet ID.';
      } else {
        // Autre gestion d'erreur générique
        this.ch = 'Une erreur est survenue lors de la récupération des cycles.';
      }
    }
  );
}
}
/*
  ngOnInit(): void {
    const formateurData = localStorage.getItem('formateur.idFormateur');
    if (formateurData) {
      this.idFormateur = Number(formateurData);
      this.loadCycles(this.idFormateur);
      this.formateurService.getbyidformateur(this.idFormateur).subscribe(
        formateur => {
          this.formateurConnecte = formateur;
          console.log('Formateur connecté :', formateur);
        },
        error => {
          console.error('Erreur lors de la récupération du formateur connecté', error);
        }
      );
    } else {
      console.error('ID du formateur non trouvé.');
    }
  }

  loadCycles(idFormateur: number): void {
    this.formateurService.getCyclesForFormateur(idFormateur)
      .subscribe(
        cycles => {
          this.cycles = cycles;
          console.log('Cycles récupérés avec succès', cycles);
        },
        error => {
          console.error('Erreur lors de la récupération des cycles', error);
        }
      );
  }




}

*/
















  /*
  ngOnInit(): void {
    const idFormateur = this.formateurService.seconnecter(this.nomEtprenom,this.password); // Obtenez l'ID du formateur connecté depuis le service d'authentification
    this.loadCycles(this.idFormateur);
  }

  loadCycles(idFormateur: number) {


    this.formateurService.getCyclesForFormateur(idFormateur)
      .subscribe(
        cycles => {
          this.cycles = cycles;
          console.log('Cycles récupérés avec succès', cycles);
        },
        error => {
          console.error('Erreur lors de la récupération des cycles', error);
          // Gérer les erreurs ici
        }
      );
  }
  // ngOnInit(): void {
  //   this.loadCycles();
  // }

  // loadCycles() {
  //   // Supposons que vous avez stocké l'ID du formateur connecté dans le service d'authentification
  //   const idFormateur = 1; // Remplacez par l'ID du formateur connecté
  //   this.formateurService.getCyclesForFormateur(idFormateur)
  //     .subscribe(
  //       cycles => {
  //         this.cycles = cycles;
  //         console.log('Cycles récupérés avec succès', cycles);
  //       },
  //       error => {
  //         console.error('Erreur lors de la récupération des cycles', error);
  //         // Gérer les erreurs ici
  //       }
  //     );
  // }
*/





  // const idFormateur = this.formateurService.getbyidformateur(this.idFormateur); // Obtenez l'ID du formateur connecté depuis le service d'authentification


    // const formateurdata =localStorage.getItem("formateur.idFormateur")
    // if(formateurdata!=null){
    //    this.loadCycles(this.idFormateur);
    //   this.formateurconnecte=JSON.parse(formateurdata);
    // }
  // ngOnInit(): void {

  //   const formateurdata =localStorage.getItem("formateur.idFormateur")
  //   if(formateurdata){
  //     this.formateurconnecte=JSON.parse(formateurdata);
  //     this.loadCycles(this.idFormateur);
  //   }

  //   // const idFormateur = this.getIdFormateurConnecte();
  //   // if (idFormateur !== null) {
  //   //   this.loadCycles(idFormateur);
  //   // } else {
  //   //   console.error('ID de formateur non trouvé');
  //   // }
  // }


  // loadCycles(idFormateur: number): void {
  //   this.formateurService.getCyclesForFormateur(idFormateur)
  //     .subscribe(
  //       cycles => {
  //         this.cycles = cycles;
  //         console.log('Cycles récupérés avec succès', cycles);
  //       },
  //       error => {
  //         console.error('Erreur lors de la récupération des cycles', error);
  //       }
  //     );
  // }


/*
  idFormateur!: number;
  formateurconnecte: Formateur | undefined;
  ngOnInit(): void {
    this.loadCycles(this.idFormateur);
    const formateurdata = localStorage.getItem('formateur.idFormateur');
    if (formateurdata) {
      this.idFormateur = Number(formateurdata); // Convertir la chaîne en nombre
     // this.loadCycles(this.idFormateur);
    } else {
      console.error('ID du formateur non trouvé.');
    }
  }

  loadCycles(idFormateur: number): void {
    this.formateurService.getCyclesForFormateur(idFormateur)
      .subscribe(
        cycles => {
          this.cycles = cycles;
          console.log('Cycles récupérés avec succès', cycles);
        },
        error => {
          console.error('Erreur lors de la récupération des cycles', error);
        }
      );
  }





// ngOnInit(): void {
//   // Récupérer l'ID du formateur à partir des paramètres d'URL

//    this.route.params.subscribe(params => {
//     this.idFormateur = +params['idFormateur']; // Utilisation de l'opérateur + pour conversion en nombre
//     this.getCyclesForFormateur(this.idFormateur);
//   });
// }

// getCyclesForFormateur(idFormateur: number): void {
//   this.formateurService.getcycledeformateur(idFormateur).subscribe((data: CycleEntity[]) => {
//     this.cycles = data;
//   }, error => {
//     console.error('Error fetching cycles', error);
//   });
// }

}
*/
