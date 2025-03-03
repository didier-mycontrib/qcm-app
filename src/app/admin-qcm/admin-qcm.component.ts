import { Component, OnInit } from '@angular/core';

import { Qcm, Solution } from '../common/data/qcm';
import { QcmService } from '../common/service/qcm.service';
import { QcmEditorComponent } from './qcm-editor/qcm-editor.component';
import { GenericCrudAbstractContextHelper } from '../shared/component/crud/abstract/GenericCrudAbstractContextHelper';
import { GenericCrudContext } from '../shared/component/crud/GenericCrudContext';
import { MyFormGroupWithLabelComponent } from '../shared/component/generic/my-form-group-with-label/my-form-group-with-label.component';
import { FormsModule } from '@angular/forms';
import { GenericCrudComponent } from '../shared/component/crud/generic-crud/generic-crud.component';
import { QcmHelper } from '../common/helper/qcm-helper';
import { ObjectHelper } from '../shared/helper/object-helper';
import { GenericCrudHelper } from '../shared/component/crud/abstract/GenericCrudHelper';

@Component({
  selector: 'qcm-admin-qcm',
  imports: [QcmEditorComponent,FormsModule,GenericCrudComponent, MyFormGroupWithLabelComponent ],
  templateUrl: './admin-qcm.component.html',
  styleUrls: ['./admin-qcm.component.scss']
})
export class AdminQcmComponent implements OnInit ,  GenericCrudAbstractContextHelper<Qcm,String>{

  genericCrudContext : GenericCrudContext<Qcm,String> ;
  //specific subpart for Qcm or Contect or other Entity
  //this specific subpart is based on sub-sub-part "GenericContexHelper" implements by this class .

  constructor(public qcmService : QcmService) {
    this.genericCrudContext = new GenericCrudContext<Qcm,String>(this);
    this.genericCrudContext.requiredRole="admin"; //to use private URL for get
                                                  //IMPORTANT: public results without responses , private results with responses
    this.genericCrudContext.filterDefs=[
    ]
   }

  objectHelper(): ObjectHelper<Qcm, String> {
      return new QcmHelper();
  }

  crudHelper(): GenericCrudHelper<Qcm, String> | null {
    return null;
}
  
  ngOnInit(): void {
  }
}