import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentDisplayerService {
  public displayHeaderAndFooter: boolean = true;
  public allStocksMenuItemHighlighted: boolean = false;
  public favoriteStocksMenuItemHighlighted: boolean = false;

  constructor() { }
}
