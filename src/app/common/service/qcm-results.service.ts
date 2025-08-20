import { Injectable } from '@angular/core';
import { QcmResults } from '../data/qcm';
import { GenericRestCrudService } from '../../shared/service/generic-rest-crud-service';

@Injectable({
  providedIn: 'root'
})
export class QcmResultsService extends GenericRestCrudService<QcmResults> {

  constructor() { 
    super();
  }

  public override settingEntitiesNameAndApiBaseUrl(): void {
    this.apiBaseUrl = "/qcm-api/v1";
    this.entitiesName = "qcm_results";
    console.log("apiBaseUrl="+this.apiBaseUrl);
    console.log("entitiesName="+this.entitiesName);
  }

  /*
  public override definePublicAndPrivateBaseUrl():void {
    this.publicApiBaseUrl = `${this.apiBaseUrl}/public` ; //may be redefined by subclass
    this.privateApiBaseUrl = `${this.apiBaseUrl}/private` ; //may be redefined by subclass
    this.publicBaseUrl = `${this.publicApiBaseUrl}/${this.entitiesName}` ; //may be redefined by subclass
    this.privateBaseUrl =`${this.privateApiBaseUrl}/${this.entitiesName}` ; //may be redefined by subclass
    console.log("publicApiBaseUrl="+this.publicApiBaseUrl);
    console.log("privateApiBaseUrl="+this.privateApiBaseUrl);
    console.log("publicBaseUrl="+this.publicBaseUrl);
    console.log("privateBaseUrl="+this.privateBaseUrl);
  }*/

}
