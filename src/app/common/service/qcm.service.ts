import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Qcm, ResponseChoices, QcmPerformer, QcmResults } from '../data/qcm';
import { QcmSession } from '../session/qcm-session';
import { Observable } from 'rxjs';
import {  map} from 'rxjs/operators';
import { PostChoicesRequest, PostChoicesResponse } from '../data/postChoicesData';
import { GenericRestCrudService } from '../../shared/service/generic-rest-crud-service';


@Injectable({
  providedIn: 'root'
})
export class QcmService extends GenericRestCrudService<Qcm> {

  public qcmSession : QcmSession = new QcmSession();
 
  constructor() { 
    super();
  }

  public override settingEntitiesNameAndApiBaseUrl(): void {
    this.apiBaseUrl = "/qcm-api/v1";
    this.entitiesName = "qcms";
    console.log("apiBaseUrl="+this.apiBaseUrl);
    console.log("entitiesName="+this.entitiesName);
  }


  public findQcmFromCriteria(mode:string|null=null,org:string|null=null,code:string|null=null):Observable<Qcm[]>{
    let endUrlWithCriteria:string="";
    if(mode!=null) endUrlWithCriteria+=`&mode=${mode}`;
    if(org!=null) endUrlWithCriteria+=`&org=${org}`;
    if(code!=null) endUrlWithCriteria+=`&code=${code}`;
    if(endUrlWithCriteria.length>0) endUrlWithCriteria="?"+endUrlWithCriteria.substring(1);
    
    return this.findObjectsFromCriteria$(endUrlWithCriteria);
  }

  public postQcmChoices(qcmId:string,choices: ResponseChoices[],qcmPerformer:QcmPerformer,mode:string|null=null):Observable<PostChoicesResponse>{
    let url : string = "/qcm-api/v1/public/qcm_choices";
    let postChoicesRequest = new  PostChoicesRequest();
    postChoicesRequest.qcmId=qcmId;
    postChoicesRequest.mode=mode||"training";
    postChoicesRequest.choices=choices;
    postChoicesRequest.qcmPerformer=qcmPerformer;
    return this.http.post<PostChoicesResponse>(url ,postChoicesRequest );
    //NB: PostChoicesResponse contains .qcm with .choices
  }

  public getQcmWithSolutionsById$(qcmId:string):Observable<Qcm>{
    //Nb: /public/qcm without solutions , /private/qcm with solutions
    let url : string = `/qcm-api/v1/private/qcms/${qcmId}`;
    return this.http.get<Qcm>(url );
  }



}


