import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DeleteAccountComponent } from './AuthComponent/delete-account/delete-account.component';
import { SignUpComponent } from './AuthComponent/sign-up/sign-up.component';
import { LoginComponent } from './AuthComponent/login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { PluginDetailComponent } from './plugin-detail/plugin-detail.component';

const routes: Routes = [

    {path: 'home', component: UserProfileComponent,canActivate: [AuthGuard],},
    {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard],},
    {path: 'delete-account', component: DeleteAccountComponent,canActivate: [AuthGuard],},
    {path:'plugin-detail/:dirName',component:PluginDetailComponent,},
    {path: 'sign-up', component: SignUpComponent},
    {path:'login',component:LoginComponent},
    {path:'**',redirectTo:'home'}

  ];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
