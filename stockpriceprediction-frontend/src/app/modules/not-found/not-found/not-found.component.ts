import {Component, OnInit} from '@angular/core';
import {ComponentDisplayerService} from "../../../services/component-displayer.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private componentDisplayerService: ComponentDisplayerService) {
    this.componentDisplayerService.displayHeaderAndFooter = true;
    this.componentDisplayerService.allStocksMenuItemHighlighted = false;
    this.componentDisplayerService.favoriteStocksMenuItemHighlighted = false;
  }

  ngOnInit(): void {
  }

}
