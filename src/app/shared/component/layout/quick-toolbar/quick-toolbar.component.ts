import { Component, EventEmitter, inject, input, Input, OnInit, output, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MyImportMaterialModule } from '../../../imports/my-import-material.module';

@Component({
  selector: 'mylayout-quick-toolbar',
  imports : [MyImportMaterialModule],
  templateUrl: './quick-toolbar.component.html',
  styleUrls: ['./quick-toolbar.component.scss']
})
export class QuickToolbarComponent  {

  //loginLogout , home (welcome) , search , shopping (caddy_or_subscribe)  -->
  
  public loginOutPath =input("/ngr-login-out");

  public homePath =input("/ngr-home");

  public searchPath =input(""); //or "/ngr-search";

  public shoppingPath =input("");

  public statusHelp = output<{}>();

  private _router = inject(Router);

  onHome(){
    this._router.navigateByUrl(this.homePath());
  }

  onStatus(){
    this.statusHelp.emit({});
  }


  onSearch(){
    this._router.navigateByUrl(this.searchPath());
  }

  onLoginOut(){
    this._router.navigateByUrl(this.loginOutPath());
  }

  onShopping(){
    this._router.navigateByUrl(this.shoppingPath());
  }



}
