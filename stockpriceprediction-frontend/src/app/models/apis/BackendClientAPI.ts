import {LoginRequestDto} from "../dtos/LoginRequestDto";
import {RegisterRequestDto} from "../dtos/RegisterRequestDto";

export class BackendClientAPI {
  // TODO: After deployment, change to the new ones;
  private static readonly BACKEND_URL = "https://localhost:5001";
  private static readonly LOGIN_ENDPOINT = "/api/User/LoginUser";
  private static readonly REGISTER_ENDPOINT = "/api/User/RegisterUser";

  private static loginEndpoint(): string {
    return `${this.BACKEND_URL}${this.LOGIN_ENDPOINT}`;
  }

  private static registerEndpoint(): string {
    return `${this.BACKEND_URL}${this.REGISTER_ENDPOINT}`;
  }

  public async loginRequest(loginRequestDto: LoginRequestDto): Promise<Response> {
    return await fetch(BackendClientAPI.loginEndpoint(), {
      method: "POST",
      body: JSON.stringify(loginRequestDto),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public async registerRequest(registerRequestDto: RegisterRequestDto): Promise<Response> {
    return await fetch(BackendClientAPI.registerEndpoint(), {
      method: "POST",
      body: JSON.stringify(registerRequestDto),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
