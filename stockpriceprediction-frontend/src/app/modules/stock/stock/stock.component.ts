import {Component, OnInit} from '@angular/core';
import {ComponentDisplayerService} from "../../../services/component-displayer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {StockService} from "../../../services/stock.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StockDto} from "../../../models/dtos/StockDto";
import {CommentDto} from "../../../models/dtos/CommentDto";
import {StockDataDto} from "../../../models/dtos/StockDataDto";
import {ChartDataSets, ChartType} from "chart.js";
import {Color, Label} from "ng2-charts";


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
  pastChartErrorMessage: string = "";
  futureChartErrorMessage: string = "";

  // Past chart variables
  public pastChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Pret in Dolari Americani (USD)'
    }
  ];

  public pastChartLabels: Label[] = [];

  // Future chart variables
  public futureChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Pret in Dolari Americani (USD)'
    }
  ];

  public futureChartLabels: Label[] = [];

  // General chart variables
  public lineChartOptions = {
    responsive: true,
    showLines: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        }
      }],
      yAxes: [{
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        }
      }]
    },
    elements:
      {
        point:
          {
            radius: 5,
            hitRadius: 5,
            hoverRadius: 8,
            hoverBorderWidth: 2
          }
      }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(153,115,142,0.51)',
      pointBackgroundColor: '#F64C72',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = "line";
  public lineChartPlugins = [];

  private static compareCommentDtos(comment1: CommentDto, comment2: CommentDto): number {
    if (comment1.datePublishedAsDate().getTime() > comment2.datePublishedAsDate().getTime())
      return -1;

    if (comment1.datePublishedAsDate().getTime() < comment2.datePublishedAsDate().getTime())
      return 1;

    return 0;
  }

  private static extractValuesAndLabels(data: StockDataDto[]) {
    let values = []
    let labels = []

    for (let i = 0; i < data.length; i++) {
      let date = `${data[i].date.getDate()}/${data[i].date.getMonth() + 1}/${data[i].date.getFullYear()}`;

      values.push(data[i].value);
      labels.push(date);
    }
    return {values, labels};
  }

  private buildPastChart(data: StockDataDto[]) {
    let {values, labels} = StockComponent.extractValuesAndLabels(data);

    this.pastChartData = [
      {data: values, label: 'Pret in Dolari Americani (USD)'},
    ];
    this.pastChartLabels = labels;
  }

  private buildFutureChart(data: StockDataDto[]) {
    let {values, labels} = StockComponent.extractValuesAndLabels(data);

    this.futureChartData = [
      {data: values, label: 'Pret in Dolari Americani (USD)'},
    ];
    this.futureChartLabels = labels;
  }

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

    let pastChartData: StockDataDto[] = await this.stockService.getStockDataInPastDays(
      this.stockDto.abbreviation
    );

    if(pastChartData.length == 1 && pastChartData[0].value == -999999999) {
      this.pastChartErrorMessage = "Serviciul este indisponibil momentan!";
    }
    else {
      this.buildPastChart(pastChartData);
    }

    let futureChartData: StockDataDto[] = await this.stockService.getStockDataPrediction(
      this.stockDto.abbreviation
    );


    if(futureChartData.length == 1 && futureChartData[0].value == -999999999) {
      this.futureChartErrorMessage = "Serviciul este indisponibil momentan!";
    }
    else {
      this.buildFutureChart(futureChartData);
    }
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

  async insertComment() {
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

  async likeComment(comment: CommentDto) {
    let responseStatusCode = await this.stockService.likeStockComment(comment.id);

    if (responseStatusCode == 200) {
      comment.incrementLikes();
    }
  }

  async dislikeComment(comment: CommentDto) {
    let responseStatusCode = await this.stockService.dislikeStockComment(comment.id);

    if (responseStatusCode == 200) {
      comment.incrementDislikes();
    }
  }

  commentText(): AbstractControl | null {
    return this.commentForm.get('text');
  }

  commentTextValidationRequired(): boolean {
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
