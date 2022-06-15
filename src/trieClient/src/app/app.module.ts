import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { TextareaHighlightModule } from './highlighed-text/textarea-highlight/textarea-highlight.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { SpellCheckTextareaComponent } from './spell-check-textarea/spell-check-textarea.component';
@NgModule({
  declarations: [
    AppComponent,
    SpellCheckTextareaComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TextareaHighlightModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
