import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";

export abstract class GenericRestCrudService<T> {

  protected publicBaseUrl : string | null = null ; //must be set by subclass
  protected privateBaseUrl : string | null = null ; //avec ng serve --proxy-config proxy.conf.json

  public abstract settingPublicAndPrivateBaseUrl():void ;

  constructor(protected http : HttpClient) {
    this.settingPublicAndPrivateBaseUrl();
  }

  public postEntityObject(obj : T):Observable<T> {
    let url : string = this.privateBaseUrl as string;
    return this.http.post<T>(url  ,obj );
    }

  public putEntityObject(obj : T):Observable<T> {
      let url : string = this.privateBaseUrl  as string;
      return this.http.put<T>(url ,obj );
  }

  public getEntityObjectById(id:any,requiredRole:string|null=null):Observable<T>{
    let  url : string ;
      if(requiredRole==null){
        url = this.publicBaseUrl + "/" + id;
      }else{
        url =  this.privateBaseUrl + "/" + id; //encore améliorable
      }
    return this.http.get<T>(url );
}

  public getAllObjects(requiredRole:string|null=null):Observable<T[]>{
      let  url : string ;
      if(requiredRole==null){
        url = this.publicBaseUrl as string;
      }else{
        url =  this.privateBaseUrl as string; //encore améliorable
      }
      return this.http.get<T[]>(url );
  }

  public findObjectsFromCriteria(criteriaEndUrl:string,requiredRole:string|null=null):Observable<T[]>{
    let  url : string ;
    if(requiredRole==null){
      url = this.publicBaseUrl + criteriaEndUrl;
    }else{
      url =  this.privateBaseUrl + criteriaEndUrl; //encore améliorable
    }
    return this.http.get<T[]>(url );
}

  public deleteEntityObjectServerSide(id:any):Observable<any>{
    //console.log("deleting EntityObject of id = " + id );
    let  url : string = this.privateBaseUrl + "/"  + id;
    //console.log("deleteUrl= " + url );
    return this.http.delete(url);
   }

}


export abstract class GenericRestCrudServiceWithUpload<T>
   extends GenericRestCrudService<T> {

    protected uploadBaseUrl = "" ; //must be set by subclass

    constructor(http : HttpClient) {
      super(http);
      this.settingUploadBaseUrl();
    }
    public abstract settingUploadBaseUrl():void ;

    public uploadFormData(formData : FormData):Observable<T> {
      return this.http.post<T>(this.uploadBaseUrl ,formData );
      }
}


