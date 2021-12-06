import {Component, ElementRef, OnInit} from '@angular/core';
import {StockService} from "../../../services/stock.service";
import {StockDto} from "../../../models/dtos/StockDto";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {ComponentDisplayerService} from "../../../services/component-displayer.service";
import {formatDate} from "@angular/common";

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

  // TODO: This is just frontend functionality. Send request to backend
  public markAsFavorite(index: number) {
    let stockParentContainers = this.htmlDocument.nativeElement.querySelectorAll(".stock-container");
    let stockParentContainer = stockParentContainers[index];

    let starNode = stockParentContainer.children[0].children[1];
    starNode.innerText = starNode.innerText == "★" ? "☆" : "★";
  }

  public async getStocks(): Promise<StockDto[]> {
    return await this.stockService.getAllStocks();
  }

  public async updateActualStocks() {
    let stocks = await this.stockService.getAllStocks();
    this.actualStocks = stocks.slice(this.stocksIndex * this.displayStocksPerPage, (this.stocksIndex + 1) * this.displayStocksPerPage);
  }

  public getActualStocks(): StockDto[] {
    return this.actualStocks;
  }

  public async updateNumberOfPages(stocks: StockDto[] = []) {
    if(stocks.length == 0) {
      stocks = await this.getStocks();
    }

    this.numberOfPages = Math.ceil(stocks.length / this.displayStocksPerPage);
  }

  public getNumberOfPages(): number {
    return this.numberOfPages;
  }

  public getStocksPages(): number[] {
    // TODO: Might not work if stocks.length > 30 (works, but looks horrible)
    if (this.filtered) {
      return [0];
    }

    let numberOfPages = this.getNumberOfPages()

    return Array.from({length: (numberOfPages)}, (v, i) => i);
  }

  public async updateStockIndexValue(newIndex: number) {
    this.stocksIndex = newIndex;
    await this.updateActualStocks();
  }

  public getStocksIndex(): number {
    return this.stocksIndex;
  }

  public async decrementStocksIndex() {
    this.stocksIndex--;
    await this.updateActualStocks();
  }

  public async incrementStocksIndex() {
    this.stocksIndex++;
    await this.updateActualStocks();
  }

  public async onSearchBarChange(event: any) {
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
}
