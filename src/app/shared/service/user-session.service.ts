import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserSession } from '../data/user-session';
import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser} from "@angular/common";

/* user session in this angular frontEnd App */

class GenericUserSessionService{

  private readonly platform = inject(PLATFORM_ID);

  storeSessionKeyValue(key:string,value: unknown):void{
         let sValue : string ="null";
         if(typeof value == 'string') sValue = value;
         else sValue=JSON.stringify(value);
         if (isPlatformBrowser(this.platform)) {
             sessionStorage.setItem(key,sValue);
         }
    }

  retreiveSessionValue(key:string,defaultValue: any):any{
      let res :any = null;
      let sValue : string  | null = null;
      if (isPlatformBrowser(this.platform)) {
        sValue = sessionStorage.getItem(key);
      }
      if(sValue != null && sValue != "null" && sValue != "") {
        try {
          res=JSON.parse(sValue);
        }catch(ex){
          res=sValue;
        }
      }
      if(res==null){
        res=defaultValue;
      }
      return res;
 }
}

@Injectable({
  providedIn: 'root'
})
export class UserSessionService extends GenericUserSessionService {

  //private _bsUserSession$ = new BehaviorSubject<UserSession>(new UserSession());
  /*
  public get bsUserSession$() : BehaviorSubject<UserSession>{ 
    return this._bsUserSession$
  }
  */

 private _sUserSession = signal(new UserSession);

 public get sUserSession() : WritableSignal<UserSession>{ 
    return this._sUserSession;
  }
  

  public setUserSession(userSession:UserSession){
    this.storeSessionKeyValue("userSession" ,userSession);
    //this._bsUserSession$.next(userSession);
    this._sUserSession.set(userSession);
  }

  constructor() { super(); 
    let userSession = this.retreiveSessionValue("userSession",new UserSession()/*default_values*/);
    //this._bsUserSession$.next(userSession);
    this._sUserSession.set(userSession);
  }
}
