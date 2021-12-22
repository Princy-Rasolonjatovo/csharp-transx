import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



import { HomeComponent } from './home/home.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';


// materials
const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatGridListModule,
  MatMenuModule,
  MatCardModule,
  MatChipsModule,
  MatTableModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InvoiceViewComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponents,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken', 
      headerName: 'X-CSRFToken'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
