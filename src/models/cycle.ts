import { Formateur } from "./formateur";

export interface CycleEntity {
  id: number;
  nomCycleDeFormation: string;
  description: String;
  prix: number;
  dateFin: Date;
  dateDebut: Date;
  formateurs: Formateur; // Updated to be a list of Formateur
}
