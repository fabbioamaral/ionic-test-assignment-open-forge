import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appViewUser]'
})
export class ViewUserDirective {
  @Input() numberOfRepo: number;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.numberOfRepo > 2) this.el.nativeElement.style.color = 'red';
  }

}
