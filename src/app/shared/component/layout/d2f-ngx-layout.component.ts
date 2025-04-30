import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, HostListener, input, Input, InputSignal, model, ModelSignal, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { MenuDef } from '../../data/menu-def';
import { StickyHeaderComponent } from './sticky-header/sticky-header.component';
import { MyImportMaterialModule } from '../../imports/my-import-material.module';
import { MainSideNavComponent } from './main-side-nav/main-side-nav.component';
import { MainContentComponent } from './main-content/main-content.component';
import { StickyFooterComponent } from './sticky-footer/sticky-footer.component';
import { LegalFooterComponent } from './legal-footer/legal-footer.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'd2f-ngx-layout',
  imports: [StickyHeaderComponent, MainSideNavComponent, CommonModule,
    StickyFooterComponent ,  MainContentComponent ,MyImportMaterialModule ] ,
  templateUrl: './d2f-ngx-layout.component.html',
  styleUrls: ['./d2f-ngx-layout.component.scss']
})
export class D2fNgxLayoutComponent implements OnInit {

  mySmallBreakPoint="600px";
  isSmall=true;//or not

  title =input("my-angular-app");

  //may be null/undefined:
  public legalFooterTemplateRef = input<TemplateRef<any>>();
  
  //legalFooter text (always visible like title/label)
  legalFooterMainText = input("my legal footer")

  private _defaultMainMenuDefs : MenuDef[] = [
    new MenuDef("home","/ngr-home"),
    new MenuDef("login-out","/ngr-login-out")
  ];

  mainMenuDefs :InputSignal<MenuDef[]> = input(this._defaultMainMenuDefs,
    {transform: (menuDefArray)=> <MenuDef[]><any> menuDefArray });

  
  private _defaultQuickMenuDefs : MenuDef[] =[
    new MenuDef("home","/ngr-home"),
    new MenuDef("login-out","/ngr-login-out")
  ];

  quickMenuDefs :InputSignal<MenuDef[]> = input(this._defaultQuickMenuDefs,
        {transform: (menuDefArray)=> <MenuDef[]><any> menuDefArray });
  

  @ViewChild('matSideNav', { static: true })
  matSideNav : MatSidenav | undefined;

  constructor(private _breakpointObserver: BreakpointObserver) { }

  //public innerWidth: any; //v1 (without BreakpointObserver)
  openedSideNav : ModelSignal<boolean> = model(false);
  defaultOpenedSideNav : InputSignal<boolean> = input(true);

  sideNavMode : MatDrawerMode = "side";  
  /* mode = side , push (auto-close when click on main content) or
  over (idem as push but over / no slide )*/

  ngOnInit() {
    /*
    //V1:
    this.innerWidth = window.innerWidth;
    this.displaySideMenuIfLargeWidth();
    */
    this._breakpointObserver
    .observe([`(min-width: ${this.mySmallBreakPoint})`])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        //console.log('Viewport is 600px or over!');
        this.isSmall=false;
        this.displaySideMenuIfLargeWidth();
      } else {
        //console.log('Viewport is smaller than 600px!');
        this.isSmall=true;
        this.displaySideMenuIfLargeWidth();
      }
    });
  }

  displaySideMenuIfLargeWidth(){
    this.sideNavMode="side";
    if (this.isSmall==true ) {
      this.openedSideNav.set(false);
    } else {
      console.log("defaultOpenedSideNav="+this.defaultOpenedSideNav());
      this.openedSideNav.set(this.defaultOpenedSideNav());
    } 
  }

  onMenuMouseEnterInMainSideNav(){
    //console.log("onMenuMouseEnterInMainSideNav");
    //scroll to top of menu to insure menu is visible
    document.getElementById("main-side-nav")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
      });
  }

  onAfterNav(evt : any){
    if (this.isSmall==true && this.matSideNav ) {
      this.matSideNav.close();
      this.openedSideNav.set(false);
    }
  }

  onTogglerMenu(){
    //need to display menu if necessary (small width)
    //console.log("onTogglerMenu()")
    this.openedSideNav.set(!this.openedSideNav());
  }

  /*
  //V1:
  @HostListener('window:resize', ['$event'])
  onResize(event :any) {
    this.innerWidth = window.innerWidth;
    this.displaySideMenuIfLargeWidth();
  }

  displaySideMenuIfLargeWidth(){
    if (this.innerWidth < 600 ) {
      this.openedSideNav = false;
    } else {
      this.openedSideNav = true;
    } 
  }
  */
}
