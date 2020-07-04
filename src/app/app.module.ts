import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Ng2TransitionModule } from 'projects/ng2-transition/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Ng2TransitionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
