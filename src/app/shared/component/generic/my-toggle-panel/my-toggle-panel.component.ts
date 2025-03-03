import { Component, input, model, ViewEncapsulation } from '@angular/core';
import { MyImportMaterialModule } from '../../../imports/my-import-material.module';

@Component({
  selector: 'my-toggle-panel',
  imports: [MyImportMaterialModule],
  templateUrl: './my-toggle-panel.component.html',
  styleUrls: ['./my-toggle-panel.component.scss']
})
export class MyTogglePanelComponent {

  public title = input("my-toogle-panel");

  panelOpenState=model(false);//model=input & ouptut

  constructor() { }

}
