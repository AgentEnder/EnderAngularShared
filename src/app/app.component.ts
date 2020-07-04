import { Component, AfterViewChecked, AfterViewInit, ViewChild } from '@angular/core';
import { Ng2tSlideDirective } from 'projects/ng2-transition/src/public-api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'ender-angular-shared';

  @ViewChild('test', {read: Ng2tSlideDirective}) test: Ng2tSlideDirective;

  ngAfterViewInit() {
  }
}
