/*
AbstractGenSubFormData est une vision abstraite
des données du sous formulaire de saisie (spécifique)
.mode ="newOne" or "existingOne"
.obj = objet temporaire à saisir
*/

export interface AbstractGenSubFormData {
    obj : object;
    mode : string;
}