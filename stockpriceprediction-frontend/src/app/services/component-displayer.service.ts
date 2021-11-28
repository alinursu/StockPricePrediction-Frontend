import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentDisplayerService {
  public displayHeaderAndFooter: boolean = true;

  constructor() { }
}
