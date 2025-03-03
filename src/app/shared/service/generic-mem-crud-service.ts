
import { Observable, of, throwError } from "rxjs";
import { GenericCrudService } from "./generic-crud-service";

export abstract class GenericMemCrudService<T>  implements GenericCrudService<T>{

  protected objectsMap : Map<any,T>  = new Map<any,T>() ; //must be set by subclass
  /*
  objFromAny(obj : any) : T{
     return <T> obj;
  }*/

  abstract initMap():void;

  idFromObj(obj : any) : any{
    return obj["code"]; // ou ...
 }

  notNullObj(obj : T | null | undefined) : T{
    return <T> <any> obj;
 }

  constructor() {
    
  }

  public postEntityObject$(obj : T):Observable<T> {
    this.objectsMap.set(this.idFromObj(obj),obj);
    return of(obj);
    }

  public putEntityObject$(id:any,obj : T):Observable<T> {
    //id=this.idFromObj(obj);
      this.objectsMap.set(id,obj);
      return of(obj);
  }

  public getEntityObjectById$(id:any,requiredRole:string|null=null):Observable<T>{
    let obj = this.objectsMap.get(id);
    return of(this.notNullObj(obj));
}

  public getAllObjects$(requiredRole:string|null=null):Observable<T[]>{
      let tab : T[]= [];
      for(let obj of this.objectsMap.values()){
        tab.push(obj);
      }
      return of(tab);
  }

  public findObjectsFromCriteria$(criteriaEndUrl:string,requiredRole:string|null=null):Observable<T[]>{
    return this.getAllObjects$();
}

  public deleteEntityObjectServerSide$(id:any):Observable<any>{
    this.objectsMap.delete(id);
    return of({})
   }

}





