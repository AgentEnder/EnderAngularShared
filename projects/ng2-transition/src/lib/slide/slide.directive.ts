import { Directive, Input, Renderer2, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';

export enum NG2T_SLIDE_DIRECTIONS {
  VERTICAL = 'VERTICAL',
  HORIZONTAL = 'HORIZONTAL',
}

@Directive({
  selector: '[ng2tSlide]',
  exportAs: 'ng2tSlide'
})
export class Ng2tSlideDirective implements AfterViewInit {

  static DEFAULT_DURATION = 1;
  static DEFAULT_DIRECTION = NG2T_SLIDE_DIRECTIONS.VERTICAL;
  static DATA_ATTR = 'data-collapsed';

  @Input() direction: NG2T_SLIDE_DIRECTIONS = Ng2tSlideDirective.DEFAULT_DIRECTION;
  @Input() duration: number = Ng2tSlideDirective.DEFAULT_DURATION;

  cachedDisplayMethod: string;

  private nativeElement: HTMLElement;
  private cancelHide = false;

  private get collapsed() {
    return this.nativeElement.getAttribute('data-collapsed') === 'true';
  }

  private set collapsed(value: boolean) {
    this.renderer.setAttribute(this.nativeElement, 'data-collapsed', value ? 'true' : 'false');
  }

  constructor(private renderer: Renderer2, private el: ElementRef, private cdr: ChangeDetectorRef) {
    this.nativeElement = el.nativeElement;
  }

  ngAfterViewInit() {
    this.cachedDisplayMethod = window.getComputedStyle(this.nativeElement).display;
  }

  show() {
    this.renderer.setStyle(this.nativeElement, 'overflow', 'hidden');
    if (!this.collapsed) {
      return;
    }

    this.cancelHide = true;
    const height = this.calculateFullHeight();
    this.renderer.setStyle(this.nativeElement, 'height', '0');
    setTimeout(() => { // required for transition to work.
      this.renderer.setStyle(this.nativeElement, 'transition', `height ${this.duration}s linear`);
      this.renderer.setStyle(this.nativeElement, 'height', height);
      this.collapsed = false;
    });
  }

  hide() {
    this.renderer.setStyle(this.nativeElement, 'overflow', 'hidden');
    const height = this.nativeElement.scrollHeight + 'px';
    this.renderer.setStyle(this.nativeElement, 'height', height);
    this.renderer.setStyle(this.nativeElement, 'transition', `height ${this.duration}s linear`);
    setTimeout(() => {
      this.renderer.setStyle(this.nativeElement, 'height', '0');
      setTimeout(() => { // wait for duration, don't change display property until fully collapsed.
        if (this.cancelHide === false && !this.collapsed) {
          this.renderer.setStyle(this.nativeElement, 'display', 'none');
          this.removeUnnecessaryInlineStyles();
          this.collapsed = true;
        }
        this.cancelHide = false;
      },
      this.duration * 1000
      );
    });
  }

  toggle() {
    if (this.collapsed) {
      this.show();
    } else {
      this.hide();
    }
  }

  removeUnnecessaryInlineStyles() {
    this.renderer.removeStyle(this.nativeElement, 'transition');
    if (this.direction === NG2T_SLIDE_DIRECTIONS.HORIZONTAL) {
      this.renderer.removeStyle(this.nativeElement, 'width');
    } else {
      this.renderer.removeStyle(this.nativeElement, 'height');
    }
  }

  calculateFullHeight() {
    this.renderer.setStyle(this.nativeElement, 'display', this.cachedDisplayMethod);
    this.renderer.setStyle(this.nativeElement, 'height', 'auto');
    return this.nativeElement.scrollHeight + 'px';
  }

}