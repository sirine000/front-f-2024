import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AjouterFormateurComponent } from './ajouter-formateur/ajouter-formateur.component';
import { ListeFormateurComponent } from './liste-formateur/liste-formateur.component';
import { ListeparticipantComponent } from './listeparticipant/listeparticipant.component';
import { AddCycleComponent } from './add-cycle/add-cycle.component';
import { HomeComponent } from './home/home.component';
import { CREERCompteComponent } from './creercompte/creercompte.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import {HttpClientModule} from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModifierCycleComponent } from './modifier-cycle/modifier-cycle.component';
import { ListeCycleComponent } from './liste-cycle/liste-cycle.component';
import { FormateurMenuComponent } from './formateur-menu/formateur-menu.component';
import { ListecycleFormateurComponent } from './listecycle-formateur/listecycle-formateur.component';
import { AjoutercoursComponent } from './ajoutercours/ajoutercours.component';
import { AjoutercycletestComponent } from './ajoutercycletest/ajoutercycletest.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConnecterformateurComponent } from './connecterformateur/connecterformateur.component';
import { CoursComponent } from './cours/cours.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompteFormateurComponent } from './compte-formateur/compte-formateur.component';
import { CertificatComponent } from './certificat/certificat.component';
import { SafePipe } from './safe.pipe';
import { CompteAdminComponent } from './compte-admin/compte-admin.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ListCoursFormateurComponent } from './list-cours-formateur/list-cours-formateur.component';
import { OffreemploiComponent } from './offreemploi/offreemploi.component';
import { ProfilparticipantComponent } from './profilparticipant/profilparticipant.component';
import { CompteparticipantComponent } from './compteparticipant/compteparticipant.component';
import { CycleparticipantComponent } from './cycleparticipant/cycleparticipant.component';
import { CoursparticipantComponent } from './coursparticipant/coursparticipant.component';
import { DemandeInscriptionComponent } from './demande-inscription/demande-inscription.component';
import { ListeCandidatsComponent } from './liste-candidats/liste-candidats.component';
import { ListCertificatComponent } from './list-certificat/list-certificat.component';
import { AjouteroffreComponent } from './ajouteroffre/ajouteroffre.component';
import { ListeoffresComponent } from './listeoffres/listeoffres.component';
import { AccueilformateurComponent } from './accueilformateur/accueilformateur.component';
import { AccparticipantComponent } from './accparticipant/accparticipant.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AdminComponent,
    FooterComponent,
    HeaderComponent,
    AjouterFormateurComponent,
    ListeFormateurComponent,
    ListeparticipantComponent,
    AddCycleComponent,
    HomeComponent,
    CREERCompteComponent,
    HomeHeaderComponent,

    AdminloginComponent,
    ModifierCycleComponent,
    ListeCycleComponent,
    FormateurMenuComponent,
    ListecycleFormateurComponent,
    AjoutercoursComponent,
    AjoutercycletestComponent,
    ConnecterformateurComponent,
    CoursComponent,
    DashboardComponent,
    CompteFormateurComponent,
    CertificatComponent,
    SafePipe,
    CompteAdminComponent,
    ListCoursFormateurComponent,
    OffreemploiComponent,
    ProfilparticipantComponent,
    CompteparticipantComponent,
    CycleparticipantComponent,
    CoursparticipantComponent,
    DemandeInscriptionComponent,
    ListeCandidatsComponent,
    ListCertificatComponent,
    AjouteroffreComponent,
    ListeoffresComponent,
    AccueilformateurComponent,
    AccparticipantComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
