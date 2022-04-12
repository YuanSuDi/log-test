import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LogService } from './log.service';
import { LogtestComponent } from './logtest/logtest.component';

@NgModule({
  declarations: [
    AppComponent,
    LogtestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LogService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
