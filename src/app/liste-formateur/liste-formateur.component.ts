import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formateur } from 'src/models/formateur';
import { FormateurService } from '../formateur.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var $: any;
@Component({
  selector: 'app-liste-formateur',
  templateUrl: './liste-formateur.component.html',
  styleUrls: ['./liste-formateur.component.css'],
})
export class ListeFormateurComponent implements OnInit {
  listefor: any[] = [];
  forminput: FormGroup;
  formateurToUpdate!: any;
  constructor(
    private formateurService: FormateurService,
    private router: Router,
    private formateurservice: FormateurService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.forminput = this.fb.group({
      nomEtPrenom: ['', Validators.required],
      tel: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      conf_password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadFormateurs();
  }

  back() {
    this.router.navigate(['./header']);
  }

  gotoajoutercycletest(idFormateur: number) {
    this.router.navigate(['./postcycleetformateur', idFormateur]);
  }

  formateurtodelete!: any;
  confirmdelete(formateur: Formateur) {
    this.formateurtodelete = formateur;
    $('#deleteModal').modal('show');
  }
  closeDelete() {
    $('#deleteModal').modal('hide');
  }
  closeUpdate() {
    $('#updateModal').modal('hide');
  }
  deletec() {
    this.formateurservice
      .supprimerformateur(this.formateurtodelete.id_formateur)
      .subscribe(() => {
        $('#deleteModal').modal('hide');
        this.loadFormateurs();
      });
  }

  openUpdateModal(formateur: any) {
    this.formateurToUpdate = formateur;
    this.forminput.patchValue(formateur);
    $('#updateModal').modal('show');
  }

  updateFormateur() {
    if (this.forminput.valid) {
      this.formateurService
        .modifierformateur(
          this.formateurToUpdate.id_formateur,
          this.forminput.value
        )
        .subscribe(() => {
          console.log('Updated');
          this.snackBar.open('Formateur mis a jour ', 'Fermer', {
            duration: 3000,
          });
          $('#updateModal').modal('hide');
          this.loadFormateurs();
        });
    }
  }

  loadFormateurs() {
    this.formateurservice.getlisteformateur().subscribe((list: any) => {
      this.listefor = list.formateurmap;
    });
  }
  activateFormateur(id: number) {
    this.formateurService.activateFormateur(id).subscribe(
      (formateur: Formateur) => {
        console.log('Formateur activated', formateur);
        this.snackBar.open('Formateur activé', 'Fermer', {
          duration: 3000,
        });
        this.loadFormateurs();
      },
      (error) => {
        console.error('Error activating formateur', error);
      }
    );
  }

  deactivateFormateur(id: number) {
    this.formateurService.deactivateFormateur(id).subscribe(
      (formateur: Formateur) => {
        console.log('Formateur deactivated', formateur);
        this.snackBar.open('Formateur deactivé', 'Fermer', {
          duration: 3000,
        });
        this.loadFormateurs();
      },
      (error) => {
        console.error('Error deactivating formateur', error);
      }
    );
  }
  // !
  //   modifierformateur(){
  //     this.formateurservice.modifierformateur(this.)
  //   }
}
