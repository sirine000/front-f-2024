import { Component, OnInit } from '@angular/core';
import { FormateurService } from '../formateur.service';
import { CoursServiceService } from '../cours-service.service';

@Component({
  selector: 'app-list-cours-formateur',
  templateUrl: './list-cours-formateur.component.html',
  styleUrls: ['./list-cours-formateur.component.css'],
})
export class ListCoursFormateurComponent implements OnInit {
  coursList: any[] = [];
  message: string = '';

  constructor(private formateurService: FormateurService,private coursService:CoursServiceService) {}

  ngOnInit(): void {
    this.loadCoursForConnectedFormateur();
  }
  getFormateurIdFromLocalStorage(): number | null {
    const formateurJson = localStorage.getItem('formateur');
    if (formateurJson) {
      try {
        const formateur = JSON.parse(formateurJson);
        return formateur.id_formateur; // Replace 'id' with the actual property name if different
      } catch (error) {
        console.error('Error parsing formateur from local storage:', error);
      }
    }
    return null;
  }

  loadCoursForConnectedFormateur(): void {
    const formateurId = this.getFormateurIdFromLocalStorage();
    console.log(formateurId);
    if (formateurId) {
      this.formateurService.getCoursByFormateur(formateurId).subscribe(
        (data: any[]) => {
          this.coursList = data;
          if (data) {
            console.log(data);
          }
        },
        (error: any) => {
          this.message = 'Erreur lors du chargement des cours.';
          console.error(error);
        }
      );
    } else {
      this.message = 'Formateur ID non trouvé.';
    }
  }

  getFileName(filePath: string): string {
    return filePath.split('\\').pop() || filePath.split('/').pop() || filePath;
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




  deleteCours(id: number): void {
    if (confirm('Vous êtes sûr de vouloir supprimer tous?')) {
      this.coursService.deleteCours(id).subscribe({
        next: () => {
          console.log('Course deleted successfully');
          window.location.reload();
          // Implement logic to update your view, such as refreshing the list of courses
        },
        error: (err) => {
          console.error('Error deleting course:', err);
        }
      });
      

    }
  }

//   deleteFile(id: number, fileIndex: number): void {
//     if (confirm('Are you sure you want to delete this course?')) {
//     this.coursService.deleteFileFromCourse(id, fileIndex).subscribe({
//         next: () => {
//             console.log(`File ${fileIndex + 1} from course ${id} deleted successfully`);
//             // Refresh the course list or update the UI as needed
//         },
//         error: (err) => {
//             console.error('Error deleting file:', err);
//         }
//     });
//   }
// }


// deleteFile(id: number, fileIndex: number): void {
//   const fileName = this.coursList.find(cours => cours.id === id)?.fileContents[fileIndex];
//   if (fileName) {
//     this.coursService.deleteFile(id, fileName).subscribe(
//       () => {
//         this.message = 'Fichier supprimé avec succès';
//         this.loadCoursForConnectedFormateur(); // Reload courses to reflect changes
//       },
//       error => {
//         this.message = 'Erreur lors de la suppression du fichier: ' + error.message;
//       }
//     );
//   }
// }
}
