import { Qcm, ResponseChoices, Solution, QcmPerformer, QcmGlobalResults } from '../data/qcm';


export class QcmSession {
    qcm : Qcm | null = null; //with .choices subpart for session only
    performer : QcmPerformer = new QcmPerformer();
    date : string="";
    mode : string="training"; //"training" or "eval" or ...
    currentQuestionNum : number | null = null;
    results : QcmGlobalResults | null= null;


   // buildResults() now server-side !!!
 /*
    buildResults():QcmGlobalResults{
        let qcmResults = new QcmGlobalResults();
        qcmResults.nbGoodResponses=0;
        for(let index in this.qcm.questions){
           let  respChoices : ResponseChoices = this.qcm.choices[index];
           let  solutionsQuestion : Solution = this.qcm.solutions[index];
           if(respChoices.num!=solutionsQuestion.num){
               throw "index exception in buildResults()";
           }else{
               let ok : boolean = true ; //by default (before verif)
               for(let goodResp of solutionsQuestion.goodAnswerNums){
                    if(!respChoices.selectedAnswerNums.includes(goodResp)){
                        ok=false; break;
                    }
               }
               //ok est encore à true si toutes les bonnes réponses ont été sélectionnées
               //tester si pas trop de sélections (et donc mauvaises réponses en trop):
               if(respChoices.selectedAnswerNums.length != solutionsQuestion.goodAnswerNums.length){
                   ok=false;
               }
               if(ok)
                  qcmResults.nbGoodResponses++;
           }
           qcmResults.percentageScore=(qcmResults.nbGoodResponses*100)/this.qcm.nbQuestions;
        }
        return qcmResults;
    }
    */
}

