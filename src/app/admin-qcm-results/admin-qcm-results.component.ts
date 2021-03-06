import { Component, OnInit } from '@angular/core';
import { QcmResults, QcmPerformer } from '../common/data/qcm';
import { QcmResultsService } from '../common/service/qcm.service';

@Component({
  selector: 'app-admin-qcm-results',
  templateUrl: './admin-qcm-results.component.html',
  styleUrls: ['./admin-qcm-results.component.scss']
})
export class AdminQcmResultsComponent implements OnInit {
  
  public canDelete : boolean = false;
  public qcmResults :QcmResults[] = [];
  public msg:string="";
  
  constructor(public qcmResultsService : QcmResultsService) { 
  }


  onGetAllResults(): void {
    this.qcmResultsService.getAllObjects("admin")
    .subscribe((qcmRes:QcmResults[])=> { this.qcmResults = qcmRes;
                                      console.log("qcmRes="+JSON.stringify(qcmRes)); });
  }
  
  deleteQcmRes(qcmRes:QcmResults){
    this.qcmResultsService.deleteEntityObjectServerSide(qcmRes.id)
    .subscribe(()=>{this.msg='suppression ok'; 
                     this.qcmResults=this.qcmResults.filter((qr:QcmResults)=>qr!=qcmRes); },
              (err)=>{this.msg="echec suppression";}
    );
  }


  ngOnInit(){
     this.onGetAllResults();
  }

}
