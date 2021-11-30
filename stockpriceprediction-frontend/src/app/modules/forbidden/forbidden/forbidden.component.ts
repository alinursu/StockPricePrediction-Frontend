import { Component, OnInit } from '@angular/core';
import {ComponentDisplayerService} from "../../../services/component-displayer.service";

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

  constructor(private componentDisplayerService: ComponentDisplayerService) {
    this.componentDisplayerService.displayHeaderAndFooter = true;
    this.componentDisplayerService.allStocksMenuItemHighlighted = false;
    this.componentDisplayerService.favoriteStocksMenuItemHighlighted = false;
  }

  ngOnInit(): void {
  }

}
