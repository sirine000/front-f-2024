import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificat.component.html',
  styleUrls: ['./certificat.component.css'],
})
export class CertificatComponent implements OnInit {
  userName: string = 'Cyrine Metoui'; // Example user name
  nom!: string;
  prenom!: string;
  cycle!: string;
  date!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.nom = this.route.snapshot.paramMap.get('nom') || '';
    this.prenom = this.route.snapshot.paramMap.get('prenom') || '';

    this.cycle = this.route.snapshot.paramMap.get('cycle') || '';
    this.date = this.route.snapshot.paramMap.get('date') || '';
  }
  generateCertificate() {
    const certificateElement = document.getElementById('certificate');
    if (certificateElement) {
      html2canvas(certificateElement, { useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 10, 10, 280, 200); // Adjust dimensions as needed
        pdf.save('certificate.pdf');
      });
    }
  }
}


