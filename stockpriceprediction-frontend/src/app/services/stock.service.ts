import {Injectable} from '@angular/core';
import {StockDto} from "../models/dtos/StockDto";
import {CommentDto} from "../models/dtos/CommentDto";
import {BackendClientAPI} from "../models/apis/BackendClientAPI";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private backendClientAPI: BackendClientAPI = new BackendClientAPI();

  // TODO: This is dummy data.
  private _stocks: StockDto[] = []

  private _comments: CommentDto[] = [
    new CommentDto("Abrv", "John Doe", "29/11/2021", "Cool prediction", 2, 1),
    new CommentDto("Abrv", "Jane Doe", "28/11/2021", "Not so cool prediction", 10, 1),
    new CommentDto("Abrv", "John Doe", "27/11/2021", "I don't know what is going on here", 1, 10),
    new CommentDto("Abrv", "Matt Hone", "26/11/2021", "Comments works!", 100, 1),
    new CommentDto("Abrv", "Unknown Man", "25/11/2021", "Cool prediction", 0, 0),
    new CommentDto("Abrv", "Unknown Man", "24/11/2021", "Test1", 0, 0),
    new CommentDto("Abrv", "Unknown Man", "23/11/2021", "Test2", 0, 0)
  ]

  constructor(private cookieService: CookieService) {
  }

  public async getAllStocks(): Promise<StockDto[]> {
    if (this._stocks.length !== 0) {
      return this._stocks;
    }

    let response: Response = await this.backendClientAPI.getAllStocks(this.cookieService.get('token'));
    if(response.status != 200) {
      return [];
    }

    const responseBody = await response.json();
    this._stocks = []
    for(let index in responseBody) {
      // TODO: The values of stock are hardcoded.
      let stock = responseBody[index]
      let stockDto: StockDto = new StockDto(stock['title'], stock['symbol'], 0, 0);
      this._stocks.push(stockDto);
    }
    return this._stocks
  }

  public async getStockByAbbreviation(abbreviation: string): Promise<StockDto> {
    let response: Response = await this.backendClientAPI.getStockByAbbreviation(
      this.cookieService.get('token'),
      abbreviation
    );

    if(response.status != 200) {
      return new StockDto("error", "error", 0, 0);
    }

    const responseBody = await response.json();
    return new StockDto(responseBody['title'], responseBody['symbol'], 0, 0);
  }

  get stocks(): StockDto[] {
    return this._stocks;
  }

  get comments(): CommentDto[] {
    return this._comments;
  }
}
