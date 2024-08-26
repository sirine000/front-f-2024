import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CycleServiceService } from '../cycle-service.service';
import { CycleEntity } from 'src/models/cycle';
import { FormateurService } from '../formateur.service';
import { Observable } from 'rxjs';
import { Formateur } from 'src/models/formateur';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';


declare var $: any;

@Component({
  selector: 'app-liste-cycle',
  templateUrl: './liste-cycle.component.html',
  styleUrls: ['./liste-cycle.component.css'],
})
export class ListeCycleComponent implements OnInit {
  cycletodelete!: CycleEntity;
  cyclee!: CycleEntity;
  formateurs: any[] = [];

  listecycle: any[] = [];
  updateForm!: FormGroup;
  selectedCycle: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private CycleServiceService: CycleServiceService,
    private formateurservice: FormateurService
  ) {}

  ngOnInit(): void {
    this.loadCycles();
    this.loadFormateurs();
    this.updateForm = this.fb.group({
      id: [''],
      nom_cycle_de_formation: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      formateur: ['', Validators.required],
      idFormateur: ['', Validators.required],
    });
  }

  confirmdelete(cycle: CycleEntity): void {
    this.cycletodelete = cycle;
    $('#deleteModal').modal('show');
  }

  closeDelete(): void {
    $('#deleteModal').modal('hide');
  }

  deletec(): void {
    console.log(this.cycletodelete);
    this.CycleServiceService.deletecycle(this.cycletodelete.id).subscribe(
      () => {
        console.log('deleted');
        $('#deleteModal').modal('hide');
        window.location.reload();
      }
    );
  }

  confirmationmodifierCycle(idCycle: number): void {
    this.router.navigate(['./modifiercycle', idCycle]);
  }
  loadFormateurs() {
    this.formateurservice.getlisteformateur().subscribe((list: any) => {
      this.formateurs = list.formateurmap;
    });
  }
  loadCycles(): void {
    this.CycleServiceService.getlistecycle().subscribe(
      (cycles: any) => {
        this.listecycle = cycles || []; // Ensure listecycle is always an array
        console.log(this.listecycle);
        this.loadFormateursForCycles();
      },
      (error) => {
        console.error('Erreur lors du chargement des cycles:', error);
      }
    );
  }

  loadFormateursForCycles(): void {
    if (this.listecycle && this.listecycle.length > 0) {
      this.listecycle.forEach((cyclee: any) => {
        const idFormateur = cyclee.formateurs?.idFormateur ?? null;

        if (idFormateur !== null) {
          this.CycleServiceService.getFormateurById(idFormateur).subscribe(
            (formateur) => {
              cyclee.formateurs = formateur;
            },
            (error) => {
              console.error(
                `Erreur lors du chargement du formateur pour le cycle ${cyclee.id}:`,
                error
              );
            }
          );
        } else {
          console.warn(
            `Cycle ${cyclee.id} n'a pas de formateur associé ou formateur.idFormateur est null`
          );
        }
      });
    } else {
      console.warn('La liste des cycles est vide ou non initialisée');
    }
  }

  openUpdateModal(cycle: any): void {
    this.selectedCycle = cycle;
    this.updateForm.patchValue({
      id: cycle.id,
      nom_cycle_de_formation: cycle.nom_cycle_de_formation,
      description: cycle.description,
      prix: cycle.prix,
      dateDebut: cycle.dateDebut,
      dateFin: cycle.dateFin,
      formateur: cycle.formateur.nomEtPrenom,
      idFormateur: cycle.formateur.id_formateur,
    });
    $('#updateModal').modal('show');
  }
  private snackBar!: MatSnackBar;

  onSubmitUpdate(): void {
    if (this.updateForm.valid) {
      const updatedCycle = {
        id: this.updateForm.value.id,
        nom_cycle_de_formation: this.updateForm.value.nom_cycle_de_formation,
        description: this.updateForm.value.description,
        prix: this.updateForm.value.prix,
        dateDebut: this.updateForm.value.dateDebut,
        dateFin: this.updateForm.value.dateFin,
        formateur: {
          nomEtPrenom: this.updateForm.value.formateur,
          id_formateur: this.updateForm.value.idFormateur,
        },
      };

      this.CycleServiceService.getmodifiercycle(
        updatedCycle.id,
        updatedCycle
      ).subscribe(
        (response) => {
          console.log('Cycle modifié avec succès ', response);
        
          this.closeUpdateModal();
       
          this.loadCycles(); // Reload cycles to reflect changes

        

        },
        (error) => {
          console.error('Erreur lors de la mise à jour du cycle:', error);
        }
      );
    }
  }

  closeUpdateModal(): void {
    $('#updateModal').modal('hide');
  }
}
