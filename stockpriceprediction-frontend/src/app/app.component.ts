import { Component } from '@angular/core';
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Stock Price Prediction';

  public sidebarMenu: boolean = false;
  public sidebarButtonText: string = "&#8594;";

  constructor(private userService: UserService,
              private router: Router) {
  }

  public getUserName(): string {
    return this.userService.getName();
  }

  public logoutEvent() {
    this.userService.logout();
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
