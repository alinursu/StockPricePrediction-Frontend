import { Component, OnInit } from '@angular/core';
import {ComponentDisplayerService} from "../../services/component-displayer.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private componentDisplayerService : ComponentDisplayerService) {
    this.componentDisplayerService.displayHeaderAndFooter = true;
  }

  ngOnInit(): void {
  }

}
