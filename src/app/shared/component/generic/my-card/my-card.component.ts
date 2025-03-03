import { Component, input } from '@angular/core';

@Component({
  selector: 'my-card',
  imports: [],
  templateUrl: './my-card.component.html',
  styleUrl: './my-card.component.scss'
})
export class MyCardComponent {
  title  =input("?");
}
