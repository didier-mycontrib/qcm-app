import { Component, inject, TemplateRef } from '@angular/core';
import { MyImportMaterialModule } from '../../../imports/my-import-material.module';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

export interface TemplateDialogInput{
  title : string|null,
  template : TemplateRef<any>
}

@Component({
  selector: 'app-template-dialog',
  imports: [MyImportMaterialModule,FormsModule,CommonModule],
  templateUrl: './template-dialog.component.html',
  styleUrl: './template-dialog.component.scss'
})
export class TemplateDialogComponent {

    public data = inject<TemplateDialogInput>(MAT_DIALOG_DATA);
    value : any = "";

    ngOnInit(){
        if(this.data.title==undefined)
          this.data.title="modal dialog (settings)";
      }
    
      readonly dialogRef = inject(MatDialogRef<TemplateDialogComponent>);
      
      onCancel(): void {
            this.dialogRef.close(false);
          }
      
      
      onOk(): void {
            //result data are in external calling component contex (ex: this.resultContext)
            this.dialogRef.close(true);
          }

      //helper function for simply call:
      static templateDialog$(dialog : MatDialog,template: TemplateRef<any> , title : string|null = null){
                      //NB: { disableClose : true } for modal dialog box
            return dialog.open(TemplateDialogComponent,
                    { disableClose : true ,
                      data:  { title : title , template : template}
                  }).afterClosed();
        }
          
}
