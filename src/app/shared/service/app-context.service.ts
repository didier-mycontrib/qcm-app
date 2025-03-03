import { Injectable } from '@angular/core';

/*
service central pour stocker/mémoriser et récupérer des données
liées au contexte global de l'application (mais pas de niveau UserSession)
Ex: données en cache : liste de Pays , ...
*/

@Injectable({
  providedIn: 'root'
})
export class AppContextService {

  //En construction , ...

  protected objectsMap : Map<string,any>  = new Map<string,any>() ;

  storeKeyValue(key:string,value: unknown):void{
  }

  retreiveValue(key:string,defaultValue: any):any{
  }

  constructor() { }
}
