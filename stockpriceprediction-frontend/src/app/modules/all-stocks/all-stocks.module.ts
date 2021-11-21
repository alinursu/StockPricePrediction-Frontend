import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllStocksComponent} from './all-stocks/all-stocks.component';
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [
    AllStocksComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ]
})
export class AllStocksModule {
}
