import { Component, effect, input, InputSignal, model, ModelSignal, output, TemplateRef } from '@angular/core';
import { MyTogglePanelComponent } from '../../generic/my-toggle-panel/my-toggle-panel.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyMessageComponent } from "../../generic/my-message/my-message.component";
import { MyImportMaterialModule } from '../../../imports/my-import-material.module';
import { AutomaticGenSubFormComponent } from '../automatic-gen-sub-form/automatic-gen-sub-form.component';
import { AbstractGenSubFormData } from '../abstract/AbstractGenSubFormData';
import { cloneObject } from '../../../util/util';
import { ObjectHelper } from '../../../helper/object-helper';

/*
Sous composant servant à :
  - éditer les partie d'un objet
  - déclencher des demandes d'actions ("new" , "add" , "update" , "delete")
  - afficher un message (notification, ...)
*/

@Component({
  selector: 'gen-crud-form',
  imports: [CommonModule, FormsModule, AutomaticGenSubFormComponent,
           MyTogglePanelComponent, MyMessageComponent,
          MyImportMaterialModule ],
  templateUrl: './gen-crud-form.component.html',
  styleUrl: './gen-crud-form.component.scss'
})
export class GenCrudFormComponent {

   public messageRef = model<string>("");

   public actionEvent = output<string>();//"new" , "add" , update" , "delete"

    //objectHelperRef :InputSignal<ObjectHelper<any,any> | null> = input(null,{transform: (objectHelper)=> <any> objectHelper });
    objectHelperRef =input<ObjectHelper<any,any> | null>(null);

    availableActions = input<string>("READ,NEW,ADD,UPDATE,DELETE"); // or "READ,DELETE" or "...,..." 

    modeRef = model("newOne"); //or "existingOne"

    //[(ngModel)]="deviseTempRef()!.code" , ....
    objectTempRef :ModelSignal<any> = model(null);

    optionalSpecificSubFormTemplateRef = input<TemplateRef<any>>();

    subFormData : AbstractGenSubFormData = 
     { obj: this.objectTempRef(),
      mode : this.modeRef()
     } ;

    baseTitle ="selected entity";
    title = this.baseTitle;

    tablePanelOpenState=true;

    originalObjectTemp : any = null;

    ngOnChanges(){
      this.originalObjectTemp = cloneObject(this.objectTempRef()); //for detect change attempt
      this.subFormData.obj=this.objectTempRef();
      this.subFormData.mode = this.modeRef();
    }

    hasBeenChanged():boolean{
      let changed=false;
      let arrayOfPropKeys = Reflect.ownKeys(this.objectTempRef());
         for(let key of arrayOfPropKeys){
           let originalFieldValue=this.originalObjectTemp[key];
           let fieldValue=this.objectTempRef()[key];
           if(fieldValue!=undefined && fieldValue != originalFieldValue)
             { changed=true; break; }
         }
      return changed;
   }

   private modeEffect = effect(()=>{
      if(this.modeRef() == 'newOne'){
        this.title = this.baseTitle + " = newOne (temp)";
      }else{
        this.title = this.baseTitle + " = existingOne";
      }
    });

    ngOnInit(){
        this.baseTitle = "selected " + this.objectHelperRef()!.classHelper.entityName;
        this.title = this.baseTitle + " = newOne (temp)"
    }

    onAction(actionType:string){
         this.actionEvent.emit(actionType);
    }
   
   
  
}
