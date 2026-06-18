import { Component, computed, effect, inject } from '@angular/core';
import { UserSessionService } from 'd2f-ngx-session';
import { UserSessionEx, UserSession } from 'd2f-ngx-session';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MyStorageUtilService } from 'd2f-ngx-util';
import { OAuth2SessionService } from '../common/service/oauth2-session.service';

@Component({
  selector: 'app-login-out',
  imports: [NgIf,FormsModule,CommonModule],
  templateUrl: './login-out.component.html',
  styleUrl: './login-out.component.css'
})

export class LoginOutComponent  {

  public userSessionService = inject(UserSessionService);
  private _myStorageUtilService = inject(MyStorageUtilService);
  public isOk = false;
  public message="";
  public sAuthenticated = computed(()=> this.userSessionService.sUserSession().authenticated);
  public loginMode: "standalone-login-api" | "oauth2" ="oauth2" ;

  public oauth2SessionService = inject(OAuth2SessionService);

  userSessionEx  = new UserSessionEx(undefined);

  private userSessionEffect = effect(()=>{
    this.userSessionEx= new UserSessionEx(this.userSessionService.sUserSession());
    switch(this.userSessionEx?.loginMode){
      case "standalone-login-api" :
        this.loginMode = "standalone-login-api"; break;
      case "oauth2" :
        this.loginMode = "oauth2"; break;
    }
  });

  ngOnInit(): void {
  }

  onLogout(){
    this.message="";
    this.userSessionEx  = new UserSessionEx(undefined);
    if(this.loginMode=="oauth2"){
      this.oauth2SessionService.oidcLogout();
      this.userSessionEx.loginMode="oauth2";
    }else{
      this.userSessionEx.loginMode="standalone-login-api";
    }
    this.userSessionService.setUserSession(this.userSessionEx);
    this._myStorageUtilService.setItemInSessionStorage("access_token" , null);
  }

  onOAuth2Login(){
    this.oauth2SessionService.delegateOidcLogin();
  }

  onStandaloneLogin(){
    //v1 : without ckeck password , without server:
    /*
    this.userSessionEx.loginMode="standalone-login-api";
    this.userSessionEx.authenticated=true;
    this.userSessionEx  = new UserSessionEx(undefined);
    this.userSessionEx.userRolesAsString = this.login.roles;
    this.userSessionEx.userName = this.login.username;
    this.userSessionEx.authToken = "bearerTokenForConnectedUser";
    this.userSessionService.setUserSession(this.userSessionEx);
    */
  }

}

