import { trigger, state, style, transition, animate , sequence } from '@angular/animations';

//NB: group( [ parallelsanimations ]) , sequence([ sequentialAnimations])

export const shakeTrigger = 
    trigger('shake', [
      state('normal', style({ transform: 'rotate(0) '})),
      state('animed', style({ transform: 'rotate(0deg) '})),
      transition('normal=>animed', sequence(
        [
          animate('200ms' , style({ transform: 'rotate(10deg)' , border : '3px solid black'})),
          animate('200ms' , style({ transform: 'rotate(-10deg)'})),
          animate('200ms' , style({ transform: 'rotate(10deg)'})),
          animate('200ms' , style({ transform: 'rotate(-10deg)'})),
        ]
      )),
      transition('normal=>animed', animate('1ms'))
    ]);

    /*
    exemple d'utilisation:
    
    @Component({...,
      animations: [ shakeTrigger , ... ]
    })

    <div [@shake]="taux<20?'smaller':'normal'">essai animation 
       avec [@xyTrigger]="stateXorY", taux={{taux}}</div>

    */