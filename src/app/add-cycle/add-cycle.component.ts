import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CycleEntity } from 'src/models/cycle';
import { CycleServiceService } from '../cycle-service.service';
import { error } from 'jquery';
import { Formateur } from 'src/models/formateur';
import { NgClass } from '@angular/common';
import { FormateurService } from '../formateur.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-add-cycle',
  templateUrl: './add-cycle.component.html',
  styleUrls: ['./add-cycle.component.css'],
})
export class AddCycleComponent implements OnInit {
  idFormateur!: number;
  formateurs: any[] = [];
  liste: Formateur[] = [];
  forminput!: FormGroup;
  //listeFormateurs :Formateur[]=[];
  listeForm: any[] = [];
  formSubmitted = false;
  submissionMessage = '';
  // cycle:string[] = [];

  constructor(
    private router: Router,
    private FormateurService: FormateurService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cycleService: CycleServiceService
  ) {}

  // cycles: any ={
  //     idCycle:-1,
  //     nomCycleDeFormation:"",
  //     description:"",
  //     prix:0,
  //      dateDebut:new Date(),
  //     dateFin:new Date(),

  //   //   this.dateDebut = this.formatDate(this.cycles.dateDebut);
  //   // this.cycles.dateFin = this.formatDate(this.cycles.dateFin);

  //   };

  // cycles!:CycleEntity;

  // private formatDate(date: Date): string {
  //   return date.toISOString().split('T')[0]; // Format 'yyyy-MM-dd'
  // }

  ngOnInit(): void {
    this.loadFormateurs();
    //this.selectedvalue=this.dropdown?.nativeElement.value;
    this.forminput = this.formBuilder.group({
      nomCycleDeFormation: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      idFormateur: [null, Validators.required], // Use 'idFormateur'
    });
  }

  // @ViewChild('dropdown', {static: false}) dropdown?:ElementRef;
  // selectedvalue?:string;
  /*loadFormateurs() {

  this.CycleServiceService.getlisteformteurss().subscribe(
    (selectedvalue) => {
      this.listeForm = selectedvalue;
      if (this.listeForm.length > 0) {
        this.forminput.patchValue({ nomEtPrenom: this.listeForm[0].idFormateur});

     }
    },
    (error) => {
      console.error('Erreur lors du chargement des formateurs:', error);
    }
  );
}
*/

  loadFormateurs() {
    this.FormateurService.getlisteformateur().subscribe(
      (formateur: any) => {
        this.formateurs = formateur.formateurmap;
      },
      (error) => {
        console.error('Erreur lors du chargement des formateurs:', error);
      }
    );
  }

  ajouter() {
    if (this.forminput.valid) {
      const formValue = this.forminput.value;
      console.log('Form Value:', formValue); // Add this line to debug

      const cyclee: any = {
        nomCycleDeFormation: formValue.nomCycleDeFormation,
        description: formValue.description,
        prix: formValue.prix,
        dateDebut: formValue.dateDebut,
        dateFin: formValue.dateFin,
        idFormateur: formValue.idFormateur.toString(), // Ensure this is a String
      };

      this.cycleService.ajouterCycle(cyclee).subscribe(
        (response: any) => {
          console.log('Cycle ajouté avec succès:', response);
          this.resetForm();
          this.submissionMessage = 'Formulaire enregistré avec succès !';
          this.formSubmitted = true;
        },
        (error) => {
          console.error('Erreur lors de la soumission du formulaire:', error);
          this.submissionMessage =
            'Erreur lors de la soumission du formulaire !';
          this.formSubmitted = true;
        }
      );
    } else {
      console.error(
        'Formulaire invalide. Veuillez remplir tous les champs correctement.'
      );
      this.submissionMessage = 'Le formulaire est invalide !';
      this.formSubmitted = true;
    }
  }

  resetForm() {
    this.forminput.reset();
    this.formSubmitted = true;
    this.submissionMessage = '';
  }

  back() {
    this.router.navigate(['./header']);
  }

  confirmdelete() {
    $('#deleteModal').modal('show');
  }
  closeDelete() {
    $('#deleteModal').modal('hide');
  }
}
