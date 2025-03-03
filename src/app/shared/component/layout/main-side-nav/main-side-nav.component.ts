import { Component,input,  InputSignal, OnInit, output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuDef } from '../../../data/menu-def';

@Component({
  selector: 'mylayout-main-side-nav',
  templateUrl: './main-side-nav.component.html',
  styleUrls: ['./main-side-nav.component.scss']
})
export class MainSideNavComponent  {
  
  afterNav = output<{value:String}>();

  private _defaultMenuDefs : MenuDef[] = [
    new MenuDef("xxx","/ngr-xxx"),
    new MenuDef("yyy","/ngr-yyy")
  ];

 menuDefs :InputSignal<MenuDef[]> = input(this._defaultMenuDefs,
               {transform: (menuDefArray)=> <MenuDef[]><any> menuDefArray });
  

  selectedMenuDef : MenuDef | null = null;
  subMenuDefs : MenuDef [] | null = null;
  subMenuPaddingTop = 0;//unite=em
  selectedSubMenuDef : MenuDef | null = null;

  constructor(private _router : Router) { }


  onNav(md:MenuDef){
    this.selectedMenuDef=md;
    if(md.children != null) return;
    if(md.path != null) this._router.navigateByUrl(md.path);
    this.afterNav.emit({value:md.label}); //forward event to parent
    if(this.subMenuDefs!=null) this.onResetMenuSelection();
  }


  onSubMenu(md:MenuDef,index:number): void {
        this.selectedMenuDef = md;
        this.subMenuDefs=md.children;
        let mainMenuLength = this.menuDefs()?.length;
        let subMenuLength = this.subMenuDefs?this.subMenuDefs.length:0;
        let delta = mainMenuLength - subMenuLength;
        if(delta>0){
          //formule à éventuellement peaufiner
          this.subMenuPaddingTop= Math.max(0, 1.5 * (index - subMenuLength / 2)) ;
        }else{
          this.subMenuPaddingTop=0;
        }
        console.log(`delta=${delta} subMenuPaddingTop=${this.subMenuPaddingTop}`);
  }


  onResetMenuSelection(){
      this.selectedMenuDef=null;
      this.selectedSubMenuDef=null;
      this.subMenuPaddingTop=0;
      this.subMenuDefs=null;
  }



}
