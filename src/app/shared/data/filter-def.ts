import { SelfClonable } from "../util/util";

/*
definition d'un filtre applicable
(par exemple sur crud component)

Exemple d'utilisation:
--------------------
  this.genericCrudContext.filterDefs=[
      new FilterDef("serverSide" , "changeMini=",1,["0"]),
      new FilterDef("clientSide" , "change>=",1,["0"] , (obj:Devise)=>obj.change > 0),
      new FilterDef("clientSide" , "code.startsWith ",1,["?"] , (obj:Devise)=>obj.code.startsWith('?')),
    ]
*/
export class FilterDef implements SelfClonable<FilterDef>{
    constructor(
        public side : string = "clientSide", //"clientSide" or "serverSide"
        public text :string ="?",//ex "taux>=" ou "name="
        public nbArg : number = 0,
        public args :string[]  =[] ,
        public filterFn : any = undefined, //filtering predicate function (for client side only)
        public toApply : boolean = false,
        ){}

/*
NB: filterFn should be written with a specific default arg value of '?' or 0
this default arg value will be automatically replaced by choosen arg value:
Exemples:
--------
clientFilterFnWithArg , originalFn= (obj) => obj.change > 0
clientFilterFnWithArg , adjustedFn= (obj) => obj.change > 1

clientFilterFnWithArg , originalFn= (obj) => obj.code.startsWith("?")
clientFilterFnWithArg , adjustedFn= (obj) => obj.code.startsWith("E")
*/        

    //helper methods:

    clientFilterFnWithArg(){
        let fnText = this.filterFn.toString();
        console.log(`clientFilterFnWithArg , originalFn= ${fnText}`);
        if(fnText.includes("0")){
            fnText = fnText.replace("0",this.args[0]);
            console.log(`clientFilterFnWithArg , adjustedFn= ${fnText}`);
            return eval(fnText);
        }
          
        if(fnText.includes("?")){
            fnText = fnText.replace("?",this.args[0]);
            console.log(`clientFilterFnWithArg , adjustedFn= ${fnText}`);
            return eval(fnText);
        }
        /*else*/
        return this.filterFn;
    }
    
    sumUpClientSide() : string {
        return this.sumUp("clientSide");
    }
    sumUpServerSide() : string {
        return this.sumUp("serverSide");
    }

    sumUp(askedSide:string) : string {
        let filterToApply = "";
        if(this.toApply && this.side == askedSide){
           if(this.nbArg>=0){
            filterToApply=this.text;
           }
           if(this.nbArg>=1){
            filterToApply+=this.args[0];
           }
           //to improve if nbArg>=2 ...
        }
        return filterToApply;
    }    
    
    sumUpState() : string {
        return JSON.stringify(this);
    } 
    
    sumUpWithSide() : string {
        let filterToApply = `[${this.side}] `;
        if(!this.toApply) 
            return "";

        filterToApply+=this.text;
        if(this.nbArg>=1){
           filterToApply+=this.args[0];
        }
        //to improve if nbArg>=2 ...
        return filterToApply;
    }

    sumUpWithoutSide() : string {
        if(!this.toApply) 
            return "";

        let filterToApply=this.text;
        if(this.nbArg>=1){
           filterToApply+=this.args[0];
        }
        //to improve if nbArg>=2 ...
        return filterToApply;
    }
    
    clone() :FilterDef {
        return new FilterDef(this.side,this.text,this.nbArg,this.args,this.filterFn,this.toApply);
    }
    
}