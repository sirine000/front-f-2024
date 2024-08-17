import { Component, OnInit } from '@angular/core';
import { InscriptionService } from '../inscription.service';
import { CoursServiceService } from '../cours-service.service';

@Component({
  selector: 'app-coursparticipant',
  templateUrl: './coursparticipant.component.html',
  styleUrls: ['./coursparticipant.component.css'],
})
export class CoursparticipantComponent implements OnInit {
  userEmail!: string;
  validCycles!: any[];
  displayCourses: boolean = false;
  selectedCourses: any[] = [];

  constructor(
    private commandService: InscriptionService,
    private coursService: CoursServiceService
  ) {}

  ngOnInit() {
    const participant = JSON.parse(localStorage.getItem('participant') || '');
    this.userEmail = participant.email;
    this.loadCourses();
  }

  loadCourses(): void {
    console.log(this.userEmail);
    this.commandService.loadValidCours(this.userEmail).subscribe({
      next: (cycles) => {
        this.validCycles = cycles;
        this.displayCourses = this.validCycles.length > 0;
        console.log(cycles);
      },
      error: (err) => {
        console.error('Error loading courses:', err);
      },
    });
  }
  handleCourseClick(cycleId: number): void {
    this.coursService.getCoursesByCycleId(cycleId).subscribe({
      next: (courses) => {
        this.selectedCourses = courses;
        console.log('Courses for cycle', cycleId, ':', courses);
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      },
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
  
}
