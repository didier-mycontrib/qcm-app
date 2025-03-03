import { Component, OnInit } from '@angular/core';
import { QcmResults, QcmPerformer, Qcm } from '../common/data/qcm';

import { QcmResultsService } from '../common/service/qcm-results.service';

import { GenericCrudAbstractContextHelper } from '../shared/component/crud/abstract/GenericCrudAbstractContextHelper';
import { GenericCrudHelper } from '../shared/component/crud/abstract/GenericCrudHelper';
import { GenericCrudContext } from '../shared/component/crud/GenericCrudContext';
import { ObjectHelper } from '../shared/helper/object-helper';
import { GenericCrudComponent } from '../shared/component/crud/generic-crud/generic-crud.component';
import { QcmResultsHelper } from '../common/helper/qcm-results-helper';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { FilterDef } from '../shared/data/filter-def';

@Component({
  selector: 'app-admin-qcm-results',
  imports: [FormsModule,NgFor,GenericCrudComponent],
  templateUrl: './admin-qcm-results.component.html',
  styleUrls: ['./admin-qcm-results.component.scss']
})
export class AdminQcmResultsComponent implements OnInit ,  GenericCrudAbstractContextHelper<QcmResults,String>{
  
    genericCrudContext : GenericCrudContext<QcmResults,String> ;
    //specific subpart for Qcm or Contect or other Entity
    //this specific subpart is based on sub-sub-part "GenericContexHelper" implements by this class .
  
    constructor(public qcmResultsService : QcmResultsService) {
      this.genericCrudContext = new GenericCrudContext<QcmResults,String>(this);
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
  
    objectHelper(): ObjectHelper<QcmResults, String> {
        return new QcmResultsHelper();
    }
  
    crudHelper(): GenericCrudHelper<QcmResults, String> | null {
      return null;
  }
    
    ngOnInit(): void {
    }
  
}
