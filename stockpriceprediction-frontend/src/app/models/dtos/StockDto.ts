import {CommentDto} from "./CommentDto";

export class StockDto {
  private readonly _name: string;
  private readonly _abbreviation: string;
  private _comments: CommentDto[];
  private _isMarkedAsFavorite: boolean;

  constructor(name: string, abbreviation: string, comments: CommentDto[] = [],
              isMarkedAsFavorite: boolean) {
    this._name = name;
    this._abbreviation = abbreviation;
    this._comments = comments;
    this._isMarkedAsFavorite = isMarkedAsFavorite;
  }

  public addComment(comment: CommentDto) {
    this._comments.push(comment);
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

  public changeFavoriteState() {
    this._isMarkedAsFavorite = !this._isMarkedAsFavorite;
  }
}
