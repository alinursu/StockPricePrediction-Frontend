import {CommentDto} from "./CommentDto";
import {StockDataDto} from "./StockDataDto";

export class StockDto {
  private readonly _name: string;
  private readonly _abbreviation: string;
  private _comments: CommentDto[];
  private _isMarkedAsFavorite: boolean;
  private _todayPrice: StockDataDto | undefined;
  private _tomorrowPrice: StockDataDto| undefined;

  constructor(name: string, abbreviation: string, comments: CommentDto[] = [],
              isMarkedAsFavorite: boolean) {
    this._name = name;
    this._abbreviation = abbreviation;
    this._comments = comments;
    this._isMarkedAsFavorite = isMarkedAsFavorite;
    this._todayPrice = undefined;
    this._tomorrowPrice = undefined;
  }

  get name(): string {
    return this._name;
  }

  get abbreviation(): string {
    return this._abbreviation;
  }

  get comments(): CommentDto[] {
    return this._comments;
  }

  get isMarkedAsFavorite(): boolean {
    return this._isMarkedAsFavorite;
  }

  get todayPrice(): StockDataDto | undefined {
    return this._todayPrice;
  }

  get tomorrowPrice(): StockDataDto | undefined {
    return this._tomorrowPrice;
  }

  set todayPrice(value: StockDataDto | undefined) {
    this._todayPrice = value;
  }

  set tomorrowPrice(value: StockDataDto | undefined) {
    this._tomorrowPrice = value;
  }

  public addComment(comment: CommentDto) {
    this._comments.push(comment);
  }

  public changeFavoriteState() {
    this._isMarkedAsFavorite = !this._isMarkedAsFavorite;
  }
}
