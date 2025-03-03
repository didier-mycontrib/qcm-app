export class Answer {
    txtNum : string = "?"; // 'a' ou 'b' ou ... 
    text : string =""; // texte d'une bonne ou mauvaise reponse
    ok? : boolean = false; //during edition only (upload/post but not download/get)

    constructor(index:number=0){
      this.text='...';
      switch(index){
        case 0: this.txtNum='a'; break;
        case 1: this.txtNum='b'; break;
        case 2: this.txtNum='c'; break;
        case 3: this.txtNum='d'; break;
        case 4: this.txtNum='e'; break;
        case 5: this.txtNum='f'; break;
        case 6: this.txtNum='g'; break;
        case 7: this.txtNum='h'; break;
        default: this.txtNum='?';
      }
    }
}

export class Question {
    num: number | null ; // 1 or .. 
    question: string ; // texte de la question 
    image : string | null = null; // null ou chemin image  
    nbGoodAnswers : number; // 1 (exclusif) ou plus 
    answers : Answer[];//tableau des réponses (à choisir)

    constructor(num:number|null=null, nbAnswer:number=4){
        this.num=num;
        this.question="?";
        this.nbGoodAnswers=1; //default
        this.answers=[];
        for(let i=0;i<nbAnswer;i++){
          this.answers.push(new Answer(i));
        }
    }
}

export class Solution {
    num : number =0 ; // numero d'une question ( 1 ou plus) 
    goodAnswerNums : string[]=[]; // liste des bonnes réponses ['c'] ou ['a' , b']
}

export class ResponseChoices {
  num : number =0; // numero d'une question ( 1 ou plus) 
  selectedAnswerNums : string[]=[]; // liste des réponses sélectionnée ['c'] ou ['a' , b']
}

export class Qcm {
    id? : string ;
    title : string ="";
    purpose : string="training"; //"training" or "eval" or null/undefined (filter)
    keywords : string[]=[]; // categorie ou ...
    visibility : string="public"; //"public" or ...
    ownerId : string | null = null; // ...
    authorId : string | null = null; // null or ...
    nbQuestions : number = 0;
    questions : Question[]=[];
    choices? : ResponseChoices[]; //during session only
    solutions : Solution[]=[];
}

export class QcmPerformer{
  fullName : string="";
  email:string="";
  org:string="";
}

export class QcmGlobalResults{
  percentageScore : number = 0;
  nbGoodResponses : number =0;
}


export class QcmResults{
  id : string | null =null;  
  performer : QcmPerformer = new QcmPerformer();
  qcmId : string | null=null;
  choices : ResponseChoices[]=[];
  globalResults : QcmGlobalResults = new QcmGlobalResults();
}

/*
{
id:1av,
title : 'qcm a',
keywords : 'java or js or ...',
visibility : 'public' ,
owner-id : '?com.xx.yy' ou bien 'didier@d-defrance.fr'
author-id : null or 'jean.Bon?com.xx.yy',
nbQuestions : 2 ,
questions : [
  { num: 1 , question: 'quel est le plus grand ?' , image : null , nbGoodAnswers : 1,
    answers : [
	  { txtNum : 'a' , text : '12' }, { txtNum : 'b' , text : '12.01' }, 
      { txtNum : 'c' , text : '12.1' }, { txtNum : 'd' , text : '12.001' }, 	  
    ]
  },
   { num: 2 , question: 'qui est bleu ?' , image : null , nbGoodAnswers : 2,
    answers : [
	  { txtNum : 'a' , text : 'ciel' }, { txtNum : 'b' , text : 'arbre' }, 
      { txtNum : 'c' , text : 'stroumpf' }, { txtNum : 'd' , text : 'soleil' }, 	  
    ]
  }
],
solutions : [ 
  { num : 1 , goodAnswerNums : ['c'] } , { num : 2 , goodAnswerNums : ['a','c'] } 
]
}
*/