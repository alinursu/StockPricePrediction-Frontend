import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import {CommonModule} from "@angular/common";
import {RegisterModule} from "./modules/register/register.module";
import { LoginModule } from './modules/login/login.module';
import {CookieService} from "ngx-cookie-service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RegisterModule,
    LoginModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
