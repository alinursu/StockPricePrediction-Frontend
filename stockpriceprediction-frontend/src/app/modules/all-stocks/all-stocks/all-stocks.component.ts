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
  }

  ngOnInit(): void {
  }


  // TODO: This is just frontend functionality. Send request to backend
  public markAsFavorite(index: number) {
    let stockParentContainers = this.htmlDocument.nativeElement.querySelectorAll(".stock-container");
    let stockParentContainer = stockParentContainers[index];

    let starNode = stockParentContainer.children[0].children[1];
    starNode.innerText = starNode.innerText == "★" ? "☆" : "★";
  }

  public getStocks(): StockDto[] {
    return this.stockService.stocks;
  }

  public updateActualStocks() {
    this.actualStocks = this.stockService.stocks.slice(this.stocksIndex * this.displayStocksPerPage, (this.stocksIndex + 1) * this.displayStocksPerPage);
  }

  public getActualStocks(): StockDto[] {
    return this.actualStocks;
  }

  public getNumberOfPages(stocks: StockDto[] = []): number {
    if(stocks.length == 0) {
      stocks = this.getStocks();
    }

    return Math.ceil(stocks.length % this.displayStocksPerPage);
  }

  public getStocksPages(): number[] {
    // TODO: Might not work if stocks.length > 30 (works, but looks horrible)
    if(this.filtered) {
      return [0];
    }

    let numberOfPages = this.getNumberOfPages();
    return Array.from({length:(numberOfPages)}, (v, i) => i);
  }

  public updateStockIndexValue(newIndex: number) {
    this.stocksIndex = newIndex;
    this.updateActualStocks();
  }

  public getStocksIndex(): number {
    return this.stocksIndex;
  }

  public decrementStocksIndex() {
    this.stocksIndex--;
    this.updateActualStocks();
  }

  public incrementStocksIndex() {
    this.stocksIndex++;
    this.updateActualStocks();
  }

  public onSearchBarChange(event:any) {
    let searchPattern: string = event.target.value;

    if(searchPattern != '') {
      this.actualStocks = this.getStocks();
      this.actualStocks = this.actualStocks.filter(stock =>
        stock.name.toLocaleLowerCase().includes(searchPattern.toLocaleLowerCase()) ||
        stock.abbreviation.toLocaleLowerCase().includes(searchPattern.toLocaleLowerCase())
      );
      this.filtered = true;
    }
    else {
      this.updateActualStocks();
      this.filtered = false;
    }
  }

  getTomorrowDateAsString(): string {
    return formatDate(new Date(), 'dd/MM/yyyy', 'en');
  }

  redirectToStockPage(stock: StockDto) {
    this.router.navigate(['/stock']);
  }
}
