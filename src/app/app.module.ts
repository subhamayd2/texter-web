import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { NgxAutoScrollModule } from "ngx-auto-scroll";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DataService } from './services/data.service';
import { DummyData } from './services/DummyData';
import { ContactIconPipe } from './pipes/contact-icon.pipe';
import { SearchHighlightPipe } from './pipes/search-highlight.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { MessageGroupByDatePipe } from './pipes/message-group-by-date.pipe';
import { TimestampToDayPipe } from './pipes/timestamp-to-day.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactIconPipe,
    SearchHighlightPipe,
    SafeHtmlPipe,
    MessageGroupByDatePipe,
    TimestampToDayPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxAutoScrollModule
  ],
  providers: [DataService, DummyData],
  bootstrap: [AppComponent]
})
export class AppModule { }
