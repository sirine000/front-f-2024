import { Component } from '@angular/core';
import { Formateur } from 'src/models/formateur';

@Component({
  selector: 'app-accueilformateur',
  templateUrl: './accueilformateur.component.html',
  styleUrls: ['./accueilformateur.component.css']
})
export class AccueilformateurComponent {
  formateurconnecte!: Formateur;
  ngOnInit(): void {
    const formateurdata = localStorage.getItem('formateur');
    if (formateurdata) {
      this.formateurconnecte = JSON.parse(formateurdata);
    }
  }
}
