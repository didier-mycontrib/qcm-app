import { Component, OnInit, Input } from '@angular/core';
import { GenericCrudContext } from '../GenericCrudContext';

@Component({
  selector: 'generic-crud',
  templateUrl: './generic-crud.component.html',
  styleUrls: ['./generic-crud.component.scss']
})
export class GenericCrudComponent implements OnInit {

  public msg : string | null = null;

  @Input()
  public genericCrudContext : GenericCrudContext<any> | null = null;

  constructor() { }

  ngOnInit() {
  }

}
