import { Component, inject, input } from '@angular/core';
import { MyImportMaterialModule } from '../../../imports/my-import-material.module';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChildrenOutletContexts } from '@angular/router';

export interface SimpleDialogInput{
  title : string|null,
  label : string,
  defaultValue : string,
  choices : string[] | null
}


@Component({
  selector: 'app-input-dialog',
  imports: [MyImportMaterialModule,FormsModule],
  templateUrl: './input-dialog.component.html',
  styleUrl: './input-dialog.component.scss'
})
export class InputDialogComponent {

  public data = inject<SimpleDialogInput>(MAT_DIALOG_DATA);
  value : string = "";

  ngOnInit(){
    if(this.data.title==undefined)
      this.data.title=this.data.label+" ?";
    this.value= this.data.defaultValue;
  }

  readonly dialogRef = inject(MatDialogRef<InputDialogComponent>);
  
  onCancel(): void {
        this.dialogRef.close(this.data.defaultValue);
      }
  
  
  onOk(): void {
        this.dialogRef.close(this.value);
      }

  //helper function for simply call:
  static inputDialog$(dialog : MatDialog,label:string , defaultValue : string="", title : string|null = null){
            //NB: { disableClose : true } for modal dialog box
            return dialog.open(InputDialogComponent,
              { disableClose : true ,
                data:  { title : title , label : label , defaultValue : defaultValue}
              }).afterClosed();
      }

//helper function for simply call:
static inputChoiceDialog$(dialog : MatDialog,label:string , choices: string[], defaultValue : string="", title : string|null = null){
  //NB: { disableClose : true } for modal dialog box
  return dialog.open(InputDialogComponent,
    { disableClose : true ,
      data:  { title : title , label : label , defaultValue : defaultValue , choices : choices }
    }).afterClosed();
}      
        
  
}
