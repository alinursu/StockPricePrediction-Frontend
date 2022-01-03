import {Injectable} from '@angular/core';
import {StockDto} from "../models/dtos/StockDto";
import {BackendClientAPI} from "../models/apis/BackendClientAPI";
import {CookieService} from "ngx-cookie-service";
import {CommentDto} from "../models/dtos/CommentDto";
import {StockDataDto} from "../models/dtos/StockDataDto";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private backendClientAPI: BackendClientAPI = new BackendClientAPI();
  private _stocks: StockDto[] = []

  private async parseGetStocksResponseBody(response: Response) {
    const responseBody = await response.json();
    this._stocks = []
    for (let index in responseBody) {
      let stock = responseBody[index]
      let stockDto: StockDto = new StockDto(stock['title'].replace('"', ''), stock['symbol'], [], false);
      this._stocks.push(stockDto);
    }
  }

  private async parseGetStockResponseBody(response: Response) {
    let responseBody = await response.json();
    responseBody = JSON.parse(responseBody);
    let markedAsFavorite: boolean = responseBody['IsFavourite'];
    responseBody = responseBody['Stock'];
    let comments: CommentDto[] = [];

    if (responseBody['Comments'] != null) {
      for (let commentIndex in responseBody['Comments']) {
        let comment: CommentDto = new CommentDto(
          responseBody['Comments'][commentIndex]['Id'],
          responseBody['Comments'][commentIndex]['Author'],
          responseBody['Comments'][commentIndex]['Message'],
          responseBody['Comments'][commentIndex]['Likes'],
          responseBody['Comments'][commentIndex]['Dislikes'],
          new Date(responseBody['Comments'][commentIndex]['CreationDate'])
        )
        comments.push(comment);
      }
    }

    return new StockDto(responseBody['Title'].replace('"', ''), responseBody['Symbol'], comments, markedAsFavorite);
  }

  private async parseStockDataResponseBody(response: Response): Promise<StockDataDto[]> {
    let responseBody = await response.json();
    let data: StockDataDto[] = [];

    for(let value in responseBody) {
      data.push(new StockDataDto(new Date(value), Number(Number(responseBody[value]).toFixed(3))));
    }

    return data;
  }

  constructor(private cookieService: CookieService) {
  }

  get stocks(): StockDto[] {
    return this._stocks;
  }

  public async getAllStocks(): Promise<StockDto[]> {
    if (this._stocks.length !== 0) {
      return this._stocks;
    }

    let response: Response = await this.backendClientAPI.getAllStocks(this.cookieService.get('token'));
    if (response.status !== 200) {
      return [new StockDto("error", "error", [], false)];
    }

    await this.parseGetStocksResponseBody(response);
    return this._stocks
  }

  public async getFavoriteStocks(): Promise<StockDto[]> {
    if (this._stocks.length !== 0) {
      return this._stocks;
    }

    let response: Response = await this.backendClientAPI.getFavoriteStocks(this.cookieService.get('token'));
    if (response.status !== 200) {
      return [new StockDto("error", "error", [], false)];
    }

    await this.parseGetStocksResponseBody(response);

    if(this._stocks.length === 0){
      this._stocks.push(new StockDto('empty', 'empty',  [], false));
    }

    return this._stocks
  }

  public async getStockByAbbreviation(abbreviation: string): Promise<StockDto> {
    let response: Response = await this.backendClientAPI.getStockByAbbreviation(
      this.cookieService.get('token'),
      abbreviation
    );

    if(response.status == 500) {
      return new StockDto("error", "internal",  [], false);
    }

    if (response.status != 200) {
      return new StockDto("error", "error", [], false);
    }

    return await this.parseGetStockResponseBody(response);
  }

  public async getStockDataInPastDays(abbreviation: string, numberOfDays: number): Promise<StockDataDto[]> {
    let response: Response = await this.backendClientAPI.getStockDataInPastDays(
      this.cookieService.get('token'),
      abbreviation,
      numberOfDays
    );

    if(response.status != 200) {
      return [new StockDataDto(new Date(), -999999999)];
    }

    return await this.parseStockDataResponseBody(response);
  }

  public async getStockDataPrediction(abbreviation: string, numberOfDays: number): Promise<StockDataDto[]> {
    let response: Response = await this.backendClientAPI.getStockPrediction(
      this.cookieService.get('token'),
      abbreviation,
      numberOfDays
    );

    if(response.status != 200) {
      return [new StockDataDto(new Date(), -999999999)];
    }

    return await this.parseStockDataResponseBody(response);
  }

  public async addStockComment(abbreviation: string, message: string): Promise<Response> {
    return await this.backendClientAPI.addStockComment(
      this.cookieService.get('token'),
      abbreviation,
      message
    );
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
}
