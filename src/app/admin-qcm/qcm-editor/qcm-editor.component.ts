import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Qcm, Question } from 'src/app/common/data/qcm';

@Component({
  selector: 'qcm-qcm-editor',
  templateUrl: './qcm-editor.component.html',
  styleUrls: ['./qcm-editor.component.scss']
})
export class QcmEditorComponent implements OnInit , OnChanges{
  

  @Input()
  qcm : Qcm | null =null ;

  public tabResNumFromIndex : string[] = [ 'a' , 'b' , 'c' , 'd' , 'e' , 'f' ,'g' , 'h'];

  constructor() { 
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
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
        console.log("i="+i+",j="+j+":"+this.qcm.questions[i].answers[j].ok);
   }
 }
  }

  ngOnInit() {
  }

  onUpdateSolutions(i:number,j:number){
    
  }

  addNewQuestion(){
    if(this.qcm==null) return;
    let currNbQuestions = this.qcm.questions.length;
    this.qcm.questions.push(new Question(++currNbQuestions));
    this.qcm.nbQuestions=this.qcm.questions.length;
  }

  removeLastQuestion(){
    if(this.qcm==null) return;
    this.qcm.questions.pop();
    this.qcm.nbQuestions=this.qcm.questions.length;
  }

}
