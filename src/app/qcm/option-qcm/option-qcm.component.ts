import { ChangeDetectorRef, Component, effect, inject, OnInit, Signal, signal, ViewChild, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter , map, mergeMap, toArray} from 'rxjs/operators';
import { Qcm } from '../../common/data/qcm';
import { QcmService } from '../../common/service/qcm.service';
import { FormsModule, NgForm } from '@angular/forms';
import { D2fNgxChoiceFieldComponent, D2fNgxLabelInputFieldComponent} from 'd2f-ngx-forms';
import { D2fNgxTogglePanelComponent } from 'd2f-ngx-components';

@Component({
  selector: 'app-option-qcm',
  imports: [FormsModule,D2fNgxLabelInputFieldComponent,D2fNgxChoiceFieldComponent,D2fNgxTogglePanelComponent],
  templateUrl: './option-qcm.component.html',
  styleUrls: ['./option-qcm.component.css']
})
export class OptionQcmComponent implements OnInit {

  changeDetectorRef = inject(ChangeDetectorRef);

  @ViewChild('formOptions', {static: true}) 
  private formOptions : NgForm | undefined;

  modeOpenState=signal(true);
  selectionOpenState=signal(false);

  exclusiveOpenStates = [ this.modeOpenState , this.selectionOpenState ];
  
  onExclusiveOpenState(oss : WritableSignal<boolean>){
     //console.log(`onExclusiveOpenState oss=${oss}`)
     for(let otherOss of this.exclusiveOpenStates ){
      if(otherOss!=oss && otherOss()){
        otherOss.set(false)
      }
     }
  }

  //specifications for qcm options ("default" or ...)
  public specif : string | null = null;
  public mode : string ="training" ; //or "eval"

  constructor(public route: ActivatedRoute,
              private router: Router,
              public qcmService : QcmService) { 
    this.specif = route.snapshot.params['specif'];
    console.log("specif="+this.specif);
  }
  public filtre : string ="";
  public msgFiltrage = signal("");

  public listeQcm=signal<Qcm[]>([]);
  public selectedQcm :Qcm | null = null;

  public onListeQcmAvecFiltrage():void {
    
      //pré-version pas encore optimisée:
      this.msgFiltrage.set("...")
      this.qcmService.findQcmFromCriteria(this.mode)
      .pipe(
        map( (qcmList : Qcm[]) => qcmList.filter( (qcm)=>qcm.title.toLowerCase().includes(this.filtre.toLowerCase())))
      ).subscribe({
        next: qcmList=>{this.listeQcm.set(qcmList); 
                        this.msgFiltrage.set(`${qcmList.length} qcm found` )
                       console.log(JSON.stringify(qcmList));
                      },
        error:  (err)=> { console.log(err);    this.msgFiltrage.set(`error , not found` ) }
        });

  }

  public reinit(){
    console.log("reinit, mode="+this.mode);
    this.listeQcm.set([]);
    this.selectedQcm = null;
  }

  public onSelectQcm(q:Qcm){
    this.selectedQcm=q;
  }

  public isReadyForPerform() : boolean{
    if(this.selectedQcm==null) return false;
    if(this.formOptions){
      if(this.mode=="eval" && !this.formOptions.form.valid)return false;
    }
    return true;
  }


  public onEffectuerQcm():void {
    this.qcmService.qcmSession.mode=this.mode;
    this.qcmService.qcmSession.qcm=this.selectedQcm;
    let link = ['/ngr-qcm/perform']; 
    this.router.navigate( link );
  }


  ngOnInit() {
  }


}
