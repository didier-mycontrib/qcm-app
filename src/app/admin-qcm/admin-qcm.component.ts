import { Component, OnInit } from '@angular/core';
import { GenericCrudAbstractContextHelper } from 'src/generic/GenericCrudAbstractContextHelper';
import { GenericCrudContext } from 'src/generic/GenericCrudContext';
import { Qcm, Solution } from '../common/data/qcm';
import { QcmService } from '../common/service/qcm.service';

@Component({
  selector: 'qcm-admin-qcm',
  templateUrl: './admin-qcm.component.html',
  styleUrls: ['./admin-qcm.component.scss']
})
export class AdminQcmComponent implements OnInit , GenericCrudAbstractContextHelper<Qcm>{
  
  public genericCrudContext : GenericCrudContext<Qcm> ;
  public tabResNumFromIndex : string[] = [ 'a' , 'b' , 'c' , 'd' , 'e' , 'f' ,'g' , 'h'];


  constructor(public qcmService : QcmService) {
    this.genericCrudContext = new GenericCrudContext<Qcm>(this);
   }

  ngOnInit() {
    this.genericCrudContext.onNewObjectGeneric();
  }

  //begin of implementation of methods of 
  //GenericCrudAbstractContextHelper interface:
  //--------------------------------------------

  public essentielObjectString(obj: Qcm): string {
    return obj.title + "("+obj.keywords+ ","+ obj.nbQuestions+"q)" ;
  }
  public buildEmptyObject(): Qcm {
    return new Qcm();
  }

  getEntityTypeName(): string {
    return "qcm";
  }

  onGetAllObjects(): void {
    this.qcmService.getAllObjects("admin")
    .subscribe((qcms:Qcm[])=> { this.genericCrudContext.tabObjects = qcms;
                                      console.log("qcms="+JSON.stringify(qcms)); });
  }
  
  onSupprimerObject(): void {
    this.qcmService.deleteEntityObjectServerSide(this.genericCrudContext.selectedObject?.id)
    .subscribe(()=>{this.genericCrudContext.endOfDeleteGeneric() },
              (err)=>{this.genericCrudContext.msg="echec suppression";}
    );
  }
  

  //end of implementation of methods of 
  //GenericCrudAbstractContextHelper interface:
  //--------------------------------------------

  //traitement equivalent eventuellement refait coté serveur
  //ici effectué coté client pour cohérence immédiate
  ajustSolutionsInQcm(qcm : Qcm): void{
    qcm.solutions=[];
    for(let i=0;i<qcm.nbQuestions;i++){
        qcm.solutions[i]=new Solution();
        qcm.solutions[i].num=qcm.questions[i].num as any;
        qcm.solutions[i].goodAnswerNums=[];
        for(let j=0;j<qcm.questions[i].answers.length;j++){
            if(qcm.questions[i].answers[j].ok!=null){
               if(qcm.questions[i].answers[j].ok==true){
                  qcm.solutions[i].goodAnswerNums.push(this.tabResNumFromIndex[j]) ;
               }            
            }
        }
    }
}


   onSubmit(){
     if(this.genericCrudContext.selectedObject==null) return;
    this.ajustSolutionsInQcm(this.genericCrudContext.selectedObject);
    if(this.genericCrudContext.mode=="newOne"){
       this.qcmService.postEntityObject(this.genericCrudContext.selectedObject)
       .subscribe(
         (savedQcm)=>{ this.genericCrudContext.addInTabAfterPostNewGeneric(savedQcm); },
         (err)=>{console.log(err); this.genericCrudContext.msg="echec ajout/sauvegarde (id unique?)"}
       );
    }
    else {
       this.qcmService.putEntityObject(this.genericCrudContext.selectedObject)
       .subscribe(
        (updatedQcm)=>{ this.genericCrudContext.selectedObject=updatedQcm;
          this.genericCrudContext.msg="contact modifié/sauvegardé"; },
        (err)=>{console.log(err); this.genericCrudContext.msg="echec modification/sauvegarde"}
      );
    }
  }


}

