import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { D2fNgxTogglePanelComponent } from 'd2f-ngx-components';
import { QcmService } from '../common/service/qcm.service';
import { Qcm } from '../common/data/qcm';
import { filter, mergeMap, Observable, toArray } from 'rxjs';
import { D2fNgxChoiceFieldComponent, D2fNgxLabelInputFieldComponent } from 'd2f-ngx-forms';

@Component({
  selector: 'app-import-export-qcm',
  imports: [FormsModule,D2fNgxLabelInputFieldComponent,D2fNgxChoiceFieldComponent,
           D2fNgxTogglePanelComponent,AsyncPipe,JsonPipe],
  templateUrl: './import-export-qcm.component.html',
  styleUrl: './import-export-qcm.component.css'
})
export class ImportExportQcmComponent {

   constructor(public qcmService : QcmService) { 
    }

    exportOpenState=signal(true);
    importOpenState=signal(false);
    
    exclusiveOpenStates = [ this.exportOpenState , this.importOpenState ];
      
      onExclusiveOpenState(oss : WritableSignal<boolean>){
         //console.log(`onExclusiveOpenState oss=${oss}`)
         for(let otherOss of this.exclusiveOpenStates ){
          if(otherOss!=oss && otherOss()){
            otherOss.set(false)
          }
         }
      }

  public mode : string ="training" ; //or "eval"
  public filtre : string ="";
  public msgFiltrage = "";

  public listeQcm =signal<Qcm[]>([]);
  public selectedQcm :Qcm | null = null;

  public onListeQcmAvecFiltrage():void {
      //pré-version pas encore optimisée:
      this.qcmService.findQcmFromCriteria(this.mode)
      .pipe(
        mergeMap(itemInTab=>itemInTab) ,
        filter((qcm: Qcm)=> qcm.title.toLowerCase().includes(this.filtre.toLowerCase()) ),
        toArray()
      ).subscribe(plans=>{this.listeQcm.set(plans); console.log(JSON.stringify(plans));});

  }

  public reinit(){
    this.listeQcm.set([]);
    this.selectedQcm = null;
  }


  exportedQcm$! : Observable<Qcm> ;

  public onExportQcm(q:Qcm){
    this.selectedQcm=q;
    if(this.selectedQcm==null || this.selectedQcm?.id == null) return;
    console.log("onExportQcm of id="+this.selectedQcm?.id);
    this.exportedQcm$ = this.qcmService.getQcmWithSolutionsById$(this.selectedQcm?.id);
   // this.exportedQcm$.subscribe((qcm)=>{console.log("exportedQcm="+JSON.stringify(qcm))})
  }

  importedJsonQcm = signal("");
  importMessage =signal("");

  public tabResNumFromIndex : string[] = [ 'a' , 'b' , 'c' , 'd' , 'e' , 'f' ,'g' , 'h'];

  public onImportQcm(){
    try{
      let qcm :Qcm = JSON.parse(this.importedJsonQcm());
      qcm.id=undefined ; //réinitialisation de l'id pour éviter tout éventuel conflit
      qcm.title=qcm.title + "_imported"
      //ajustement des .ok selon solutions avant ajout/post:
      for(let i = 0 ; i < qcm.solutions.length; i++){
          for(let j=0;j<4;j++){
            if(qcm.solutions[i].goodAnswerNums.includes(this.tabResNumFromIndex[j]))
              qcm.questions[i].answers[j].ok=true;
          }
      }

      this.qcmService.postEntityObject$(qcm).subscribe({
        next : (savedQcm)=>{ this.importMessage.set("qcm is imported/saved");
                             this.importedJsonQcm.set("");
         } ,
        error : (err)=>{this.importMessage.set("error: qcm can not be imported")} 
      })
    }catch(ex){
      this.importMessage.set("error: " + ex);
    }
  }
}
