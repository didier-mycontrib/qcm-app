import { NgStyle } from '@angular/common';
import { Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'my-message',
  imports: [NgStyle],
  templateUrl: './my-message.component.html',
  styleUrl: './my-message.component.scss'
})
export class MyMessageComponent {
   public defaultMessageColor = input("green"); //or ...
   public notificationTimeout = input(2500); //i 0 : no timeout else : automatic reset avec timeout in ms
   private _timeoutId : any = null;
   public message=model("");
   public sIsErr = computed( () =>  this.message().startsWith("err"));

   ngOnChanges(){
   console.log("MyMessageComponent.ngOnChanges : message="+this.message());
   if( this.notificationTimeout()>0){
     if(this._timeoutId){
          clearTimeout(this._timeoutId);
      }
      this._timeoutId = setTimeout(()=> { this.message.set("")}, this.notificationTimeout());
     // console.log("MyMessageComponent.ngOnChanges : _timeoutId="+this._timeoutId);
     }
  }

   setStyles(){
    return {
      'color' : this.sIsErr()?'red':this.defaultMessageColor(),
      'font-weight' : this.sIsErr()?"bold":"normal", 
      'font-style' : this.sIsErr()?"normal":"italic", 
    };
   }
}
