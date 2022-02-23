
import { ResponseChoices, Qcm , QcmPerformer, QcmGlobalResults } from './qcm';

export class PostChoicesRequest{
    qcmId :string|null=null;
    mode:string="training"; //"training" or "eval" or ...
    qcmPerformer: QcmPerformer = new QcmPerformer();
    choices : ResponseChoices[]=[];
}

export class PostChoicesResponse{
    qcmResultsId :string="";
    qcm: Qcm | null = null; //with solutions in mode=training or ...
    globalResults : QcmGlobalResults | null = null;
}