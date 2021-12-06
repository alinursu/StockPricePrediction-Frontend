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
      return [new StockDto("error", "error", 0, 0, [], false)];
    }

    const responseBody = await response.json();
    this._stocks = []
    for (let index in responseBody) {
      let stock = responseBody[index]
      let stockDto: StockDto = new StockDto(stock['title'], stock['symbol'], 0, 0, [], false);
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
      return new StockDto("error", "internal", 0, 0, [], false);
    }

    if (response.status != 200) {
      return new StockDto("error", "error", 0, 0, [], false);
    }

    let responseBody = await response.json();
    responseBody = JSON.parse(responseBody);
    let markedAsFavorite: boolean = responseBody['IsFavourite'];
    responseBody = responseBody['Stock'];
    let comments: CommentDto[] = [];

    if (responseBody['Comments'] != null) {
      for (let commentIndex in responseBody['Comments']) {
        let date = new Date(responseBody['Comments'][commentIndex]['CreationDate']);
        let dateString: string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

        let comment: CommentDto = new CommentDto(
          responseBody['Comments'][commentIndex]['Id'],
          responseBody['Comments'][commentIndex]['Author'],
          responseBody['Comments'][commentIndex]['Message'],
          responseBody['Comments'][commentIndex]['Likes'],
          responseBody['Comments'][commentIndex]['Dislikes'],
          dateString
        )
        comments.push(comment);
      }
    }

    return new StockDto(responseBody['Title'], responseBody['Symbol'], 0, 0, comments, markedAsFavorite);
  }

  public async addStockComment(abbreviation: string, message: string): Promise<Response> {
    let response: Response = await this.backendClientAPI.addStockComment(
      this.cookieService.get('token'),
      abbreviation,
      message
    );

    return response;
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

  public async markStockAsFavorite(abbreviation: string): Promise<number> {
    let response: Response = await this.backendClientAPI.markStockAsFavorite(
      this.cookieService.get('token'),
      abbreviation
    );

    return response.status;
  }

  public async markStockAsNotFavorite(abbreviation: string): Promise<number> {
    let response: Response = await this.backendClientAPI.markStockAsNotFavorite(
      this.cookieService.get('token'),
      abbreviation
    );

    return response.status;
  }

  get stocks(): StockDto[] {
    return this._stocks;
  }
}
