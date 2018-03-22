import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DataService } from './services/data.service';
import { DummyData } from './services/DummyData';
import { ContactIconPipe } from './pipes/contact-icon.pipe';
import { SearchHighlightPipe } from './pipes/search-highlight.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactIconPipe,
    SearchHighlightPipe,
    SafeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [DataService, DummyData],
  bootstrap: [AppComponent]
})
export class AppModule { }
