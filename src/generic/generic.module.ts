import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenericCrudComponent } from './generic-crud/generic-crud.component';



@NgModule({
  imports: [
    CommonModule , FormsModule , RouterModule , BrowserAnimationsModule 
    ],
  exports: [
    GenericCrudComponent
  ],
  declarations: [  
      GenericCrudComponent
  ]
})
export class GenericModule { }
