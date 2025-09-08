import { Component } from '@angular/core';
import { Qcm, Solution } from '../common/data/qcm';
import { QcmService } from '../common/service/qcm.service';
import { QcmEditorComponent } from './qcm-editor/qcm-editor.component';
import { GenericCrudContext } from '../shared/component/crud/GenericCrudContext';
import { FormsModule } from '@angular/forms';
import { GenericCrudComponent } from '../shared/component/crud/generic-crud/generic-crud.component';
import { QcmHelper } from '../common/helper/qcm-helper';


@Component({
  selector: 'qcm-admin-qcm',
  imports: [QcmEditorComponent,FormsModule,GenericCrudComponent ],
  templateUrl: './admin-qcm.component.html',
  styleUrls: ['./admin-qcm.component.scss']
})
export class AdminQcmComponent{

  objectHelper = new QcmHelper();
  genericCrudContext : GenericCrudContext<Qcm,String> ;
  //specific subpart for Qcm or Contect or other Entity
  //this specific subpart is based on sub-sub-part "GenericContexHelper" implements by this class .

  constructor(public qcmService : QcmService) {
    this.genericCrudContext = new GenericCrudContext<Qcm,String>(this.objectHelper,this.qcmService);
    this.genericCrudContext.requiredRole="admin"; //to use private URL for get
                                                  //IMPORTANT: public results without responses , private results with responses
    this.genericCrudContext.filterDefs=[
    ]
   }

}