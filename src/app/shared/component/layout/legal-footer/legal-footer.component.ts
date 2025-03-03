import { Component, input, Input, model, OnInit, TemplateRef } from '@angular/core';
import { MyTogglePanelComponent } from '../../generic/my-toggle-panel/my-toggle-panel.component';
import { inject, PLATFORM_ID } from "@angular/core";
import { CommonModule, isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'mylayout-legal-footer',
  imports: [CommonModule,MyTogglePanelComponent],
  templateUrl: './legal-footer.component.html',
  styleUrls: ['./legal-footer.component.scss']
})
export class LegalFooterComponent  {

  footerPanelExpand = model(false);

 //may be null/undefined:
 public legalFooterTemplateRef = input<TemplateRef<any>>();

 //legalFooter text (always visible like title/label)
 public legalFooterMainText = input("legal footer")

 private readonly platform = inject(PLATFORM_ID);

  constructor() { }

  ngOnInit(){
    if (isPlatformBrowser(this.platform)) {
      //console.log("window.innerWidth ="+window.innerWidth );
      if(window.innerWidth < 600){
         this.footerPanelExpand.set(true);
      }else{
        this.footerPanelExpand.set(false);
      }
    }
  }

}
