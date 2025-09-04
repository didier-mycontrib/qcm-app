import { Observable } from "rxjs";

export interface GenericCrudService<T>{
    postEntityObject$(obj : T):Observable<T>
    putEntityObject$(id:any,obj : T):Observable<T>
    getEntityObjectById$(id:any,requiredRole:string|null):Observable<T>
    getAllObjects$(requiredRole:string|null):Observable<T[]>
    findObjectsFromCriteria$(criteriaEndUrl:string,requiredRole:string|null):Observable<T[]>
    deleteEntityObjectServerSide$(id:any):Observable<any>
}

export interface GenericWithUploadService{
    uploadFormData$(formData : FormData):Observable<any> 
}