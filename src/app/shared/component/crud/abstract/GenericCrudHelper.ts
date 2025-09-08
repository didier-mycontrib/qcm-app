import { Observable } from "rxjs";

/*
interface of optional part of GenericCrudContext
only useful for specific implementation without GenericCrudService (memory or rest or rest+upload)
*/

export interface GenericCrudHelper<T,I>{
    onGetAllObjects$() : Observable<T[]>;
    onFindObjectsByCriteria$(criteria:string) : Observable<T[]>;
    onAddObject$(obj:T) : Observable<T>;
    onUpdateObject$(obj:T) : Observable<T>;
    onDeleteObject$(id:I) : Observable<any>;
}