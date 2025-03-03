import { Directive, ElementRef, HostBinding, HostListener, model } from '@angular/core';

@Directive({
  selector: '[highlightBorderOver]'
})
export class HighlightBorderOverDirective {

    private _transparentBorderColor = 'rgba(255,255,255,0)';
    private _defaultBorderColorOver = 'black';
 
    //tricky : default value may be override by empty string on attribute directive
    //if no specific value set ==> set defaut value in ngOnInit() if == empty string
     public highlightBorderOver = model(""); 
 
     constructor(private el: ElementRef) { 
     }
 
     ngOnInit(){
       this.el.nativeElement.style.borderStyle="solid";
       this.el.nativeElement.style.borderWidth="2px";
       if(this.highlightBorderOver()=="")
         this.highlightBorderOver.set(this._defaultBorderColorOver);
     }
   
     @HostListener('mouseenter')
     onMouseEnter() { 
       this.currentBorderColor =this.highlightBorderOver();
      // this.el.nativeElement.style.borderColor=this.currentBorderColor;
      }
 
     @HostListener('mouseleave') 
     onMouseLeave() { 
       this.currentBorderColor =this._transparentBorderColor; 
       //this.el.nativeElement.style.borderColor=this.currentBorderColor;
     }
   
     @HostBinding('style.borderColor') 
     currentBorderColor: string = this._transparentBorderColor;

}
