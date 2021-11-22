import {Component, ElementRef, OnInit} from '@angular/core';
import {StockService} from "../../../services/stock.service";
import {StockDto} from "../../../models/dtos/StockDto";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-all-stocks',
  templateUrl: './all-stocks.component.html',
  styleUrls: ['./all-stocks.component.scss']
})
export class AllStocksComponent implements OnInit {
  constructor(private htmlDocument: ElementRef,
              private stockService: StockService,
              private router: Router,
              private cookieService: CookieService) {
    if(this.cookieService.get('token') == '') {
      this.router.navigate(['/forbidden'])
    }
  }

  ngOnInit(): void {}

  public displayDropDown(index: number) {
    let stockParentContainers = this.htmlDocument.nativeElement.querySelectorAll(".stock-container");
    let stockParentContainer = stockParentContainers[index]

    let stockContainer = stockParentContainer.children[0];
    let stockDropdownContainer = stockParentContainer.children[1];
    if (stockDropdownContainer.classList.contains("stock-dropdown-hidden")) {
      stockDropdownContainer.classList.remove("stock-dropdown-hidden");
      stockContainer.style["margin-bottom"] = "0";

      let arrowButton = stockContainer.children[2].children[1].children[0];
      arrowButton.style["-webkit-transform"] = "rotate(225deg)";
      arrowButton.style["-moz-transform"] = "rotate(225deg)";
      arrowButton.style["-o-transform"] = "rotate(225deg)";
      arrowButton.style["transform"] = "rotate(225deg)";
    } else {
      stockDropdownContainer.classList.add("stock-dropdown-hidden");
      stockContainer.style["margin-bottom"] = "1.5em";

      let arrowButton = stockContainer.children[2].children[1].children[0];
      arrowButton.style["-webkit-transform"] = "rotate(45deg)";
      arrowButton.style["-moz-transform"] = "rotate(45deg)";
      arrowButton.style["-o-transform"] = "rotate(45deg)";
      arrowButton.style["transform"] = "rotate(45deg)";
    }
  }

  public markAsFavorite(index: number) {
    let stockParentContainers = this.htmlDocument.nativeElement.querySelectorAll(".stock-container");
    let stockParentContainer = stockParentContainers[index];

    let starNode = stockParentContainer.children[0].children[1];
    starNode.innerText = starNode.innerText == "★" ? "☆" : "★";
  }

  public getStocks(): StockDto[] {
    return this.stockService.stocks;
  }
}
