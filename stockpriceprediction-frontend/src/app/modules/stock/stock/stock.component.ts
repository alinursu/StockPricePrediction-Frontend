import { Component, OnInit } from '@angular/core';
import {ComponentDisplayerService} from "../../../services/component-displayer.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {StockService} from "../../../services/stock.service";
import {CommentDto} from "../../../models/dtos/CommentDto";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  commentForm: FormGroup;
  numberOfVisibleStocks: number = 5;

  constructor(private componentDisplayerService: ComponentDisplayerService,
              private stockService: StockService,
              private router: Router,
              private formBuilder: FormBuilder,
              private cookieService: CookieService) {
    this.componentDisplayerService.displayHeaderAndFooter = true;
    this.componentDisplayerService.allStocksMenuItemHighlighted = false;
    this.componentDisplayerService.favoriteStocksMenuItemHighlighted = false;

    if(this.cookieService.get('token') == '') {
      this.router.navigate(['/forbidden'])
    }

    this.commentForm = this.formBuilder.group({
      text: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  getComments(): CommentDto[] {
    return this.stockService.comments;
  }

  getVisibleComments(): CommentDto[] {
    return this.stockService.comments.slice(0, this.numberOfVisibleStocks);
  }

  increaseNumberOfVisibleComments() {
    this.numberOfVisibleStocks += 5;
  }

  public insertComment() {
    // TODO: Send comment to backend
  }

  public commentText(): AbstractControl | null {
    return this.commentForm.get('text');
  }

  public commentTextValidationRequired(): boolean {
    return !this.commentText()?.errors?.['required'];
  }
}
