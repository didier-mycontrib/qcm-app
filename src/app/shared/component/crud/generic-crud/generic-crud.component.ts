import { ChangeDetectorRef, Component,  inject,  input, InputSignal, OnInit, output, signal, TemplateRef } from '@angular/core';
import { GenericCrudContext } from '../GenericCrudContext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GenericCrudService, GenericWithUploadService } from '../../../service/generic-crud-service';
import { cloneObject, copyObjectProperties, messageFromError } from '../../../util/util';
import { GenCrudTableComponent } from '../gen-crud-table/gen-crud-table.component';
import { GenCrudFormComponent } from '../gen-crud-form/gen-crud-form.component';
import { GenCrudParamComponent } from '../gen-crud-param/gen-crud-param.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../generic/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';

export interface GenericCrudState{
  selectedObject : any, //selected existing entity or null
  objectTemp : any, //temp entity to edit 
  mode: string, // "newOne" or "exitingOne"
  lastAction: string|null // ex: onNew , onSelected , ...
}

@Component({
  selector: 'generic-crud',
  imports:[CommonModule,FormsModule,
    GenCrudTableComponent,
    GenCrudFormComponent,GenCrudParamComponent],
  templateUrl: './generic-crud.component.html',
  styleUrls: ['./generic-crud.component.scss']
})
export class GenericCrudComponent implements OnInit {

   private changeDetectorRef = inject(ChangeDetectorRef);

  public genericCrudContext  = input<GenericCrudContext<any,any> | null>(null);

  //genericCrudService now in genericCrudContext
  genericCrudService(){
    return this.genericCrudContext()!.genericCrudService;
  }
  
  classHelper(){
    return this.genericCrudContext()!.objectHelper.classHelper;
  }

  objectHelper(){
    return this.genericCrudContext()!.objectHelper;
  }

  public optionalSpecificSubFormTemplateRef = input<TemplateRef<any>>();

  //this.genericCrudContext?.tabObjects of type T[]

  selectedObject : any ;
 

  //[(ngModel)]="deviseTemp.code" , ....
  objectTemp : any = null;
  
  //collectionMessage /*: string*/ ="";
  //formMessage/*: string*/ ="";
  collectionMessage /*: string*/ =signal("");
  formMessage/*: string*/ =signal("");
  
  mode  = "newOne"; //or "exitingOne"

  subFormCompRef : any = input<any>();

  genericCrudStateChange = output<GenericCrudState>();//event for special complex case

  withUpload=input(false);

 
  constructor() {
   }

  onReload(){
    this.genericCrudContext()!.onFindObjectsWithFilterDefs$()
    .subscribe(
      { next: (tabObjects)=>{ this.collectionMessage.set(this.classHelper().entityName + " reloaded");
                              if(this.genericCrudContext())
                                 this.genericCrudContext()!.tabObjects = tabObjects; 
                              this.changeDetectorRef.markForCheck(); } ,
       error: (err)=>{ this.collectionMessage.set(messageFromError(err,"erreur: echec rechargement liste via filtre")); }
    });
    this.objectTemp=this.objectHelper().buildEmptyObject();
  }

  ngOnInit(): void {
    console.log("GenericCrudComponent.ngOnInit(): filterDefs="+JSON.stringify(this.genericCrudContext()?.filterDefs));
    if(this.genericCrudContext()==null)return;
    this.genericCrudContext()!.onGetAllObjects$()
    .subscribe(
      { next: (tabObjects)=>{ //console.log("GenericCrudComponent.ngOnInit , tabObjects="+JSON.stringify(tabObjects))
                              //console.log("GenericCrudComponent.ngOnInit , classHelper()="+JSON.stringify(this.classHelper()))
                              this.collectionMessage.set(this.classHelper().entityName + " loaded");
                              if(this.genericCrudContext())
                                 this.genericCrudContext()!.tabObjects = tabObjects; 
                              this.changeDetectorRef.markForCheck(); } ,
       error: (err)=>{ this.collectionMessage.set(messageFromError(err,"erreur: echec chargement liste (unauthorized?)")); }
    });
    this.objectTemp=this.objectHelper().buildEmptyObject();
    this.fireGenericCrudStateChangeEvent("onInit");
  }

  onActionEvent(actionType:string){
    switch(actionType){
      case "new": this.onNew(); break;
      case "add": this.onAdd(); break;
      case "update": this.onUpdate(); break;
      case "delete": this.onDeleteAfterConfirm(); break;
    }
  }

  fireGenericCrudStateChangeEvent(lastAction:string|null=null){
     this.genericCrudStateChange.emit(
            {selectedObject:this.selectedObject,
             objectTemp:this.objectTemp,
             mode:this.mode,lastAction:lastAction})
  }

  onNew(){
    this.selectedObject=undefined; this.mode='newOne';
    this.formMessage.set("new one (to edit before add)");
    this.objectTemp = this.objectHelper().buildEmptyObject();
    this.fireGenericCrudStateChangeEvent("onNew");
  }

  onAdd(){
    let postResponseObservable : Observable<any> | null = null;
    if(this.withUpload()){
        console.log("generic-crud-component-onAdd withUpload")
        let genericCrudServiceWithUpload = <GenericWithUploadService> <any> this.genericCrudService();
        let genericCrudContext = this.genericCrudContext();
        let uploadFormDataPrepareFn = null;
        if(genericCrudContext)
          uploadFormDataPrepareFn = genericCrudContext.onUploadFormDataPrepareFn;
        if(uploadFormDataPrepareFn){
             const formData: FormData = uploadFormDataPrepareFn();
            postResponseObservable = genericCrudServiceWithUpload.uploadFormData$(formData);
        }
    }
    else {
      //standard/ordinary post request
      postResponseObservable = this.genericCrudService()?.postEntityObject$(this.objectTemp) ?? null;
    }
    if(postResponseObservable)
      postResponseObservable.subscribe(
      { next: (savedObject)=>{ this.formMessage.set(this.classHelper().entityName + " added");
                                + " with " + this.objectHelper().extractKeyValueString(savedObject);
                                this.collectionMessage.set(this.formMessage());
                                this.addClientSide(savedObject); 
                                this.changeDetectorRef.markForCheck();
                              } ,
        error: (err)=>{ this.formMessage.set(messageFromError(err,"error: echec post",true,true)); }
    });
  }

  addClientSide(savedObject:any){
    this.genericCrudContext()?.tabObjects.push(savedObject);
    this.onNew();
  }

  readonly dialog = inject(MatDialog); 

  onDeleteAfterConfirm(){
   ConfirmDialogComponent.confirmDialog$(this.dialog,"confirm delete")
      .subscribe( (isOk : boolean ) => {
        if(isOk) 
          this.onDelete();
      });
  }

  onDelete(){
    if(this.selectedObject){
         let id = this.objectHelper().getId(this.selectedObject);
         this.genericCrudContext()?.onDeleteObject$(id)
             .subscribe(
              { next: ()=>{ this.collectionMessage.set(this.classHelper().entityName + " deleted");
                            console.log("GenericCrudComponent.onDelete() collectionMessage="+this.collectionMessage);
                            this.deleteClientSide(); 
                            this.changeDetectorRef.markForCheck();//to refresh GUI without signal in ZoneLess mode (defaut mode since angular 21)
                          } ,
               error: (err)=>{ this.formMessage.set(messageFromError(err,"error: echec suppression",true,true)); }
            });
    }
  }

  deleteClientSide(){
    if(this.selectedObject){
      let indexToDelete = -1;
      this.genericCrudContext()?.tabObjects.forEach((obj,index)=>{if(obj==this.selectedObject) indexToDelete=index; });
      if(indexToDelete>=0){
        this.genericCrudContext()?.tabObjects.splice(indexToDelete,1);
      }
    }
    this.onNew();
  }

  onUpdate(){
    this.genericCrudContext()?.onUpdateObject$(this.objectTemp)
    .subscribe(
     { next: (updatedObject)=>{  this.formMessage.set(this.classHelper().entityName + " updated");
                   this.collectionMessage.set(this.formMessage());
                   this.updateClientSide(updatedObject); } ,
      error: (err)=>{ this.formMessage.set(messageFromError(err,"error: echec update",true,true));}
   });
  }

  updateClientSide(updatedObject:any){
  //test imposé par typescript sur this.selectedObject potentiellement undefined
   if(this.selectedObject != undefined){
    //Rappel: this.selectedObject est ici une référence
    //qui pointe directement sur le i eme objet du tableau this.tabObjects
    //(selon ligne sélectionnée)
        copyObjectProperties(updatedObject, this.selectedObject);
   }
  }

  //fonction évenementielle à appeler lorsque l'on
  //va sélectionner une des lignes du tableau
  onSelectObject(o : any ){
    //NB: o:any est passé par référence (comportement de java/javascript)
    //et donc ici o et this.selectedObject référencent
    //directement un des objets du tableau this.tabObjects
      this.selectedObject = o;  this.mode='existingOne';
      //via un clonage explicite , this.objectTemp est une copie
      //indépendante de this.selectedObject (et pas une référence sur l'objet original)
      this.objectTemp = cloneObject(this.selectedObject);
      let id = this.objectHelper().getId(this.selectedObject);
      this.collectionMessage.set(id + " selected");
      this.formMessage.set("current "+ this.classHelper().entityName + "=" + id);
      this.fireGenericCrudStateChangeEvent("onSelected");
  }

  //cloneObject, copyObjectProperties , objectKeysArray, objectValuesArray(obj:object):any[]
  // now in util.js as functions


  //essentialKeysArray replaced by objectHelper.classHelper.essentialFieldNames

  
  //extractKeyValueString
  //and objectEssentialValuesArray(obj:object):any[]
  //now in objectHelper 


   isNoEditableId(attrName:string){
    if(this.classHelper().idKeyName != attrName) return false;
    /* else is key attr*/
    if(this.classHelper().withAutoGeneratedId)return true;
    if(this.selectedObject!=null) return true;
    return false;
   }

}
