import { Component } from '@angular/core';
import { Qcm, Solution } from '../common/data/qcm';
import { QcmService } from '../common/service/qcm.service';
import { QcmEditorComponent } from './qcm-editor/qcm-editor.component';
import { GenericCrudContext } from 'd2f-ngx-crud';
import { FormsModule } from '@angular/forms';
import { D2fNgxGenericCrudComponent } from 'd2f-ngx-crud';
import { QcmHelper } from '../common/helper/qcm-helper';
import { D2fNgxChoiceFieldComponent, D2fNgxLabelInputFieldComponent, D2fNgxReadOnlyFieldComponent } from 'd2f-ngx-forms';


@Component({
  selector: 'qcm-admin-qcm',
  imports: [QcmEditorComponent,FormsModule,D2fNgxGenericCrudComponent,D2fNgxReadOnlyFieldComponent, D2fNgxLabelInputFieldComponent, D2fNgxChoiceFieldComponent ],
  templateUrl: './admin-qcm.component.html',
  styleUrls: ['./admin-qcm.component.css']
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