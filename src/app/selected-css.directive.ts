import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSelectedCss]'
})
export class SelectedCssDirective {

  constructor(private _ren: Renderer2, private _el: ElementRef) { }

  @HostListener('click') onClick() {
    this._ren.addClass(this._el.nativeElement, 'selectedItem');
   
  }

}
