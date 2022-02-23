import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericRestCrudService } from 'src/generic/service/generic-rest-crud-service';
import { Qcm, ResponseChoices, QcmPerformer, QcmResults } from '../data/qcm';
import { QcmSession } from '../session/qcm-session';
import { Observable } from 'rxjs';
import {  map} from 'rxjs/operators';
import { PostChoicesRequest, PostChoicesResponse } from '../data/postChoicesData';

@Injectable({
  providedIn: 'root'
})
export class QcmService extends GenericRestCrudService<Qcm> {

  public qcmSession : QcmSession = new QcmSession();
 
  constructor(http : HttpClient) { 
    super(http);
  }

  public settingPublicAndPrivateBaseUrl(): void {
    this.publicBaseUrl = "./qcm-api/public/qcm" ; //avec ng serve --proxy-config proxy.conf.json
    this.privateBaseUrl = "./qcm-api/private/qcm" ; //avec ng serve --proxy-config proxy.conf.json
  }

  public findQcmFromCriteria(mode:string|null=null,org:string|null=null,code:string|null=null):Observable<Qcm[]>{
    let endUrlWithCriteria:string="";
    if(mode!=null) endUrlWithCriteria+=`&mode=${mode}`;
    if(org!=null) endUrlWithCriteria+=`&org=${org}`;
    if(code!=null) endUrlWithCriteria+=`&code=${code}`;
    if(endUrlWithCriteria.length>0) endUrlWithCriteria="?"+endUrlWithCriteria.substring(1);
    return this.findObjectsFromCriteria(endUrlWithCriteria);
  }

  public postQcmChoices(qcmId:string,choices: ResponseChoices[],qcmPerformer:QcmPerformer,mode:string|null=null):Observable<PostChoicesResponse>{
    let url : string = "./qcm-api/public/qcm_choices";
    let postChoicesRequest = new  PostChoicesRequest();
    postChoicesRequest.qcmId=qcmId;
    postChoicesRequest.mode=mode||"training";
    postChoicesRequest.choices=choices;
    postChoicesRequest.qcmPerformer=qcmPerformer;
    return this.http.post<PostChoicesResponse>(url ,postChoicesRequest );
    //NB: PostChoicesResponse contains .qcm with .choices
  }


}


@Injectable({
  providedIn: 'root'
})
export class QcmResultsService extends GenericRestCrudService<QcmResults> {

  constructor(http : HttpClient) { 
    super(http);
  }

  public settingPublicAndPrivateBaseUrl(): void {
    this.privateBaseUrl = "./qcm-api/private/qcm_results" ; //avec ng serve --proxy-config proxy.conf.json
    this.publicBaseUrl =  this.privateBaseUrl; //all is private (confidential results)
  }

}
