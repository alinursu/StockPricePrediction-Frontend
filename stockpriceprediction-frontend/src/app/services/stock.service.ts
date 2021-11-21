import { Injectable } from '@angular/core';
import {Stock} from "../models/Stock";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private _stocks: Stock[] = [
    new Stock("StockName1", "Abrv1", 124.35, 126.36),
    new Stock("StockName2", "Abrv2", 34.35, 38.36),
    new Stock("StockName3", "Abrv3", 241.35, 236.36),
    new Stock("StockName4", "Abrv4", 521.35, 501.36),
    new Stock("StockName5", "Abrv5", 23.35, 58.36),
    new Stock("StockName6", "Abrv6", 421.35, 321.36),
    new Stock("StockName7", "Abrv7", 15123.35, 15123.36),
    new Stock("StockName8", "Abrv8", 3213.35, 3213.36),
    new Stock("StockName9", "Abrv9", 1242.35, 1242.36),
    new Stock("StockName10", "Abrv10", 323.35, 323.36),
    new Stock("StockName11", "Abrv11", 1524.35, 1538.36),
    new Stock("StockName12", "Abrv12", 1234.35, 1200.36)
  ]

  constructor() { }

  get stocks(): Stock[] {
    return this._stocks;
  }
}
