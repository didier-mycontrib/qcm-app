import { CommonModule } from '@angular/common';
import { Component, input, output,  TemplateRef } from '@angular/core';


/*
SimplePopupComponent = exemple de popup élémentaire sans material
(juste pour le principe du overlay)
*/

@Component({
  selector: 'my-simple-popup',
  imports: [CommonModule],
  templateUrl: './simple-popup.component.html',
  styleUrl: './simple-popup.component.scss'
})
export class SimplePopupComponent {
  title=input("dialog box")
  public dialogTemplateRef = input<TemplateRef<any>>();
  closeConfirm = output<boolean>();

  closePopup(ok:boolean) {
	   this.closeConfirm.emit(ok);
  }


}
