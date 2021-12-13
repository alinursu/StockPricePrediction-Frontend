import {Component, ElementRef, OnInit} from '@angular/core';
import {StockService} from "../../../services/stock.service";
import {StockDto} from "../../../models/dtos/StockDto";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {ComponentDisplayerService} from "../../../services/component-displayer.service";
import {formatDate} from "@angular/common";
import {StockDataDto} from "../../../models/dtos/StockDataDto";

@Component({
  selector: 'app-all-stocks',
  templateUrl: './all-stocks.component.html',
  styleUrls: ['./all-stocks.component.scss']
})
export class AllStocksComponent implements OnInit {
  private displayStocksPerPage: number = 10;
  private stocksIndex: number = 0;
  private actualStocks: StockDto[] = []
  private filtered: boolean = false;
  private numberOfPages: number = 0;

  constructor(private htmlDocument: ElementRef,
              private stockService: StockService,
              private componentDisplayerService: ComponentDisplayerService,
              private router: Router,
              private cookieService: CookieService) {
    this.componentDisplayerService.displayHeaderAndFooter = true;
    this.componentDisplayerService.allStocksMenuItemHighlighted = true;
    this.componentDisplayerService.favoriteStocksMenuItemHighlighted = false;

    if (this.cookieService.get('token') == '') {
      this.router.navigate(['/forbidden'])
    }

    this.updateActualStocks();
    this.updateNumberOfPages();
  }

  ngOnInit() {
  }

  async getStocks(): Promise<StockDto[]> {
    return await this.stockService.getAllStocks();
  }

  async updateActualStocks() {
    let stocks = await this.stockService.getAllStocks();
    this.actualStocks = stocks.slice(this.stocksIndex * this.displayStocksPerPage, (this.stocksIndex + 1) * this.displayStocksPerPage);

    for (const stock of this.actualStocks) {
      let response: StockDataDto[] = await this.stockService.getStockDataInPastDays(stock.abbreviation, 1);
      let todayStockPrice = response.pop();

      response = await this.stockService.getStockDataPrediction(stock.abbreviation, 1);
      let tomorrowStockPrice = response.pop();

      stock.todayPrice = todayStockPrice;
      stock.tomorrowPrice = tomorrowStockPrice;
    }
  }

  getActualStocks(): StockDto[] {
    return this.actualStocks;
  }

  async updateNumberOfPages(stocks: StockDto[] = []) {
    if(stocks.length == 0) {
      stocks = await this.getStocks();
    }

    this.numberOfPages = Math.ceil(stocks.length / this.displayStocksPerPage);
  }

  getNumberOfPages(): number {
    return this.numberOfPages;
  }

  getStocksPages(): number[] {
    let numberOfPages = this.getNumberOfPages()
    return Array.from({length: (numberOfPages)}, (v, i) => i);
  }

  async updateStockIndexValue(newIndex: number) {
    this.stocksIndex = newIndex;
    await this.updateActualStocks();
  }

  getStocksIndex(): number {
    return this.stocksIndex;
  }

  async decrementStocksIndex() {
    this.stocksIndex--;
    await this.updateActualStocks();
  }

  async incrementStocksIndex() {
    this.stocksIndex++;
    await this.updateActualStocks();
  }

  async onSearchBarChange(event: any) {
    let searchPattern: string = event.target.value;

    if (searchPattern != '') {
      this.actualStocks = await this.getStocks();
      this.actualStocks = this.actualStocks.filter(stock =>
        stock.name.toLocaleLowerCase().includes(searchPattern.toLocaleLowerCase()) ||
        stock.abbreviation.toLocaleLowerCase().includes(searchPattern.toLocaleLowerCase())
      );
      this.filtered = true;
      await this.updateNumberOfPages(this.actualStocks);
    } else {
      await this.updateActualStocks();
      await this.updateNumberOfPages();
      this.filtered = false;
    }
  }

  getTomorrowDateAsString(): string {
    return formatDate(new Date(), 'dd/MM/yyyy', 'en');
  }

  redirectToStockPage(stock: StockDto) {
    this.router.navigate([`/stock/${stock.abbreviation}`]);
  }

  getStockPricesDifference(stock: StockDto): number | undefined {
    if(stock.todayPrice == undefined || stock.tomorrowPrice == undefined) {
      return undefined;
    }

    if(stock.todayPrice.value == -999999999 || stock.tomorrowPrice.value == -999999999) {
      return undefined;
    }

    let difference = stock.tomorrowPrice.value - stock.todayPrice.value;
    let percent = difference * stock.todayPrice.value / 100;
    return Number(percent.toFixed(4));
  }
}
