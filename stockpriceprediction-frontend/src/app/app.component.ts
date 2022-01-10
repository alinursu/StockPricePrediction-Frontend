import {Component} from '@angular/core';
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {CookieService} from "ngx-cookie-service";
import {ComponentDisplayerService} from "./services/component-displayer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // TODO: Maybe change the app title?
  title = 'Stock Price Prediction';

  constructor(private userService: UserService,
              private componentDisplayerService: ComponentDisplayerService,
              private router: Router,
              private titleService: Title,
              private cookieService: CookieService) {
    this.titleService.setTitle(this.title);
  }

  public getUserName(): string | null {
    return this.cookieService.get('name');
  }

  public logoutEvent() {
    this.cookieService.delete('name');
    this.cookieService.delete('token');
    this.router.navigate(["/"]);
  }

  public displayHeaderAndFooter(): boolean {
    return this.componentDisplayerService.displayHeaderAndFooter;
  }

  public highlightAllStocksMenuItem(): boolean {
    return this.componentDisplayerService.allStocksMenuItemHighlighted;
  }

  public highlightFavoriteStocksMenuItem(): boolean {
    return this.componentDisplayerService.favoriteStocksMenuItemHighlighted;
  }

  getBackgroundImageUrl(): string {
    return `url('/assets/stock-background-image.jpeg')`
  }
}
