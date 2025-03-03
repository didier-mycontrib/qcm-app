/* utility classes for maintaining User informations in a angular application
   UserSession will be stored in memory or sessionStorage after login of user
   UserSessionEx wrapper class will be use by gardians or status bar
*/

//basic UserSession class without method (can be easily cloned and stored in sessionStorage)
export class UserSession{
    constructor(
       public loginMode : string ="oauth2" ,//"standalone-login-api", //or "oauth2"
       public authenticated : boolean = false,
       public userId : string ="?" /* uuid or num or userName or ... */,
       public userName : string ="?" /* to display : fullName or email or userId or ... */,
       public userRoles : string[] =[], 
       public grantedScopes : string[]= [],
       public authToken : string | null = null /* null is not connected */,
       public userDetails : object | null = null
    ){}
}

//extended UserSessionEx with methods (as a wrapper class)
export class UserSessionEx extends UserSession{

  constructor(userSession: UserSession | undefined){
    super(userSession?.loginMode,
          userSession?.authenticated,
          userSession?.userId,
          userSession?.userName,
          userSession?.userRoles,
          userSession?.grantedScopes,
          userSession?.authToken,
          userSession?.userDetails
          );
  }

    hasRole(role:string):boolean{
        return this.userRoles.includes(role);
    }

   
    sumUp():string{
      let sRes=(this.userName!="?")?this.userName:this.userId;
      sRes += (this.authenticated)?" connected" : " not connected"
      sRes += (this.userRoles.length==0)?"":" as "+this.userRoles.join(",");
      return sRes ;
    }

    get userRolesAsString():string{
      return this.userRoles.join(',');
    }


    set userRolesAsString(userRolesAsString : string){
      if(userRolesAsString==null || userRolesAsString.length ==0)
          this.userRoles=[]
      else
          this.userRoles=userRolesAsString.split(',');
    }

}