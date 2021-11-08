import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private name: string = "";

  constructor() { }

  // TODO: This is just a demo example.
  public login() {
      this.name = "John Doe";
  }

  public logout() {
    this.name = "";
  }

  public getName(): string {
    return this.name;
  }
}
