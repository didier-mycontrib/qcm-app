import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { QcmSession } from '../../common/session/qcm-session';
import { Question, ResponseChoices, Qcm } from '../../common/data/qcm';
import { PostChoicesResponse } from '../../common/data/postChoicesData';
import { QcmService } from '../../common/service/qcm.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

interface IBooleanDictionary {
  [index: string]: boolean;
}

@Component({
  selector: 'app-perform-qcm',
  imports: [FormsModule,NgFor],
  templateUrl: './perform-qcm.component.html',
  styleUrls: ['./perform-qcm.component.scss']
})
export class PerformQcmComponent implements OnInit {

  public selections : IBooleanDictionary={};
  public qcmSession : QcmSession = new QcmSession();
  public currentQuestion : Question | null = null ;
  public numQuestion : number = 0;
  public currentRandomIndice : number = 0;
  public nbQuestions: number = 0;
  public ramdomDeltaIndice :number = 0;

  constructor(public qcmService : QcmService,
              private router: Router) { 
                this.initBeginingBeforeQcmLoading();
                this.loadQcmQuestions();
              }

  loadQcmQuestions(){
    //NB: after qcm choice , this.qcmService.qcmSession.qcm
    //contains no details (no questions)
    let choosedQcmId = "?";
    if(this.qcmService.qcmSession && this.qcmService.qcmSession.qcm && this.qcmService.qcmSession.qcm.id)
    choosedQcmId =  this.qcmService.qcmSession.qcm.id;
    this.qcmService.getEntityObjectById$(choosedQcmId)
         .subscribe(
           (qcm:Qcm)=>{this.qcmService.qcmSession.qcm=qcm;
                       this.initBeginingAfterQcmLoading();},
           (error)=>{console.log(error);}
         );
  }

  initBeginingBeforeQcmLoading(){
    this.qcmSession = this.qcmService.qcmSession;
    this.numQuestion=1;
  }
  initBeginingAfterQcmLoading(){
    this.nbQuestions = (this.qcmSession.qcm as Qcm).nbQuestions;
    this.ramdomDeltaIndice = Math.floor(Math.random() *  this.nbQuestions);
    //console.log("ramdomDeltaIndice="+this.ramdomDeltaIndice);
    (this.qcmSession.qcm as Qcm).choices = [];
    this.initCurrentQuestion();
  }

  indiceWithRandomDelta(normalIndice : number):number{
    let new_indice = normalIndice + this.ramdomDeltaIndice;
    if(new_indice >= this.nbQuestions){
      new_indice -= this.nbQuestions;
    }
    //console.log("new_indice="+new_indice);
    return new_indice;
  }

  initCurrentQuestion(){
    if(this.numQuestion <= (this.qcmSession.qcm as Qcm).nbQuestions){
      this.qcmSession.currentQuestionNum=this.numQuestion;
      this.currentRandomIndice = this.indiceWithRandomDelta(this.numQuestion-1);
      this.currentQuestion=(this.qcmSession.qcm as Qcm).questions[this.currentRandomIndice/*this.numQuestion-1*/];
      this.selections={};
      for(let a of this.currentQuestion.answers){
        this.selections[a.txtNum as any]=false;
      }
    }
  }         
  
  public onNext() : void {
     this.onValiderCurrentQuestion();//valider(enregister) choix question courante
     if(this.numQuestion <this.nbQuestions){
      this.numQuestion++;
      this.initCurrentQuestion();
     }
     else{
       if(this.qcmSession.qcm && this.qcmSession.qcm.choices)
           this.qcmSession.qcm.choices = this.qcmSession.qcm.choices.sort((ca, cb) => ca.num < cb.num ? -1 : 1);
       this.qcmService.postQcmChoices((this.qcmSession.qcm as Qcm).id as string,
                                      (this.qcmSession.qcm as Qcm).choices as ResponseChoices[], 
                                      this.qcmSession.performer,
                                      this.qcmSession.mode)
       .subscribe(
         (resp:PostChoicesResponse)=>{ 
                  //console.log("postQcmChoices resp="+JSON.stringify(resp));
                  console.log("resultsId="+resp.qcmResultsId);
                  //store user choices (to not lost them)
                  let qcmSessionChoices = this.qcmService?.qcmSession?.qcm?.choices;

                  let qcmInSessionInService = this.qcmService.qcmSession.qcm=resp.qcm;//with .solutions in mode=training or ...
                 
                  if(qcmInSessionInService!=null)
                       qcmInSessionInService.choices=qcmSessionChoices; //restore user choices under .qcm
                      
                  this.qcmSession.results=resp.globalResults;
                  let link = ['/ngr-qcm/results']; 
                  this.router.navigate( link );
                  },
         (error)=>{console.log(error);}
       );
      
     }
  }

  public onValiderCurrentQuestion(): void {
    if(this.currentQuestion == null) return;
    let responseChoices = new  ResponseChoices();
    responseChoices.num=this.currentRandomIndice+1;//this.numQuestion;
    responseChoices.selectedAnswerNums=[];
    for(let a of this.currentQuestion.answers){
      //console.log(a.txtNum + ' ' + this.selections[a.txtNum]);
      if(this.selections[a.txtNum as any]){
        responseChoices.selectedAnswerNums.push(a.txtNum)
      }
    }
    if(this.qcmSession && this.qcmSession.qcm && this.qcmSession.qcm.choices )
          this.qcmSession.qcm.choices.push(responseChoices);
  }

  ngOnInit() {
  }

}
