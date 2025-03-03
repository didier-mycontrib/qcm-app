import { HttpErrorResponse } from "@angular/common/http";

export function messageFromError(err : HttpErrorResponse , 
                  myMsg : string = "", 
                  withStatus :boolean = false ,
                   withDetails :boolean = false){
    let message="";
    if (err.error instanceof Error) {
      console.log("Client-side error occured." + JSON.stringify(err));
      message = myMsg;
      } else {
      console.log("Server-side error occured : " + JSON.stringify(err));
      let detailErrMsg = (err.error && err.error.message)?":"+err.error.message:"";
      if(err.status == 200){
          message = myMsg + "(technical problem)"
         }else{
        message = myMsg 
          + (withStatus?" (status="+ err.status + ":" + err.statusText + ") ":"")
          + (withDetails?detailErrMsg:"")  
      }
      }
    console.log("messageFromError.message="+message)
    return message + " at " + (new Date).toLocaleTimeString();
    //return message ;
  }

  export function cloneObject(obj:any):any{
    return JSON.parse(JSON.stringify(obj));
  }

  export function cloneAnyObjectWithAssign(obj:any):any{
    return Object.assign({},obj);
  }

  export interface SelfClonable<T>{
    clone():T ;
  }

  export function cloneArrayOfSelfClonable<T>(arr:SelfClonable<T>[]):T[]{
    let cArr : T[] = [];
    for(let selfClonableObj of arr){
       cArr.push(selfClonableObj.clone());
    }
    return cArr;
  }

  export function copyObjectProperties(source:object, target : object){
    let arrayOfPropKeys = Reflect.ownKeys(source);
    for(let key of arrayOfPropKeys){
     Reflect.set(target, key, Reflect.get(source,key));
    }
   }

export function deleteCookie(name:string ) {
   setCookie(name, '', -1);
}

export function deleteCookieWithPathDomain(name:string,path:string,domain:string ) {
  setCookie(name, '', -1,path,domain);
}

export function setCookie(name: string, value: string, 
                          expireDays: number|null=null, 
                          path: string | null =null,
                          domain : string | null=null ) {
    let cexpires = ''; //no expires date (sessin cookies) by default
    if(expireDays){
      let d:Date = new Date();
      d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
      cexpires = `; expires=${d.toUTCString()}`;
    }
    let cpath:string = path ? `; path=${path}` : '';
    let cdomain:string = path ? `; domain=${domain}` : '';
    document.cookie = `${name}=${value}${cexpires}${cpath}${cdomain}`;
}


  
