import {LoginRequestDto} from "../dtos/LoginRequestDto";
import {RegisterRequestDto} from "../dtos/RegisterRequestDto";

export class BackendClientAPI {
  private static readonly BACKEND_URL = "https://localhost:5001";

  private static readonly LOGIN_ENDPOINT = "/api/User/LoginUser";
  private static readonly REGISTER_ENDPOINT = "/api/User/RegisterUser";

  private static readonly ALL_STOCKS_ENDPOINT = "/api/Stock/GetAllStocks";
  private static readonly FAVORITE_STOCKS_ENDPOINT = "/api/User/GetFavouriteStocks";

  private static readonly STOCK_ENDPOINT = "/api/Stock/GetStock";
  private static readonly STOCK_DATA_ENDPOINT = "/api/Stock/GetStockData";
  private static readonly STOCK_PREDICTION_ENDPOINT = "/api/Stock/GetStockPrediction";

  private static readonly ADD_COMMENT_ENDPOINT = "/api/Comment/AddComment";
  private static readonly LIKE_COMMENT_ENDPOINT = "/api/Comment/Upvote";
  private static readonly DISLIKE_COMMENT_ENDPOINT = "/api/Comment/Downvote";

  private static readonly ADD_FAVORITE_COMMENT_ENDPOINT = "/api/User/AddFavouriteStock";
  private static readonly REMOVE_FAVORITE_COMMENT_ENDPOINT = "/api/User/RemoveFavouriteStock";

  private static endpoint(endpoint: string) {
    return `${this.BACKEND_URL}${endpoint}`;
  }

  public async loginRequest(loginRequestDto: LoginRequestDto): Promise<Response> {
    return await fetch(BackendClientAPI.endpoint(BackendClientAPI.LOGIN_ENDPOINT), {
      method: "POST",
      body: JSON.stringify(loginRequestDto),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public async registerRequest(registerRequestDto: RegisterRequestDto): Promise<Response> {
    return await fetch(BackendClientAPI.endpoint(BackendClientAPI.REGISTER_ENDPOINT), {
      method: "POST",
      body: JSON.stringify(registerRequestDto),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public async getAllStocks(authorization: string): Promise<Response> {
    return await fetch(BackendClientAPI.endpoint(BackendClientAPI.ALL_STOCKS_ENDPOINT), {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authorization}`
      }
    });
  }

  public async getFavoriteStocks(authorization: string): Promise<Response> {
    return await fetch(BackendClientAPI.endpoint(BackendClientAPI.FAVORITE_STOCKS_ENDPOINT), {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authorization}`
      }
    });
  }

  public async getStockByAbbreviation(authorization: string, abbreviation: string): Promise<Response> {
    let endpoint = `${BackendClientAPI.endpoint(BackendClientAPI.STOCK_ENDPOINT)}?stockSymbol=${abbreviation}`;

    return await fetch(endpoint, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authorization}`
      }
    });
  }

  public async getStockDataInPastDays(authorization: string, abbreviation: string, days: number): Promise<Response> {
    let endpoint = `${BackendClientAPI.endpoint(BackendClientAPI.STOCK_DATA_ENDPOINT)}?name=${abbreviation}&days=${days}`;

    return await fetch(endpoint, {
      method: "GET",
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${authorization}`
      }
    });
  }

  public async getStockPrediction(authorization: string, abbreviation: string, days: number): Promise<Response> {
    let endpoint = `${BackendClientAPI.endpoint(BackendClientAPI.STOCK_PREDICTION_ENDPOINT)}?name=${abbreviation}&days=${days}`;

    return await fetch(endpoint, {
      method: "GET",
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${authorization}`
      }
    });
  }

  public async addStockComment(authorization: string, abbreviation: string, message: string): Promise<Response> {
    return await fetch(BackendClientAPI.endpoint(BackendClientAPI.ADD_COMMENT_ENDPOINT), {
      method: "POST",
      body: JSON.stringify({
        'Message': message,
        'StockSymbol': abbreviation,
        'CreationDate': new Date().toISOString()
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authorization}`
      }
    });
  }

  public async likeComment(authorization: string, commentId: number): Promise<Response> {
    let endpoint = `${BackendClientAPI.endpoint(BackendClientAPI.LIKE_COMMENT_ENDPOINT)}?commentId=${commentId}`;

    return await fetch(endpoint, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${authorization}`
      }
    });
  }

  public async dislikeComment(authorization: string, commentId: number): Promise<Response> {
    let endpoint = `${BackendClientAPI.endpoint(BackendClientAPI.DISLIKE_COMMENT_ENDPOINT)}?commentId=${commentId}`;

    return await fetch(endpoint, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${authorization}`
      }
    });
  }

  public async markStockAsFavorite(authorization: string, abbreviation: string): Promise<Response> {
    return await fetch(BackendClientAPI.endpoint(BackendClientAPI.ADD_FAVORITE_COMMENT_ENDPOINT), {
      method: "POST",
      body: JSON.stringify({
        stockSymbol: abbreviation
      }),
      headers: {
        'Authorization': `Bearer ${authorization}`,
        'Content-Type': 'application/json'
      }
    });
  }

  public async markStockAsNotFavorite(authorization: string, abbreviation: string): Promise<Response> {
    return await fetch(BackendClientAPI.endpoint(BackendClientAPI.REMOVE_FAVORITE_COMMENT_ENDPOINT), {
      method: "POST",
      body: JSON.stringify({
        stockSymbol: abbreviation
      }),
      headers: {
        'Authorization': `Bearer ${authorization}`,
        'Content-Type': 'application/json'
      }
    });
  }
}
