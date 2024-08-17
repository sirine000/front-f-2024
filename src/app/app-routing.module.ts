import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AjouterFormateurComponent } from './ajouter-formateur/ajouter-formateur.component';
import { ListeFormateurComponent } from './liste-formateur/liste-formateur.component';
import { ListeparticipantComponent } from './listeparticipant/listeparticipant.component';
import { AddCycleComponent } from './add-cycle/add-cycle.component';
import { HomeComponent } from './home/home.component';
import { CREERCompteComponent } from './creercompte/creercompte.component';
import { HomeHeaderComponent } from './home-header/home-header.component';

import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ModifierCycleComponent } from './modifier-cycle/modifier-cycle.component';
import { ListeCycleComponent } from './liste-cycle/liste-cycle.component';
import { FormateurMenuComponent } from './formateur-menu/formateur-menu.component';
import { ListecycleFormateurComponent } from './listecycle-formateur/listecycle-formateur.component';
import { AjoutercoursComponent } from './ajoutercours/ajoutercours.component';
import { AjoutercycletestComponent } from './ajoutercycletest/ajoutercycletest.component';
import { ConnecterformateurComponent } from './connecterformateur/connecterformateur.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompteFormateurComponent } from './compte-formateur/compte-formateur.component';
import { CertificatComponent } from './certificat/certificat.component';
import { CompteAdminComponent } from './compte-admin/compte-admin.component';
import { AdminGuard } from './adminauth.guard';
import { FormateurAuthGuard } from './formateur-auth.guard';
import { ListCoursFormateurComponent } from './list-cours-formateur/list-cours-formateur.component';
import { OffreemploiComponent } from './offreemploi/offreemploi.component';
import { CompteparticipantComponent } from './compteparticipant/compteparticipant.component';
import { CycleparticipantComponent } from './cycleparticipant/cycleparticipant.component';
import { CoursparticipantComponent } from './coursparticipant/coursparticipant.component';
import { DemandeInscriptionComponent } from './demande-inscription/demande-inscription.component';
import { ListeCandidatsComponent } from './liste-candidats/liste-candidats.component';
import { ListCertificatComponent } from './list-certificat/list-certificat.component';
import { AjouteroffreComponent } from './ajouteroffre/ajouteroffre.component';
import { ListeoffresComponent } from './listeoffres/listeoffres.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'admins', component: HeaderComponent },
  { path: 'ajouterformateur', component: AjouterFormateurComponent },
  { path: 'listeFormateur', component: ListeFormateurComponent },
  { path: 'listepar', component: ListeparticipantComponent },
  {
    path: 'postcycleetformateur',
    component: AddCycleComponent,
    canActivate: [FormateurAuthGuard],
  },
  {
    path: 'ajouterCycle',
    component: AddCycleComponent,
    canActivate: [AdminGuard],
  },

  // {path:"ajoutercycle/:id_formateur" , component:AddCycleComponent},
  { path: 'home', component: HomeComponent },
  { path: 'homeheader', component: HomeHeaderComponent },
  { path: 'creercompte', component: CREERCompteComponent },
  { path: 'adminlogin', component: AdminloginComponent },
  { path: 'seconnecterformateur', component: ConnecterformateurComponent },

  {
    path: 'modifiercycle/:idCycle',
    component: ModifierCycleComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'listecycle',
    component: ListeCycleComponent,
    canActivate: [AdminGuard],
  },

  {
    path: 'formateurMenu',
    component: FormateurMenuComponent,
    canActivate: [FormateurAuthGuard],
  },
  {
    path: 'formateurscycles',
    component: ListecycleFormateurComponent,
    canActivate: [FormateurAuthGuard],
  },
  {
    path: 'inserercyclecours/:idCycle',
    component: AjoutercoursComponent,
    canActivate: [FormateurAuthGuard],
  },
  { path: 'offreemploi', component: OffreemploiComponent },
  {
    path: 'listcoursformateur',
    component: ListCoursFormateurComponent,
    canActivate: [FormateurAuthGuard],
  },
  //{path:"getcycleetformateur/:idFormateur",component:AjoutercycletestComponent}
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'compteFormateur',
    component: CompteFormateurComponent,
    canActivate: [FormateurAuthGuard],
  },
  {
    path: 'compteAdmin',
    component: CompteAdminComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'liste-candidats',
    component: ListeCandidatsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'demande-inscription',
    component: DemandeInscriptionComponent,
    canActivate: [AdminGuard],
  },

  { path: 'list-certificat', component: ListCertificatComponent },
  {
    path: 'certificat/:nom/:prenom/:cycle/:date',
    component: CertificatComponent,
  },
  { path: 'cycleparticipant', component: CycleparticipantComponent },

  { path: 'coursParticipant', component: CoursparticipantComponent },
  { path: 'compteParticipant', component: CompteparticipantComponent },
  {
    path: 'ajouterOffre',
    component: AjouteroffreComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'listOffres',
    component: ListeoffresComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
