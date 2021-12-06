import {CommentDto} from "./CommentDto";

export class StockDto {
  private readonly _name: string;
  private readonly _abbreviation: string;
  private readonly _actualValue: number;
  private readonly _predictedValue: number;
  private _comments: CommentDto[];

  constructor(name: string, abbreviation: string, actualValue: number, predictedValue: number, comments: CommentDto[] = []) {
    this._name = name;
    this._abbreviation = abbreviation;
    this._actualValue = actualValue;
    this._predictedValue = predictedValue;
    this._comments = comments;
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

  get actualValue(): number {
    return this._actualValue;
  }

  get predictedValue(): number {
    return this._predictedValue;
  }

  get comments(): CommentDto[] {
    return this._comments;
  }
}
