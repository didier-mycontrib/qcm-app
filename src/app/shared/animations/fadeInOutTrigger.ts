import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadeInOutTrigger = 
trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(750)),
  ]);

  /*
    exemple d'utilisation:
    
    @Component({...,
      animations: [ fadeInOutTrigger , ... ]
    })

   <li *ngFor="let list of listItem" [@fadeInOut]>
      {{list}}
    </li>

    */