import { MatTableModule } from '@angular/material/table';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { PluginDetailComponent } from './plugins/plugin-detail/plugin-detail.component';

import { MatMenuModule } from '@angular/material/menu';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PluginWimmicsComponent,
    PluginBurnsAudioComponent,
    RecommandComponent,
    PluginDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,MatIconModule,MatCardModule,MatFormFieldModule,FormsModule,
    MatMenuModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
