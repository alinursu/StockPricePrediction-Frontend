import {Injectable} from '@angular/core';
import {LoginRequestDto} from "../models/LoginRequestDto";
import * as fs from 'fs'
import {decode} from 'ini-decode'
import {RegisterRequestDto} from "../models/RegisterRequestDto";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // TODO: After deployment, change to the new ones;
  private static readonly BACKEND_URL = "https://localhost:5001";
  private static readonly LOGIN_ENDPOINT = "/api/User/LoginUser";
  private static readonly REGISTER_ENDPOINT = "/api/User/RegisterUser";

  private name: string = "";

  constructor() {
  }

  private static loginEndpoint(): string {
    return `${this.BACKEND_URL}${this.LOGIN_ENDPOINT}`;
  }

  private static registerEndpoint(): string {
    return `${this.BACKEND_URL}${this.REGISTER_ENDPOINT}`;
  }

  public async sendLoginRequest(userData: object): Promise<object> {
    // @ts-ignore
    const loginRequestDto: LoginRequestDto = new LoginRequestDto(userData.email, userData.password);
    const response: Response = await fetch(UserService.loginEndpoint(), {
      method: "POST",
      body: JSON.stringify(loginRequestDto),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let status = response.status;
    let text = "";

    if (response.ok) {
      text = JSON.parse(JSON.stringify(response.body))['token'];
    }

    if (response.status == 401) {
      text = "Adresa de email sau parola este gresita!";
    }

    if (response.status == 500 || response.status == 404) {
      text = "A aparut o eroare!";
    }

    return {
      status: status,
      text: text
    };
  }

  public async sendRegisterRequest(userData: object): Promise<object> {
    // @ts-ignore
    const registerRequestDto: RegisterRequestDto = new RegisterRequestDto(userData.firstName, userData.lastName, userData.email, userData.password);
    const response: Response = await fetch(UserService.registerEndpoint(), {
      method: "POST",
      body: JSON.stringify(registerRequestDto),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let status = response.status;
    let text = "";

    if (response.status == 201) {
      text = "Contul a fost creat!";
    }

    if (response.status == 409) {
      text = "Adresa de email este asociata unui cont existent!";
    }

    if (response.status == 500 || response.status == 404) {
      text = "A aparut o eroare!";
    }

    return {
      status: status,
      text: text
    };
  }

  // TODO: This is dummy implementation.
  public logout() {
    this.name = "";
  }

  // TODO: This is dummy implementation.
  public getName(): string {
    return this.name;
  }
}
