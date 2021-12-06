import {Component, OnInit} from '@angular/core';
import {ComponentDisplayerService} from "../../../services/component-displayer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {StockService} from "../../../services/stock.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StockDto} from "../../../models/dtos/StockDto";
import {CommentDto} from "../../../models/dtos/CommentDto";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  commentForm: FormGroup;
  numberOfVisibleStocks: number = 5;
  stockAbbreviation: string | null = "";
  stockDto: StockDto = new StockDto("init", "init", [], false);
  successMessage: string = "";
  errorMessage: string = "";

  constructor(private componentDisplayerService: ComponentDisplayerService,
              private stockService: StockService,
              private router: Router,
              private formBuilder: FormBuilder,
              private cookieService: CookieService,
              private route: ActivatedRoute) {
    this.componentDisplayerService.displayHeaderAndFooter = true;
    this.componentDisplayerService.allStocksMenuItemHighlighted = false;
    this.componentDisplayerService.favoriteStocksMenuItemHighlighted = false;

    if (this.cookieService.get('token') == '') {
      this.router.navigate(['/forbidden'])
    }

    this.commentForm = this.formBuilder.group({
      text: ['', [Validators.required]]
    })
  }

  async ngOnInit() {
    this.stockAbbreviation = this.route.snapshot.paramMap.get("abbreviation");
    if (this.stockAbbreviation == null) {
      this.stockAbbreviation = "";
    }

    this.stockDto = await this.stockService.getStockByAbbreviation(this.stockAbbreviation);
    this.stockDto.comments.sort(StockComponent.compareCommentDtos);
  }

  private static compareCommentDtos(comment1: CommentDto, comment2: CommentDto): number {
    if (comment1.datePublishedAsDate().getTime() > comment2.datePublishedAsDate().getTime())
      return -1;

    if (comment1.datePublishedAsDate().getTime() < comment2.datePublishedAsDate().getTime())
      return 1;

    return 0;
  }

  getNumberOfComments(): number {
    return this.stockDto.comments.length;
  }

  getComments(): CommentDto[] {
    return this.stockDto.comments;
  }

  getVisibleComments(): CommentDto[] {
    return this.stockDto.comments.slice(0, this.numberOfVisibleStocks);
  }

  increaseNumberOfVisibleComments() {
    this.numberOfVisibleStocks += 5;
  }

  isMarkedAsFavorite(): boolean {
    return this.stockDto.isMarkedAsFavorite;
  }

  public async insertComment() {
    let response = await this.stockService.addStockComment(
      this.stockDto.abbreviation,
      this.commentText()?.value
    );

    if (response.status == 200) {
      let responseBody = await response.json();

      this.stockDto.addComment(new CommentDto(
        Number(responseBody),
        this.cookieService.get('name'),
        this.commentText()?.value,
        0, 0, new Date()
      ));
      this.stockDto.comments.sort(StockComponent.compareCommentDtos);

      this.successMessage = "Comentariul a fost adaugat!";
      this.errorMessage = "";
      this.commentText()?.setValue(" ");
    } else {
      this.successMessage = "";
      this.errorMessage = "A aparut o eroare!"
    }
  }

  public async likeComment(comment: CommentDto) {
    let responseStatusCode = await this.stockService.likeStockComment(comment.id);

    if (responseStatusCode == 200) {
      comment.incrementLikes();
    }
  }

  public async dislikeComment(comment: CommentDto) {
    let responseStatusCode = await this.stockService.dislikeStockComment(comment.id);

    if (responseStatusCode == 200) {
      comment.incrementDislikes();
    }
  }

  public commentText(): AbstractControl | null {
    return this.commentForm.get('text');
  }

  public commentTextValidationRequired(): boolean {
    return !this.commentText()?.errors?.['required'];
  }

  async markAsFavorite() {
    let responseStatusCode = await this.stockService.markStockAsFavorite(this.stockDto.abbreviation);

    if (responseStatusCode == 200) {
      this.stockDto.changeFavoriteState();
    }
  }

  async markAsNotFavorite() {
    let responseStatusCode = await this.stockService.markStockAsNotFavorite(this.stockDto.abbreviation);

    if (responseStatusCode == 200) {
      this.stockDto.changeFavoriteState();
    }
  }
}
