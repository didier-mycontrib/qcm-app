import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthErrorEvent, OAuthInfoEvent, OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { Location } from '@angular/common';
import { UserSessionService} from "../../shared/service/user-session.service";
import { UserSession } from '../../shared/data/user-session';
import { PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { deleteCookieWithPathDomain } from '../../shared/util/util';

@Injectable({
  providedIn: 'root'
})
export class OAuth2SessionService {

  readonly platform = inject(PLATFORM_ID);

  public userSessionService = inject(UserSessionService);

  private _userInSession = new UserSession();

  public get userInSession(){ return this._userInSession;}

  public set userInSession(u:UserSession){
    this._userInSession=u;
    if (isPlatformBrowser(this.platform)) {
        sessionStorage.setItem("session.userInSession",JSON.stringify(this._userInSession));
    }
  }

 
  constructor(private oauthService: OAuthService , private router : Router,private location: Location,
        private  _sessionService : UserSessionService/* : SessionService*/
  ) { 
        this.initOAuthServiceForCodeFlow();
        if (isPlatformBrowser(this.platform)) {
          let sUser = sessionStorage.getItem("session.userInSession");
          if(sUser) {
            this._userInSession = JSON.parse(sUser);
          }else {
            this._userInSession = new UserSession();
          }
      }
  }

  initOAuthServiceForCodeFlow(){
    if (!isPlatformBrowser(this.platform)) return;
    const authCodeFlowConfig: AuthConfig = {
      // Url of the Identity Provider
      //issuer: 'https://www.d-defrance.fr/keycloak/realms/sandboxrealm',
      issuer: 'https://www.d-defrance.fr/keycloak/realms/d2frealm',
  
      // URL of the SPA to redirect the user to after login
      //redirectUri: window.location.origin + "/ngr-loggedIn",

      silentRefreshRedirectUri: window.location.origin + this.location.prepareExternalUrl("/silent-refresh.html"),
      useSilentRefresh: true,
      
      postLogoutRedirectUri : window.location.origin +  this.location.prepareExternalUrl("/ngr-login-out"), 
      //ou /ngr-welcome ou ...
  
      // The SPA's id. The SPA is registered with this id at the auth-server
      clientId: 'd2fclient',
      //clientId: 'anywebappclient',
      //clientSecret if necessary (not very useful for web SPA)
      //dummyClientSecret is required if client not public (client authentication: on + credential in keycloak)
	  //dummyClientSecret: 'DMzPzIV2OQAphSbR84D7ebwxjrUNBgq5' ,
      responseType: 'code',
  
      // set the scope for the permissions the client should request
      // The first four are defined by OIDC.
      // Important: Request offline_access to get a refresh token
      // The api scope is a usecase specific one
      scope: 'openid profile resource.read resource.write resource.delete',
  
      showDebugInformation: true,
    };
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.oidc = true; // ID_Token

    this.oauthService.setStorage(sessionStorage);
    
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.events.subscribe(
      event => {
        if (event instanceof OAuthSuccessEvent) {
          //console.log("OAuthSuccessEvent: "+JSON.stringify(event));
          console.log("OAuthSuccessEvent: "+event.type);
          this.manageSuccessEvent(event);
        }
        if (event instanceof OAuthInfoEvent) {
         // console.log("OAuthInfoEvent: "+JSON.stringify(event));
         console.log("OAuthInfoEvent: "+event.type);
        }
        if (event instanceof OAuthErrorEvent) {
         // console.error("OAuthErrorEvent: "+JSON.stringify(event));
         console.log("OAuthErrorEvent: "+event.type);
        } else {
          console.warn(event.type);
        }
      });

  }//end of initOAuthServiceForCodeFlow

  manageSuccessEvent(event : OAuthSuccessEvent){
    if(event.type=="token_received" ){
      console.log("***** token_received ****")
      this._userInSession.loginMode="oauth2";
      this._userInSession.authenticated = true;
      this._userInSession.authToken= this.oauthService.getAccessToken();
      let grantedScopesObj : object = this.oauthService.getGrantedScopes();
      this._userInSession.grantedScopes =<any> grantedScopesObj;
      console.log("grantedScopes="+JSON.stringify(this._userInSession.grantedScopes));

      var claims : any = this.oauthService.getIdentityClaims();
      console.log("claims="+JSON.stringify(claims))
      if (claims) this._userInSession.userName= claims.preferred_username + "("+ claims.name + ")";
     
      this.userSessionService.setUserSession(this._userInSession);

      /*
      //not necessary with popup and silent-refresh
      let savedData = sessionStorage.getItem("data");
      if(savedData){
        this.data = JSON.parse(savedData)
      }
      */
     if(this.oauthService.silentRefreshRedirectUri != null){
       //this.router.navigateByUrl("/ngr-home");
       this.router.navigateByUrl("/ngr-login-out"); //with message form this SessionService if successuf login
     }
    }
  }


  delegateOidcLogin(){
      /*
      //not necessary with popup and silent-refresh:
      sessionStorage.setItem("data",JSON.stringify(this.data)) //store session data before redirect and lost
     */

      //this.oauthService.initImplicitFlow(); //Attention: possible que si configuré par le serveur OAuth2/OIDC .
      //this.oauthService.initCodeFlow(); //c'est mieux

      //this.oauthService.initLoginFlow(); //appel en interne
      //.initImplicitFlow(); ou .initCodeFlow(); 
      //selon la configuration préalablement enregistrée.

      this.oauthService.initLoginFlowInPopup();
  }

  oidcLogout(){
 
       //this.oauthService....
       this.oauthService.logOut(false); //clear tokens in storage ( and redirect to logOutEndpoint if not true)
       //this.oauthService.revokeTokenAndLogout(); //warning : problems if no CORS settings !!!!

       //delete old cookies (oauth2/oidc/keycloak):
       //NB: it's not useful on current url/domain , but useful on authServer_url/domain
       /*
       document.cookie = "AUTH_SESSION_ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
       document.cookie = "AUTH_SESSION_ID_LEGACY=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
       */
      /*
      // REJECT BY BROWSER because OTHER domain !!!!
      deleteCookieWithPathDomain("AUTH_SESSION_ID","/keycloak/realms/sandboxrealm/","www.d-defrance.fr");
      deleteCookieWithPathDomain("AUTH_SESSION_ID_LEGACY","/keycloak/realms/sandboxrealm/","www.d-defrance.fr");
      deleteCookieWithPathDomain("KEYCLOAK_IDENTITY_LEGACY","/keycloak/realms/sandboxrealm/","www.d-defrance.fr");
      deleteCookieWithPathDomain("KEYCLOAK_IDENTITY","/keycloak/realms/sandboxrealm/","www.d-defrance.fr");
      deleteCookieWithPathDomain("KEYCLOAK_SESSION_LEGACY","/keycloak/realms/sandboxrealm/","www.d-defrance.fr");
      deleteCookieWithPathDomain("KEYCLOAK_SESSION","/keycloak/realms/sandboxrealm/","www.d-defrance.fr");
      */
     
  }

 

  public get accessTokenString() : string {
    return this.oauthService.getAccessToken();
  }

}
