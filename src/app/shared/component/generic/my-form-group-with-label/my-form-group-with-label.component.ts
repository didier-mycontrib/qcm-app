import { Component, input } from '@angular/core';

@Component({
  selector: 'my-formgroup-label',
  imports: [],
  templateUrl: './my-form-group-with-label.component.html',
  styleUrl: './my-form-group-with-label.component.scss'
})
export class MyFormGroupWithLabelComponent {
  label  =input("?");
}
