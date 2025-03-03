import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { GenericCrudService } from './generic-crud-service';
import { inject } from '@angular/core';

export abstract class GenericRestCrudService<T> implements GenericCrudService<T> {

  //must be set by subclass in abstract settingEntitiesNameAndApiBaseUrl()
  protected apiBaseUrl ="????myApi????"; //must be set by subclass (avec ng serve --proxy-config proxy.conf.json)
  protected entitiesName ="????entities????"; // must be set by subclass (ex: "products" or "devises" or ...)

  //may be redefined by subclass in definePublicAndPrivateBaseUrl():
  protected publicApiBaseUrl = ""; // `${this.apiBaseUrl}/public` by default
  protected privateApiBaseUrl = ""; //`${this.apiBaseUrl}/private`  by default
  protected publicBaseUrl = ""; //`${this.publicApiBaseUrl}/${this.entitiesName}` by default
  protected privateBaseUrl = ""; //`${this.privateApiBaseUrl}/${this.entitiesName}` by default

  protected http = inject(HttpClient);

  public abstract settingEntitiesNameAndApiBaseUrl():void ;

  public definePublicAndPrivateBaseUrl():void {
    this.publicApiBaseUrl = `${this.apiBaseUrl}/public` ; //may be redefined by subclass
    this.privateApiBaseUrl = `${this.apiBaseUrl}/private` ; //may be redefined by subclass
    this.publicBaseUrl = `${this.publicApiBaseUrl}/${this.entitiesName}` ; //may be redefined by subclass
    this.privateBaseUrl =`${this.privateApiBaseUrl}/${this.entitiesName}` ; //may be redefined by subclass
    console.log("publicApiBaseUrl="+this.publicApiBaseUrl);
    console.log("privateApiBaseUrl="+this.privateApiBaseUrl);
    console.log("publicBaseUrl="+this.publicBaseUrl);
    console.log("privateBaseUrl="+this.privateBaseUrl);
  }

  constructor() {
    this.settingEntitiesNameAndApiBaseUrl();//abstract , should be implemented !!!
    this.definePublicAndPrivateBaseUrl();//may be override (if necessary)
  }

  public postEntityObject$(obj : T):Observable<T> {
    let url  = this.privateBaseUrl ;
    return this.http.post<T>(url  ,obj );
    }

  public putEntityObject$(id:any,obj : T):Observable<T> {
      let url = `${this.privateBaseUrl}/${id}?v=true`;
      return this.http.put<T>(url ,obj );
  }

  public getEntityObjectById$(id:any,requiredRole:string|null=null):Observable<T>{
    let  url = (requiredRole==null)?`${this.publicBaseUrl}/${id}`:`${this.privateBaseUrl}/${id}`
    return this.http.get<T>(url );
}

  public getAllObjects$(requiredRole:string|null=null):Observable<T[]>{
     let  url = (requiredRole==null)?`${this.publicBaseUrl}`:`${this.privateBaseUrl}`
      return this.http.get<T[]>(url );
  }

  public findObjectsFromCriteria$(criteriaEndUrl:string,requiredRole:string|null=null):Observable<T[]>{
    let  url : string ;
    if(!criteriaEndUrl.startsWith("?")) 
      criteriaEndUrl="?"+criteriaEndUrl;
    if(requiredRole==null){
      url = this.publicBaseUrl + criteriaEndUrl;
    }else{
      url =  this.privateBaseUrl + criteriaEndUrl; //encore améliorable
    }
    return this.http.get<T[]>(url );
}

  public deleteEntityObjectServerSide$(id:any):Observable<any>{
    //console.log("deleting EntityObject of id = " + id );
    let  url = `${this.privateBaseUrl}/${id}`
    //console.log("deleteUrl= " + url );
    return this.http.delete(url);
   }

}


export abstract class GenericRestCrudServiceWithUpload<T>
   extends GenericRestCrudService<T> {

    protected uploadBaseUrl = "" ; //must be set by subclass

    constructor() {
      super();
      this.settingUploadBaseUrl();
    }
    public abstract settingUploadBaseUrl():void ;

    public uploadFormData$(formData : FormData):Observable<T> {
      return this.http.post<T>(this.uploadBaseUrl ,formData );
      }
}


