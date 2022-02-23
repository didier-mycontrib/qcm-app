import { GenericCrudAbstractContextHelper } from './GenericCrudAbstractContextHelper';

export class GenericCrudContext<T>{

    public entityTypeName : string; //ex: "Devise" ou "Contact" ou ...

    public msgSaveOrUpdate : string ="";
    public msg : string ="";

    public confirmDelete :boolean = false;
    public mode : string = "newOne" ; //ou "existing"

    public defaultObject : T | null = null ;//empty object by default 
    public selectedObject : T | null = null ; 
    
    constructor(public contextHelper : GenericCrudAbstractContextHelper<T> ){
        this.reInitDefaultAndSelectedGeneric();
        this.entityTypeName = contextHelper.getEntityTypeName();
    } // sub class must call super() in constructor !!!!!

    public reInitDefaultAndSelectedGeneric(){
        this.defaultObject = this.contextHelper.buildEmptyObject();
        this.selectedObject = this.defaultObject;
        this.confirmDelete=false;
    }

    public tabObjects : T[]=[];

    public onGetAllObjects() : void{
        this.contextHelper.onGetAllObjects();
    }


    public onSupprimerObject() : void {
        this.contextHelper.onSupprimerObject();
        this.confirmDelete=false;
    }


    public onChangeSelectedObjectGeneric():void {
        this.msgSaveOrUpdate="";
        this.mode="existing";
        this.confirmDelete=false;
        this.msg="sélection courante = entité existante modifiable"; 
        if(this.contextHelper.onChangeSelectedObjectPostGeneric!=null){
             this.contextHelper.onChangeSelectedObjectPostGeneric(); //optional
        }
    }

    public onNewObjectGeneric() :void{
        this.mode="newOne";
        this.msg="sélection courante = nouvelle entité"; 
        this.msgSaveOrUpdate="nouvelle entité par encore publiée";
        this.reInitDefaultAndSelectedGeneric();
        if(this.contextHelper.onNewObjectPostGeneric!=null){
            this.contextHelper.onNewObjectPostGeneric(); //optional
       }
    }

    public addInTabAfterPostNewGeneric(savedObj:T) : void {
        if(this.mode=="newOne"){
          this.selectedObject =  savedObj; //sometimes with auto incr id !!!
          this.tabObjects.push(this.selectedObject);
          this.mode = "existing";
          this.msg="sélection courante = entité existante modifiable"; 
          this.msgSaveOrUpdate="nouvelle entité sauvegardée (re-modifiable)";
        }
     }

     public endOfDeleteGeneric(){
        this.contextHelper.onGetAllObjects();
        this.onNewObjectGeneric();
        this.msg="suppression bien effectuée";
      }
}