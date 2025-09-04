import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyImportMaterialModule } from '../../../imports/my-import-material.module';


export interface MessagePopupInput{
  titre : string,
  texte : string,  //text ot html text
  type? : string  // "info" (by default) or "warning" or "error"
}


@Component({
  selector: 'app-message-popup',
  imports: [MyImportMaterialModule],
  templateUrl: './message-popup.component.html',
  styleUrl: './message-popup.component.scss'
})
export class MessagePopupComponent {

  public data = inject<MessagePopupInput>(MAT_DIALOG_DATA);
  
  readonly dialogRef = inject(MatDialogRef<MessagePopupComponent>);

  colorFromType(){
    switch(this.data.type){
      case "warning":
        return "orange";
      case "error":
        return "red";
      case "info": 
      default:
        return "blue";
    }
  }
    
  onClose(): void {
          this.dialogRef.close();
        }
    
 
    //helper function for simply call:
    //NB: texte = pure texte or simple html texte , type ="info" or "warning" or "error"
    static messagePopup(dialog : MatDialog,titre:string,texte:string,type:string="info"){
          //NB: { disableClose : false } for simple popup (no modal)
          return dialog.open(MessagePopupComponent,
            { disableClose : false ,
              data: { titre : titre , texte : texte , type: type}
            })
        }

}
