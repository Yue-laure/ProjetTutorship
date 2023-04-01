import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./plugins/home/home.component";
import { PluginContentComponent } from "./plugins/plugin-content/plugin-content.component";
import {  LoginComponent} from "./plugins/login/login.component";
import { PluginBurnsAudioComponent } from './fils-component/plugin-burns-audio/plugin-burns-audio.component';
import { PluginWimmicsComponent } from './fils-component/plugin-wimmics/plugin-wimmics.component';
import { RecommandComponent } from './fils-component/recommand/recommand.component';
import { PluginDetailComponent } from './plugins/plugin-detail/plugin-detail.component';
const routes: Routes = [

  {path: 'home', component : HomeComponent},
  {path:'plugin-content',component:PluginContentComponent,
      children:[
        {path:' ',component:RecommandComponent,},
        {path:'plugin-burns',component:PluginBurnsAudioComponent,},
        {path:'plugin-wimmics',component:PluginWimmicsComponent,},
        // {path:'plugin-Detail/:URL',component:PluginDetailComponent,}
        
      ]
  },
  {path:'login',component:LoginComponent},
  // {path:'**',redirectTo:'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
