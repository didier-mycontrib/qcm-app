import { Component, effect, inject, OnInit } from '@angular/core';
import {  UserSessionService } from "../../../service/user-session.service";
import { UserSession , UserSessionEx } from "../../../data/user-session";

@Component({
  selector: 'mylayout-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent  {

  private _userSessionService = inject(UserSessionService);

  public userSessionEx : UserSessionEx = new UserSessionEx(undefined);

  private userSessionEffect = effect(()=>{
      this.userSessionEx= new UserSessionEx(this._userSessionService.sUserSession());
  });

    /*
  constructor(){
    this._userSessionService.bsUserSession$.subscribe(
      (userSession)=>{
        this.userSessionEx=new UserSessionEx(userSession);
       // console.log("StatusBarComponent , userSessionEx="+JSON.stringify(this.userSessionEx))
      }
    )
  }
    */
}
