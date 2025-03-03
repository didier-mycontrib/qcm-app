import { Component,  input, InputSignal, output,  } from '@angular/core';
import { MenuDef } from '../../../data/menu-def';
import { MyImportMaterialModule } from '../../../imports/my-import-material.module';
import { QuickToolbarComponent } from '../quick-toolbar/quick-toolbar.component';
import { QuickMenuComponent } from '../quick-menu/quick-menu.component';
import { StatusBarComponent } from '../status-bar/status-bar.component';
import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'mylayout-sticky-header',
  imports: [ MyImportMaterialModule, QuickToolbarComponent,QuickMenuComponent,StatusBarComponent],
  templateUrl: './sticky-header.component.html',
  styleUrls: ['./sticky-header.component.scss']
})
export class StickyHeaderComponent  {

  private readonly platform = inject(PLATFORM_ID);

  title = input("my-angular-app");

  quickMenuDefs :InputSignal<MenuDef[]> = input([],{transform: (menuDefArray)=> <MenuDef[]><any> menuDefArray });
  
  showStatusBar = true;

  togglerMenu = output<{}>();

  onTogglerMenuClick(){
    this.togglerMenu.emit({});
    //console.log("onTogglerMenuClick()")
  }

  constructor() { }

  onStatusHelp(){
     this.showStatusBar = ! this.showStatusBar;
     if(this.showStatusBar)
         this.autoHideForSmallSize();
  }

  ngOnInit(): void {
    this.autoHideForSmallSize();
  }

  autoHideForSmallSize(){
    
    if (isPlatformBrowser(this.platform)) {
      //console.log("window.innerWidth ="+window.innerWidth );
      if(window.innerWidth < 600){
        setTimeout(()=>{ this.showStatusBar=false;},2000);
      }
    }
  }

}
