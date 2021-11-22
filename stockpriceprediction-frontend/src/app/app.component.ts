import { Component } from '@angular/core';
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StockDto Price Prediction';

  public sidebarMenu: boolean = false;
  public sidebarButtonText: string = "&#8594;";

  constructor(private userService: UserService,
              private router: Router,
              private titleService: Title) {
    this.titleService.setTitle(this.title);
  }

  // TODO: This is dummy implementation
  public getUserName(): string {
    return this.userService.getName();
  }

  public logoutEvent() {
    this.userService.logout(); // TODO: This is dummy implementation.
    this.router.navigate(["/"]);
  }

  public showSidebarMenu() {
    this.sidebarMenu = !this.sidebarMenu;

    if(this.sidebarMenu) {
      this.sidebarButtonText = "&#8592;";
    }
    else {
      this.sidebarButtonText = "&#8594;";
    }
  }
}
