import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRequest } from '../data/auth-request';
import { AuthResponse } from '../data/auth-response';
import { tap } from 'rxjs/operators';

export interface SecureModeDto{
  secureMode: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentSecureMode : boolean =false; //=false; //temporairement false pour premier tests !!!!!
  public lastAuthResponse : AuthResponse | null= null; //last succeeding response only

  constructor(private _http : HttpClient) {
   }
  private _headers = new HttpHeaders({'Content-Type': 'application/json'});
  private _authBaseUrl = "/user-api/public/login" ; //avec ng serve --proxy-config proxy.conf.json

  postAuth(auth : AuthRequest):Observable<AuthResponse>{
    return this._http.post<AuthResponse>(this._authBaseUrl ,auth,{headers: this._headers} )
    .pipe(
      //tap( other async task without transforming result)
      tap( (authResponse) => { this.storeAuthResponseAndToken(authResponse); })
    );
  }

  
  

  

  private storeAuthResponseAndToken(authResponse : AuthResponse){
    if(authResponse.status){
        this.lastAuthResponse = authResponse;
        sessionStorage.setItem("authToken",authResponse.token?authResponse.token:"");
    }
    else{ 
        this.lastAuthResponse = null;
        sessionStorage.setItem("authToken","");
    }
  }

  public isUserAuthenticatedWithRole(roleName:string):boolean{
    let arrayOfUserRoles: string[] = [];
    if(this.lastAuthResponse && this.lastAuthResponse.roles )
        arrayOfUserRoles = this.lastAuthResponse.roles.split(',');
    return arrayOfUserRoles.includes(roleName);
  }

   
}
