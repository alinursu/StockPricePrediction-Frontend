export class CommentDto {
  private readonly _stockAbbreviation: string;
  private readonly _userName: string;
  private readonly _datePublished: string;
  private readonly _text: string;
  private readonly _likes: number;
  private readonly _dislikes: number;


  constructor(stockAbbreviation: string, userName: string, datePublished: string, text: string, likes: number, dislikes: number) {
    this._stockAbbreviation = stockAbbreviation;
    this._userName = userName;
    this._datePublished = datePublished;
    this._text = text;
    this._likes = likes;
    this._dislikes = dislikes;
  }


  get stockAbbreviation(): string {
    return this._stockAbbreviation;
  }

  get userName(): string {
    return this._userName;
  }

  get datePublished(): string {
    return this._datePublished;
  }

  get text(): string {
    return this._text;
  }

  get likes(): number {
    return this._likes;
  }

  get dislikes(): number {
    return this._dislikes;
  }
}
