import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock/stock.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    StockComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class StockModule { }
