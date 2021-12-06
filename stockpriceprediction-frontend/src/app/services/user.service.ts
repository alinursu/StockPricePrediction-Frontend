import {Injectable} from '@angular/core';
import {LoginRequestDto} from "../models/dtos/LoginRequestDto";
import {RegisterRequestDto} from "../models/dtos/RegisterRequestDto";
import {BackendClientAPI} from "../models/apis/BackendClientAPI";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private backendClientAPI: BackendClientAPI = new BackendClientAPI();

  constructor() {
  }

  public async handleLoginRequest(userData: object): Promise<object> {
    // @ts-ignore
    const loginRequestDto: LoginRequestDto = new LoginRequestDto(userData.email, userData.password);
    let response: Response;
    try {
      response = await this.backendClientAPI.loginRequest(loginRequestDto);
    }
    catch(e) {
      console.log(e)
      return {
        status: 500,
        text: "Eroare: Server-ul nu este disponibil momentan!"
      }
    }

    let status = response.status;
    const responseBody = await response.json();
    let text = "";
    let name = "";

    if (response.ok) {
      text = responseBody.token;
      name = responseBody.name;
    }

    if (response.status == 401) {
      text = "Eroare: Adresa de email sau parola este gresita!";
    }

    if (response.status == 500 || response.status == 404) {
      text = "Eroare: Server-ul nu este disponibil momentan!";
    }

    return {
      status: status,
      text: text,
      name: name
    };
  }

  public async handleRegisterRequest(userData: object): Promise<object> {
    // @ts-ignore
    const registerRequestDto: RegisterRequestDto = new RegisterRequestDto(userData.firstName, userData.lastName, userData.email, userData.password);
    let response: Response;
    try {
      response = await this.backendClientAPI.registerRequest(registerRequestDto);
    }
    catch(e) {
      return {
        status: 500,
        text: "Eroare: Server-ul nu este disponibil momentan!"
      }
    }

    let status = response.status;
    let text = "";

    if (response.status == 201) {
      text = "Contul a fost creat!";
    }

    if (response.status == 400) {
      text = "Eroare: Adresa de email este asociata unui cont existent!";
    }

    if (response.status == 500 || response.status == 404) {
      text = "Eroare: Server-ul nu este disponibil momentan!";
    }

    return {
      status: status,
      text: text
    };
  }
}
