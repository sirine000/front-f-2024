import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DemandeService } from '../demande.service';
import { JobapplicationService } from '../jobapplication.service';

@Component({
  selector: 'app-liste-candidats',
  templateUrl: './liste-candidats.component.html',
  styleUrls: ['./liste-candidats.component.css'],
})
export class ListeCandidatsComponent implements OnInit {
  listefor: any[] = [];
  selectedImageUrl: string | null = null;

  constructor(
    private jobService: JobapplicationService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCandidats();
    console.log(this.listefor);
  }

  loadCandidats() {
    this.jobService.getlisteCandidats().subscribe((list: any) => {
      this.listefor = list.candidats;
    });
  }
  openPdf(pdfData: string) {
    // Convert base64 string to a byte array
    const byteCharacters = atob(pdfData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Create a Blob from the byte array
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Create a URL for the Blob and open it in a new tab
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  }
  openModal(url: string): void {
    this.selectedImageUrl = 'data:image/jpeg;base64,' + url;
    $('#imageModal').modal('show');
  }
}
