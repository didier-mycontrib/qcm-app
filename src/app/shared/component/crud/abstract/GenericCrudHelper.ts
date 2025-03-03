import { Observable } from "rxjs";

export interface GenericCrudHelper<T,I>{
    onGetAllObjects$() : Observable<T[]>;
    onFindObjectsByCriteria$(criteria:string) : Observable<T[]>;
    onAddObject$(obj:T) : Observable<T>;
    onUpdateObject$(obj:T) : Observable<T>;
    onDeleteObject$(id:I) : Observable<any>;
}