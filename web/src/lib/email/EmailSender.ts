export type ContactEmailPayload = {
  nom: string;
  email: string;
  telephone?: string;
  etablissement: string;
  segment: string;
  nbEtablissements?: number;
  message: string;
};

export interface EmailSender {
  send(payload: ContactEmailPayload): Promise<void>;
}
