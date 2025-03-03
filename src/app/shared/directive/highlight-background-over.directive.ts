import { Directive, ElementRef, HostBinding, HostListener, input, model } from '@angular/core';

@Directive({
  selector: '[highlightBackgroundOver]'
})
export class HighlightBackgroundOverDirective {

    private _defaultBackgroundColor ='white';
    private _defaultBackgroundColorOver = 'yellow';

   //tricky : default value may be override by empty string on attribute directive
   //if no specific value set ==> set defaut value in ngOnInit() if == empty string
    public highlightBackgroundOver = model(""); 

    constructor(private el: ElementRef) { 
    }

    ngOnInit(){
      let originalBgColor = this.el.nativeElement.style.backgroundColor;
      //console.log("HighlightBackgroundOverDirective.ngOnInit() : originalBgColor="+originalBgColor);
      this._defaultBackgroundColor = originalBgColor;
      if(this.highlightBackgroundOver()=="")
        this.highlightBackgroundOver.set(this._defaultBackgroundColorOver);
      //console.log("HighlightBackgroundOverDirective.ngOnInit() : highlightBackgroundOver="+this.highlightBackgroundOver());
    }
  
    @HostListener('mouseenter')
    onMouseEnter() { 
      this.currentBackgroundColor =this.highlightBackgroundOver();
      this.el.nativeElement.style.backgroundColor=this.currentBackgroundColor;
     }

    @HostListener('mouseleave') 
    onMouseLeave() { 
      this.currentBackgroundColor =this._defaultBackgroundColor??'white'; 
      this.el.nativeElement.style.backgroundColor=this.currentBackgroundColor;
    }
  
    //@HostBinding('style.backgroundColor') 
    //piège : @HostBinding('style.backgroundColor') seems to be applied before constructor
    //so explicit call to this.el.nativeElement.style.backgroundColor=....
    //may be a preferable approach to not override original value (set from css)
    currentBackgroundColor: string = this._defaultBackgroundColor;

}
