import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import {CommonModule} from "@angular/common";
import {RegisterModule} from "./modules/register/register.module";
import { LoginModule } from './modules/login/login.module';
import {CookieService} from "ngx-cookie-service";
import {AllStocksModule} from "./modules/all-stocks/all-stocks.module";
import {StockModule} from "./modules/stock/stock.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RegisterModule,
    LoginModule,
    AllStocksModule,
    StockModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
