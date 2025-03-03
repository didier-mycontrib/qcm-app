import { Component, input, Input, InputSignal, OnInit, TemplateRef } from '@angular/core';
import { MenuDef } from '../../../data/menu-def';
import { QuickMenuComponent } from '../quick-menu/quick-menu.component';
import { MyImportMaterialModule } from '../../../imports/my-import-material.module';
import { LegalFooterComponent } from '../legal-footer/legal-footer.component';
import { inject, PLATFORM_ID } from "@angular/core";
import { CommonModule, isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'mylayout-sticky-footer',
  imports: [QuickMenuComponent, MyImportMaterialModule,LegalFooterComponent,
           CommonModule
  ],
  templateUrl: './sticky-footer.component.html',
  styleUrls: ['./sticky-footer.component.scss']
})
export class StickyFooterComponent  {

  private readonly platform = inject(PLATFORM_ID);

  public expandLegalFooterInSmallSize = false;

  quickMenuDefs :InputSignal<MenuDef[]> = input([],{transform: (menuDefArray)=> <MenuDef[]><any> menuDefArray });

  //may be null/undefined:
  public legalFooterTemplateRef = input<TemplateRef<any>>();

  //legalFooter text (always visible like title/label)
  public legalFooterMainText = input("legal footer")

  constructor() { }

  public onTogglerLegalFooterClick(){
      this.expandLegalFooterInSmallSize = ! this.expandLegalFooterInSmallSize;
  }

}
