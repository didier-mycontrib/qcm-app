import { Component, OnInit } from '@angular/core';
import { QcmService } from '../../common/service/qcm.service';
import { QcmSession} from '../../common/session/qcm-session';
import { QcmGlobalResults } from '../../common/data/qcm';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-result-qcm',
  imports: [FormsModule,NgFor,NgIf,NgClass],
  templateUrl: './result-qcm.component.html',
  styleUrls: ['./result-qcm.component.scss']
})
export class ResultQcmComponent implements OnInit {
  public mode:string ; //"training" or "eval" or ....
  public qcmSession : QcmSession;
  public qcmResults : QcmGlobalResults | null;

  public tabResNumFromIndex : string[] = [ 'a' , 'b' , 'c' , 'd' , 'e' , 'f' ,'g' , 'h'];
  
  constructor(public qcmService : QcmService) { 
    this.qcmSession = this.qcmService.qcmSession;
    this.qcmResults = this.qcmSession.results;
    this.mode=this.qcmSession.mode;
  }

  setRespClasses(indexQuestion:number,indexResponse:number){
    let goodChoice = this.isGoodChoice(indexQuestion,indexResponse);
    let badResponse = this.isBadResp(indexQuestion,indexResponse);
    return {
      // CSS classes names
      'goodResponse' : !badResponse,
      'badResponse' : badResponse,
      'response':true,
      'smallHeight' : true,
      'withoutSolution' : this.mode!='training',
      'withSolution' : this.mode=='training'
      }
  }

  setChoixClasses(indexQuestion:number,indexResponse:number){
    let goodChoice = this.isGoodChoice(indexQuestion,indexResponse);
    let badResponse = this.isBadResp(indexQuestion,indexResponse);
    return {
      // CSS classes names
      'goodChoice' :  goodChoice ,
      'badChoice' :  !goodChoice ,
      'goodResponse' : !badResponse,
      'badResponse' : badResponse,
      'smallHeight' : true,
      'withoutSolution' : this.mode!='training'
      }
  }

  setQuestionClasses(indexQuestion:number){
    let goodQuestion = this.isGoodQuestion(indexQuestion);
    return {
      // CSS classes names
      'goodQuestion' :  goodQuestion ,
      'badQuestion' :  !goodQuestion ,
      'smallHeight' : true
      }
  }

  isGoodQuestion(indexQuestion:number):boolean{
    let goodQuestion=true;
    for(let j=0;j<4;j++){
      if(!this.isGoodChoice(indexQuestion,j)){
        goodQuestion=false;
      }
    }
    return goodQuestion;
  }

  isGoodChoice(indexQuestion:number,indexResponse:number):boolean{
    if(this.qcmSession == null) return false;
    if(this.qcmSession.qcm == null) return false;
    if(this.qcmSession.qcm.choices == null) return false;
    let tabGoodAnswersNums = this.qcmSession.qcm.solutions[indexQuestion].goodAnswerNums;
    let tabChoicesNums = this.qcmSession.qcm.choices[indexQuestion].selectedAnswerNums;
    let txtNum = this.tabResNumFromIndex[indexResponse];
    if(tabGoodAnswersNums.includes(txtNum) && tabChoicesNums.includes(txtNum))
      return true;
    else if(!tabGoodAnswersNums.includes(txtNum) && !tabChoicesNums.includes(txtNum))
      return true;
    else
     return false;
  }
  
  isBadResp(indexQuestion:number,indexResponse:number):boolean{
    if(this.qcmSession == null) return false;
    if(this.qcmSession.qcm == null) return false;
    return !this.qcmSession.qcm.solutions[indexQuestion].goodAnswerNums.includes(
            this.tabResNumFromIndex[indexResponse]);
  }

  ngOnInit() {
  }

}
