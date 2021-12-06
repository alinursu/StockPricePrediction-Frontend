import {LoginRequestDto} from "../dtos/LoginRequestDto";
import {RegisterRequestDto} from "../dtos/RegisterRequestDto";

export class BackendClientAPI {
  // TODO: After deployment, change to the new ones;
  private static readonly BACKEND_URL = "https://localhost:5001";
  private static readonly LOGIN_ENDPOINT = "/api/User/LoginUser";
  private static readonly REGISTER_ENDPOINT = "/api/User/RegisterUser";
  private static readonly ALL_STOCKS_ENDPOINT = "/api/Stock/GetAllStocks";
  private static readonly STOCK_ENDPOINT = "/api/Stock/GetStock";

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
        'Authorization': authorization
      }
    });
  }

  public async getStockByAbbreviation(authorization: string, abbreviation: string): Promise<Response> {
    let endpoint = `${BackendClientAPI.endpoint(BackendClientAPI.STOCK_ENDPOINT)}?stockSymbol=${abbreviation}`;
    return await fetch(endpoint, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': authorization
      }
    });
  }
}
