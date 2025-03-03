import { Component, computed, effect, input, InputSignal, model, ModelSignal, output } from '@angular/core';
import { MyTogglePanelComponent } from '../../generic/my-toggle-panel/my-toggle-panel.component';
import { ObjectHelper } from '../../../helper/object-helper';
import { MyMessageComponent } from "../../generic/my-message/my-message.component";
import { FormsModule } from '@angular/forms';
import { FieldHelper } from '../../../helper/field-helper';
import { CommonModule } from '@angular/common';

/*
Sous composant servant à :
  - afficher une liste d'objets (avec colonnes selon essentialKeysArrayRef )
  - effectuer une sélection simple
  + effectuer d'éventuelles sélections multiples (future version)
*/


@Component({
  selector: 'gen-crud-table',
  imports: [MyTogglePanelComponent, MyMessageComponent,FormsModule,CommonModule],
  templateUrl: './gen-crud-table.component.html',
  styleUrl: './gen-crud-table.component.scss'
})
export class GenCrudTableComponent {

  title="";
  titleWithSize="";
  
  objectHelperRef :InputSignal<ObjectHelper<any,any> | null> = input(null,{transform: (objectHelper)=> <any> objectHelper });

  public messageRef :ModelSignal<string> = model("");

  //liste des objets à afficher
  tabObjectsRef  :InputSignal<object[] | null> 
    = input(null,{transform: (tabObjects)=> <any> tabObjects });

  //objet sélectionné (null au début):
  public selectedObjectRef :ModelSignal<any> = model(null);

  //liste des parties de l'objet à afficher (dans colonnes):
  essentialKeysArrayRef
   :InputSignal<string[] | null>  
      =input(null,{transform: (tabKey)=> <any> tabKey});

  tablePanelOpenState=true;

  sortBy=""; //"" for no sort (or fieldName)
  sortDir : "asc" | "dec" = "asc"
  
  setFieldHeaderStyles(keyField:string){
    //idKey en italic et sortBy key souligné:
    return {
      "text-decoration" :(this.sortBy == keyField)?"underline":"none" ,
      "font-style" : (this.objectHelperRef()!.getIdKeyName() == keyField)?"italic":"normal",
    };
  }

  //sur click colonne
  onAdjustSort(keyField:string){
     if(this.sortBy!=keyField){
           this.sortBy=keyField; //selection colonne de tri
           this.sortDir="asc"; //reset "asc" by default
           }
     else 
           this.sortDir=(this.sortDir=='asc')?'dec':'asc'; //inversion sens
  }
  
  compareFn():any{
    if(this.sortBy=="") return null;
    let fieldHelper : FieldHelper | null = this.objectHelperRef()?.getFieldHelper(this.sortBy)??null;
    if(fieldHelper==null) return null;
    let compareFnStr : string | null = null;
    switch(fieldHelper.fieldType){
      case "string":
        if(this.sortDir=="asc")
          compareFnStr = `(o1,o2)=>o1.${this.sortBy}.localeCompare(o2.${this.sortBy})`
        else 
          compareFnStr = `(o1,o2)=>o2.${this.sortBy}.localeCompare(o1.${this.sortBy})`
        break;
      case "number":
        if(this.sortDir=="asc")
          compareFnStr = `(o1,o2)=>(o1.${this.sortBy} - o2.${this.sortBy})`
        else 
          compareFnStr = `(o1,o2)=>(o2.${this.sortBy} - o1.${this.sortBy})`
        break;
      case "boolean":
        if(this.sortDir=="asc")
          compareFnStr = `(o1,o2)=>(o1.${this.sortBy} === o2.${this.sortBy})?0 : (o1.${this.sortBy})?:-1:1`
        else 
          compareFnStr = `(o1,o2)=>(o1.${this.sortBy} === o2.${this.sortBy})?0 : (o2.${this.sortBy})?:-1:1`
         break;
    }
    if(compareFnStr==null) return null;
    return eval(compareFnStr);
  }

  ngOnChanges(){
    let s = this.tabObjectsRef()?.length;
    this.titleWithSize=`${this.title} (size=${s})`;
    //console.log("titleWithSize="+this.titleWithSize);
    if(s){
      let compareFn :any = this.compareFn(); //selon this.sortBy && this.sortDir && fieldHelper
      if(compareFn)
          this.tabObjectsRef()?.sort(compareFn)??[];
    }
  }
  
/*
 //NO MORE USED AND BAD EFFECT: (just for syntax example):
  private resetMessageEffect = effect(()=>{
    if(this.selectedObjectRef() == null)
      this.messageRef.set("");
  });
  */

  ngOnInit(){
    this.title = "list of " + this.objectHelperRef()?.getEntityTypeName();
  }

  objectEssentialValuesArray(obj:object):any[]{
    let arrayOfPropKeys = this.essentialKeysArrayRef()??[];
    let valuesArray = [];
    for(let key of arrayOfPropKeys){
     valuesArray.push(Reflect.get(obj,key));
    }
    return valuesArray;
   }

   public onSelectObject(obj:any){
    console.log("select object:" + JSON.stringify(obj));
    this.selectedObjectRef.set(obj);
    let id = this.objectHelperRef()?.getId(obj);
    this.messageRef.set(id+ " selected");
   }

}
