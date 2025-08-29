import { Component, OnInit, Input, OnChanges , SimpleChanges} from '@angular/core';
import { Qcm, Question } from '../../common/data/qcm';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'qcm-qcm-editor',
  imports:[FormsModule,NgFor],
  templateUrl: './qcm-editor.component.html',
  styleUrls: ['./qcm-editor.component.scss']
})
export class QcmEditorComponent implements OnInit , OnChanges{
  

  @Input()
  qcm : Qcm | null =null ;

  public tabResNumFromIndex : string[] = [ 'a' , 'b' , 'c' , 'd' , 'e' , 'f' ,'g' , 'h'];

  constructor() { 
  }

  //NB: ngOnChanges est appelé lorsque l'on change de qcm (sélection , chargement)
  //le code si dessous balaye et analyse les parties.solutions
  //pour recalculer (mettre à jour) la partie temporaire 
  //this.qcm.questions[i].answers[j].ok (ce qui a pour effet de contrôler si une case est cohée ou pas=)
  ngOnChanges(changes: SimpleChanges): void {
    if(this.qcm==null) return;
    for(let i=0;i<this.qcm.nbQuestions;i++){
      for(let j=0;j<this.qcm.questions[i].answers.length;j++){
        let goodResp : boolean = false;
        if(this.qcm.solutions[i]!=null && 
            this.qcm.solutions[i].goodAnswerNums.includes(
                                  this.tabResNumFromIndex[j])){
            goodResp = true;
        }
        this.qcm.questions[i].answers[j].ok=goodResp;
        //console.log("i="+i+",j="+j+":"+this.qcm.questions[i].answers[j].ok);
   }
 }
  }

  ngOnInit() {
  }

  //NB: invoked by (ngModelChange)="onUpdateSolutions(i,j) on checkbox (good answer or not)
  onUpdateSolutions(i:number,j:number){
     //console.log("onUpdateSolutions called with i="+i+",j="+j);
      if(this.qcm==null) return;
      let goodAnswerNums=[]
      // on balaye (via indice j) toutes les checkbox associées à la question courante numero i
      for(let j=0;j<this.qcm.questions[i].answers.length;j++){
          if(this.qcm.questions[i].answers[j].ok){
             goodAnswerNums.push(this.tabResNumFromIndex[j])
          }
      }
     //console.log("goodAnswerNums="+goodAnswerNums)
      this.qcm.solutions[i].goodAnswerNums=goodAnswerNums
      //console.log("updated solution="+JSON.stringify(this.qcm.solutions[i]))
  }

  addNewQuestion(){
    if(this.qcm==null) return;
    let currNbQuestions = this.qcm.questions.length;
    this.qcm.questions.push(new Question(++currNbQuestions));
    this.qcm.nbQuestions=this.qcm.questions.length;
    if(this.qcm.solutions==null)
       this.qcm.solutions=[]
    this.qcm.solutions.push({num:this.qcm.nbQuestions , goodAnswerNums:[]})
   // console.log("addNewQuestion called , this.qcm="+JSON.stringify(this.qcm))
  }

  removeLastQuestion(){
    if(this.qcm==null) return;
    this.qcm.questions.pop();
    this.qcm.nbQuestions=this.qcm.questions.length;
    this.qcm.solutions.pop();
    //console.log("removeLastQuestion called , this.qcm="+JSON.stringify(this.qcm))
  }

}
