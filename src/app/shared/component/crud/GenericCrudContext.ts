import { filter, Observable, of, switchMap, tap, throwError, toArray } from 'rxjs';
import { GenericCrudAbstractContextHelper } from './abstract/GenericCrudAbstractContextHelper';
import { GenericCrudService } from '../../service/generic-crud-service';
import { FilterDef } from '../../data/filter-def';

interface PrepareFormaDataFn{
    ():FormData
}

export class GenericCrudContext<T,I>{

    public requiredRole:string|null=null; //if not null and ("admin" or ...) private URL for "get"
    public availableActions="READ,NEW,ADD,UPDATE,DELETE"; //or just "READ,DELETE" or "DELETE,UPDATE" or "...,...,..."

    public entityTypeName : string="UnknownEntityName"; //ex: "Devise" ou "Contact" ou ...
    
    constructor(public contextHelper : GenericCrudAbstractContextHelper<T,I> ){
        this.entityTypeName = contextHelper.objectHelper().getEntityTypeName();
    } 

    public onUploadFormDataPrepareFn : PrepareFormaDataFn | null =null ; //reference sur fonction facultative
    //utile seulement en mode upload et permettant de contruire l'objet technique FormData à uploader
    //juste avant de déclencher genericCrudService.uploadFormData$(formData); 

    //ALTERNATIVE IMPLEMENTATION: 
    // public onGenericCrudStateChangeHookFn : any =null ;//reference sur fonction facultative de type hook
    //qui pourrait évnetuellement etre appelée à la place de l'envoi de l'évènement genericCrudStateChange

    //filters list to define (when configuring GenericCrudContext)
    public filterDefs : FilterDef[] = [];

    public tabObjects : T[]=[];

    public onGetAllObjects$(genericCrudService : GenericCrudService<T> | null) : Observable<T[]>{
        let crudHelper = this.contextHelper.crudHelper();
        if(crudHelper!=null)
            return crudHelper.onGetAllObjects$();
        else if(genericCrudService)
           return   genericCrudService.getAllObjects$(this.requiredRole);
           //<Observable<T[]>> <any> = temporal workaround for unknown angular library version mismatch (rxjs from d2f-ngx-commons) when npm link (no problem with npm i -s d2f-ngx-commons)
        else return throwError(()=>{err:"onGetAllObjects$ not implemented (no genericCrudService and no crudHelper)"});
    }

    public onFindObjectsByCriteria$(criteria : string , genericCrudService : GenericCrudService<T> | null) : Observable<T[]>{
        let crudHelper = this.contextHelper.crudHelper();
        if(crudHelper!=null)
            return crudHelper.onFindObjectsByCriteria$(criteria);
        else if(genericCrudService)
           return   genericCrudService.findObjectsFromCriteria$(criteria,this.requiredRole);
           //<Observable<T[]>> <any> = temporal workaround for unknown angular library version mismatch (rxjs from d2f-ngx-commons) when npm link (no problem with npm i -s d2f-ngx-commons)
        else return throwError(()=>{err:"onFindObjectsByCriteria$ not implemented (no genericCrudService and no crudHelper)"});
    }

    public applyClientSideFilter( obs: Observable<T[]> , filteringFn:any):Observable<T[]>{
        return obs.pipe(
          switchMap(obj=>obj),
          filter(filteringFn),
          toArray()
        );
    }

    public onFindObjectsWithFilterDefs$(genericCrudService : GenericCrudService<T> | null) : Observable<T[]>{
        let allServerSideFilters = "";
        let clientSideFilters = [];
        for(let fd of this.filterDefs){
            let csf = fd.sumUpClientSide();
            let ssf = fd.sumUpServerSide();
            if(ssf!=""){
                if(allServerSideFilters=="") allServerSideFilters=ssf;
                else allServerSideFilters+=("&"+ssf);
            }
            if(csf!=""){
                clientSideFilters.push(fd);
            }
        }
        
        let serverSideResults : Observable<T[]>= 
           this.onFindObjectsByCriteria$(allServerSideFilters,genericCrudService);

        
        let clientSideResults =serverSideResults;
        
        //code optimisable:
        for(let i=0; i < clientSideFilters.length; i++){
            clientSideResults = 
                this.applyClientSideFilter(clientSideResults,
                    clientSideFilters[i].clientFilterFnWithArg());
        }
     
        return clientSideResults;
    }

    public onAddObject$(obj:T , genericCrudService : GenericCrudService<T> | null) : Observable<T>{
        let crudHelper = this.contextHelper.crudHelper();
        if(crudHelper!=null)
            return crudHelper.onAddObject$(obj);
        else if(genericCrudService)
           return   genericCrudService.postEntityObject$(obj);
        else return throwError(()=>{err:"onAddObject$ not implemented (no genericCrudService and no crudHelper)"});
    }

    public onUpdateObject$(obj:T , genericCrudService : GenericCrudService<T> | null) : Observable<T>{
        let crudHelper = this.contextHelper.crudHelper();
        let id = this.contextHelper.objectHelper().getId(obj);
        if(crudHelper!=null)
            return crudHelper.onUpdateObject$(obj);
        else if(genericCrudService)
           return   genericCrudService.putEntityObject$(id,obj);
        else return throwError(()=>{err:"onUpdateObject$ not implemented (no genericCrudService and no crudHelper)"});
    }

    public onDeleteObject$(id: I , genericCrudService : GenericCrudService<T> | null) : Observable<any>{
        let crudHelper = this.contextHelper.crudHelper();
        if(crudHelper!=null)
            return crudHelper.onDeleteObject$(id);
        else if(genericCrudService)
           return  genericCrudService.deleteEntityObjectServerSide$(id);
        else return throwError(()=>{err:"onDeleteObject$ not implemented (no genericCrudService and no crudHelper)"});
    }

   
}