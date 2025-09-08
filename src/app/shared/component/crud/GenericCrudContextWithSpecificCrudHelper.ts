import { Observable, throwError } from "rxjs";
import { ObjectHelper } from "../../helper/object-helper";
import { GenericCrudHelper } from "./abstract/GenericCrudHelper";
import { GenericCrudContext } from "./GenericCrudContext";

export class GenericCrudContextWithSpecificHelper<T,I> extends GenericCrudContext<T,I>{
   crudHelper : GenericCrudHelper<T,I>

   constructor(objectHelper:ObjectHelper<T,I>,crudHelper : GenericCrudHelper<T,I>){
    super(objectHelper,null);
    this.crudHelper=crudHelper;
   }

    public override onGetAllObjects$() : Observable<T[]>{
        return this.crudHelper.onGetAllObjects$();
    }
   
    public overrideonFindObjectsByCriteria$(criteria : string ) : Observable<T[]>{
        return  this.crudHelper.onFindObjectsByCriteria$(criteria);
    }

    public override onAddObject$(obj:T ) : Observable<T>{
        return this.crudHelper.onAddObject$(obj);
    }
       
    public override onUpdateObject$(obj:T ) : Observable<T>{
        let id = this.objectHelper.getId(obj);
        return this.crudHelper.onUpdateObject$(obj);
    }
       
    public override onDeleteObject$(id: I ) : Observable<any>{
        return this.crudHelper.onDeleteObject$(id);
    }
       
}