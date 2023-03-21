import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PluginContentComponent } from './plugins/plugin-content/plugin-content.component';
import { HomeComponent } from './plugins/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule  } from "@angular/material/toolbar";
import {MatIconModule  } from "@angular/material/icon";
import {MatCardModule } from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './plugins/login/login.component';
import { PluginWimmicsComponent } from './fils-component/plugin-wimmics/plugin-wimmics.component';
import { PluginBurnsAudioComponent } from './fils-component/plugin-burns-audio/plugin-burns-audio.component';
import { RecommandComponent } from './fils-component/recommand/recommand.component';


@NgModule({
  declarations: [
    AppComponent,
    PluginContentComponent,
    HomeComponent,
    LoginComponent,
    PluginWimmicsComponent,
    PluginBurnsAudioComponent,
    RecommandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,MatIconModule,MatCardModule,MatFormFieldModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
