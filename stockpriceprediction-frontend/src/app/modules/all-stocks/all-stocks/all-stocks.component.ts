import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-all-stocks',
  templateUrl: './all-stocks.component.html',
  styleUrls: ['./all-stocks.component.scss']
})
export class AllStocksComponent implements OnInit {

  constructor(private elem: ElementRef) { }

  ngOnInit(): void {
  }

  public displayDropDown(stockNumber: number) {
    let stockParentContainers = this.elem.nativeElement.querySelectorAll(".stock-container");
    let stockParentContainer = stockParentContainers[stockNumber]

    let stockContainer = stockParentContainer.children[0];
    let stockDropdownContainer = stockParentContainer.children[1];
    if(stockDropdownContainer.classList.contains("stock-dropdown-hidden")) {
      stockDropdownContainer.classList.remove("stock-dropdown-hidden");
      stockContainer.style["margin-bottom"] = "0";

      let arrowButton = stockContainer.children[1].children[1].children[0];
      arrowButton.style["-webkit-transform"] = "rotate(225deg)";
      arrowButton.style["-moz-transform"] = "rotate(225deg)";
      arrowButton.style["-o-transform"] = "rotate(225deg)";
      arrowButton.style["transform"] = "rotate(225deg)";
    }
    else {
      stockDropdownContainer.classList.add("stock-dropdown-hidden");
      stockContainer.style["margin-bottom"] = "1.5em";

      let arrowButton = stockContainer.children[1].children[1].children[0];
      arrowButton.style["-webkit-transform"] = "rotate(45deg)";
      arrowButton.style["-moz-transform"] = "rotate(45deg)";
      arrowButton.style["-o-transform"] = "rotate(45deg)";
      arrowButton.style["transform"] = "rotate(45deg)";
    }
  }

}
