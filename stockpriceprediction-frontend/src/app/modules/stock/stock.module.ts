import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StockComponent} from './stock/stock.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ChartsModule} from "ng2-charts";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [
    StockComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    ChartsModule
  ]
})
export class StockModule {
}
