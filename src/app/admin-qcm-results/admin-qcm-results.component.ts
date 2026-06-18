import { Component, inject, OnInit } from '@angular/core';
import { QcmResults, QcmPerformer, Qcm } from '../common/data/qcm';
import { QcmResultsService } from '../common/service/qcm-results.service';
import { GenericCrudContext } from 'd2f-ngx-crud';
import { D2fNgxGenericCrudComponent } from 'd2f-ngx-crud';
import { QcmResultsHelper } from '../common/helper/qcm-results-helper';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { FilterDef } from 'd2f-ngx-crud';
import { D2fNgxReadOnlyFieldComponent } from 'd2f-ngx-forms';
import { D2fNgxLabelAnyContentFieldComponent } from 'd2f-ngx-forms';
import { QcmService } from '../common/service/qcm.service';
import { GenericMapCacheDataService } from '../common/service/generic-map-cache-data.service';

@Component({
  selector: 'app-admin-qcm-results',
  imports: [FormsModule,NgFor,D2fNgxGenericCrudComponent,D2fNgxReadOnlyFieldComponent,D2fNgxLabelAnyContentFieldComponent],
  templateUrl: './admin-qcm-results.component.html',
  styleUrls: ['./admin-qcm-results.component.css']
})
export class AdminQcmResultsComponent {
    objectHelper = new QcmResultsHelper();
    genericCrudContext : GenericCrudContext<QcmResults,String> ;
    //specific subpart for Qcm or Contect or other Entity
    //this specific subpart is based on sub-sub-part "GenericContexHelper" implements by this class .
  
    constructor(public qcmResultsService : QcmResultsService) {
      this.genericCrudContext = new GenericCrudContext<QcmResults,String>(this.objectHelper,this.qcmResultsService);
      this.genericCrudContext.requiredRole="admin"; //to use private URL for get
                                                    //IMPORTANT: public results without responses , private results with responses
      this.genericCrudContext.availableActions="READ,DELETE"; //no "NEW,ADD,UPDATE"                                                  
      this.genericCrudContext.filterDefs=[
        //new FilterDef("serverSide" , "changeMini=",1,["0"]),
        new FilterDef("clientSide" , "qcmId=",1,["?"] , (obj:QcmResults)=>obj.qcmId == "?"),
        new FilterDef("clientSide" , "performer.name= ",1,["?"] , (obj:QcmResults)=>obj.performer.fullName.includes('?')),
        new FilterDef("clientSide" , "performer.org= ",1,["?"] , (obj:QcmResults)=>obj.performer.org.includes('?')),
      ]
     }


     //V1 (strore qcmId/qcmtitle in map for futur display), v2: qcmTitle may be return in qcmResult
     qcmService = inject(QcmService);
     genericMapCacheDataService = inject(GenericMapCacheDataService);

     ngOnInit(){
      this.qcmService.findQcmFromCriteria("eval").subscribe(
          qcmList=>{qcmList.forEach(
            (qcm)=>{this.genericMapCacheDataService.set((qcm.id??0).toString(),qcm.title)}
          );
        }
      )
     }
  
}
