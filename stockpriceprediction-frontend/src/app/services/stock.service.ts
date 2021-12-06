import {Injectable} from '@angular/core';
import {StockDto} from "../models/dtos/StockDto";
import {BackendClientAPI} from "../models/apis/BackendClientAPI";
import {CookieService} from "ngx-cookie-service";
import {CommentDto} from "../models/dtos/CommentDto";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private backendClientAPI: BackendClientAPI = new BackendClientAPI();
  private _stocks: StockDto[] = []

  constructor(private cookieService: CookieService) {
  }

  public async getAllStocks(): Promise<StockDto[]> {
    if (this._stocks.length !== 0) {
      return this._stocks;
    }

    let response: Response = await this.backendClientAPI.getAllStocks(this.cookieService.get('token'));
    if (response.status != 200) {
      return [];
    }

    const responseBody = await response.json();
    this._stocks = []
    for (let index in responseBody) {
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

    if(response.status == 500) {
      return new StockDto("error", "internal", 0, 0);
    }

    if (response.status != 200) {
      return new StockDto("error", "error", 0, 0);
    }

    const responseBody = await response.json();
    let comments: CommentDto[] = [];

    if (responseBody['comments'] != null) {
      for (let commentIndex in responseBody['comments']) {
        let date = new Date(responseBody['comments'][commentIndex]['creationDate']);
        let dateString: string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

        let comment: CommentDto = new CommentDto(
          responseBody['comments'][commentIndex]['id'],
          responseBody['comments'][commentIndex]['author'],
          responseBody['comments'][commentIndex]['message'],
          responseBody['comments'][commentIndex]['likes'],
          responseBody['comments'][commentIndex]['dislikes'],
          dateString
        )
        comments.push(comment);
      }
    }

    return new StockDto(responseBody['title'], responseBody['symbol'], 0, 0, comments);
  }

  public async addStockComment(abbreviation: string, message: string): Promise<number> {
    let response: Response = await this.backendClientAPI.addStockComment(
      this.cookieService.get('token'),
      abbreviation,
      message
    );

    return response.status;
  }

  public async likeStockComment(commentId: number): Promise<number> {
    let response: Response = await this.backendClientAPI.likeComment(
      this.cookieService.get('token'),
      commentId
    );

    return response.status;
  }

  public async dislikeStockComment(commentId: number): Promise<number> {
    let response: Response = await this.backendClientAPI.dislikeComment(
      this.cookieService.get('token'),
      commentId
    );

    return response.status;
  }

  get stocks(): StockDto[] {
    return this._stocks;
  }
}
