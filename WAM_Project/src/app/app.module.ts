import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';

import { FormsModule } from '@angular/forms';


import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from "@angular/material/sidenav";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {LoginComponent} from './AuthComponent/login/login.component';
import {DeleteAccountComponent} from './AuthComponent/delete-account/delete-account.component';
import {SignUpComponent} from './AuthComponent/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { PluginDetailComponent } from './plugin-detail/plugin-detail.component';

registerLocaleData(en);



@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    LoginComponent,
    DeleteAccountComponent,
    SignUpComponent,
    PluginDetailComponent


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSortModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatRadioModule,
    MatSelectModule,
    NzLayoutModule,
    NzTableModule,
    NzDropDownModule,
    AppRoutingModule,

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
