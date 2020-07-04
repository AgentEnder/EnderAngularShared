import { Ng2tSlideDirective } from './slide.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

// Simple test component that will not in the actual app
@Component({
  template: `


  <button (click)="directive.show()" id="showButton">Show</button>
  <button (click)="directive.hide()" id="hideButton">Hide</button>
  <button (click)="directive.toggle()" id="toggleButton">Toggle</button>
  <p ng2tSlide #directive="ng2tSlide" id="testParagraph">Testing Directives is awesome!</p>
`
})
class TestComponent {
  // clickCount is not necessary but it's used here to verify that the component
  // is actually getting clicked
  clickCount = 0;

  constructor() { }
}

describe('SlideDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        Ng2tSlideDirective
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });


  it('should create an instance', () => {
    expect(fixture).toBeTruthy();
  });

  it('should hide', async () => {
    // Setup
    const debugEl: HTMLElement = fixture.debugElement.nativeElement;
    const hideBtn: HTMLElement = debugEl.querySelector('#hideButton');
    const test: HTMLElement = debugEl.querySelector('#testParagraph');
    test.removeAttribute(Ng2tSlideDirective.DATA_ATTR); // Cleanup in case of test order.

    // Act
    hideBtn.click();
    await timeout(Ng2tSlideDirective.DEFAULT_DURATION * 1.5 * 1000); // wait for animation to finish

    // Verify
    console.dir(checkCollapsed(test));

    expect(test.style.display === 'none').toBeTruthy();
  });

  it('should show', async () => {

    // Setup
    const debugEl: HTMLElement = fixture.debugElement.nativeElement;
    const showBtn: HTMLElement = debugEl.querySelector('#showButton');
    const test: HTMLElement = debugEl.querySelector('#testParagraph');
    test.removeAttribute(Ng2tSlideDirective.DATA_ATTR); // Cleanup in case of test order.

    // Act
    showBtn.click();
    await timeout(Ng2tSlideDirective.DEFAULT_DURATION * 1.5 * 1000); // wait for animation to finish

    // Verify
    const collapsed = checkCollapsed(test);
    const displayNone = test.style.display === 'none';
    const collapsedOrDisplayNone = displayNone || collapsed;
    expect(!(collapsedOrDisplayNone)).toBeTruthy();
  });

});

function timeout(ms) { // pass a time in milliseconds to this function
  return new Promise(resolve => setTimeout(resolve, ms));
}

function checkCollapsed(el: HTMLElement) {
  return el.getAttribute(Ng2tSlideDirective.DATA_ATTR) === 'true';
}