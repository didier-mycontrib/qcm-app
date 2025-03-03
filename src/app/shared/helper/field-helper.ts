export class FieldHelper{
    constructor(
        public fieldName:string="?",
        public fieldType:string="string", //or "number" or "boolean" or ...
        public defaultValue:any=undefined
    ){
      if(this.defaultValue==undefined){
        if(this.fieldType=="string") this.defaultValue="";
        if(this.fieldType=="number") this.defaultValue=0;
        if(this.fieldType=="boolean") this.defaultValue=false;
        //...
      }
    }
}