/**
 * This is a utility directive to make sure the input fields have focus when they
 * come into view.
 */
 
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector : 'input'
})
export class FocusInput {
  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.element.nativeElement.focus();
  }
}
