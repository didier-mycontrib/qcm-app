import { filter, Observable, of, switchMap, tap, throwError, toArray } from 'rxjs';
import { GenericCrudService } from '../../service/generic-crud-service';
import { FilterDef } from '../../data/filter-def';
import { ObjectHelper } from '../../helper/object-helper';
import { GenericCrudHelper } from './abstract/GenericCrudHelper';

interface PrepareFormaDataFn{
    ():FormData
}

export class GenericCrudContext<T,I> implements GenericCrudHelper<T,I>{

    public requiredRole:string|null=null; //if not null and ("admin" or ...) private URL for "get"
    public availableActions="READ,NEW,ADD,UPDATE,DELETE"; //or just "READ,DELETE" or "DELETE,UPDATE" or "...,...,..."

    //entityTypeName now in objectHelper.classHelper.entityTypeName
    
    constructor(public objectHelper : ObjectHelper<T,I> ,
                public genericCrudService : GenericCrudService<T> | null){
        //...
    } 

    //NB: if this class ,  GenericCrudHelper<T,I> methods will be delegated to genericCrudService
    // in GenericCrudContextWithSpecificHelper sub class,  GenericCrudHelper<T,I> methods will be delegated to a specific crudHelper object

    public onUploadFormDataPrepareFn : PrepareFormaDataFn | null =null ; //reference sur fonction facultative
    //utile seulement en mode upload et permettant de contruire l'objet technique FormData à uploader
    //juste avant de déclencher genericCrudService.uploadFormData$(formData); 

    //ALTERNATIVE IMPLEMENTATION: 
    // public onGenericCrudStateChangeHookFn : any =null ;//reference sur fonction facultative de type hook
    //qui pourrait évnetuellement etre appelée à la place de l'envoi de l'évènement genericCrudStateChange

    //filters list to define (when configuring GenericCrudContext)
    public filterDefs : FilterDef[] = [];

    public tabObjects : T[]=[];

    public onGetAllObjects$() : Observable<T[]>{
      if(this.genericCrudService)
           return this.genericCrudService.getAllObjects$(this.requiredRole);
        else return throwError(()=>{err:"onGetAllObjects$ not implemented (no genericCrudService in GenericCrudContext or no crudHelper in GenericCrudContextWithSpecificHelper)"});
    }

    public onFindObjectsByCriteria$(criteria : string ) : Observable<T[]>{
        if(this.genericCrudService)
           return   this.genericCrudService.findObjectsFromCriteria$(criteria,this.requiredRole);
        else return throwError(()=>{err:"onFindObjectsByCriteria$ not implemented (no genericCrudService in GenericCrudContext or no crudHelper in GenericCrudContextWithSpecificHelper)"});
    }

    public applyClientSideFilter( obs: Observable<T[]> , filteringFn:any):Observable<T[]>{
        return obs.pipe(
          switchMap(obj=>obj),
          filter(filteringFn),
          toArray()
        );
    }

    public onFindObjectsWithFilterDefs$() : Observable<T[]>{
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
           this.onFindObjectsByCriteria$(allServerSideFilters);

        
        let clientSideResults =serverSideResults;
        
        //code optimisable:
        for(let i=0; i < clientSideFilters.length; i++){
            clientSideResults = 
                this.applyClientSideFilter(clientSideResults,
                    clientSideFilters[i].clientFilterFnWithArg());
        }
     
        return clientSideResults;
    }

    public onAddObject$(obj:T ) : Observable<T>{
        if(this.genericCrudService)
           return   this.genericCrudService.postEntityObject$(obj);
        else return throwError(()=>{err:"onAddObject$ not implemented (no genericCrudService in GenericCrudContext or no crudHelper in GenericCrudContextWithSpecificHelper)"});
    }

    public onUpdateObject$(obj:T) : Observable<T>{
        let id = this.objectHelper.getId(obj);
        if(this.genericCrudService)
           return   this.genericCrudService.putEntityObject$(id,obj);
        else return throwError(()=>{err:"onUpdateObject$ not implemented (no genericCrudService in GenericCrudContext or no crudHelper in GenericCrudContextWithSpecificHelper)"});
    }

    public onDeleteObject$(id: I ) : Observable<any>{
       if(this.genericCrudService)
           return  this.genericCrudService.deleteEntityObjectServerSide$(id);
        else 
           return throwError(()=>{err:"onDeleteObject$ not implemented (no genericCrudService in GenericCrudContext or no crudHelper in GenericCrudContextWithSpecificHelper)"});
    }

   
}