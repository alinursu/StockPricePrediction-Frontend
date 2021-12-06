export class CommentDto {
  private readonly _id: number;
  private readonly _author: string;
  private readonly _message: string;
  private _likes: number;
  private _dislikes: number;
  private readonly _datePublished: string;

  constructor(id: number, author: string, message: string, likes: number,
              dislikes: number, datePublished: string) {
    this._id = id;
    this._author = author;
    this._message = message;
    this._likes = likes;
    this._dislikes = dislikes;
    this._datePublished = datePublished
  }

  get id(): number {
    return this._id;
  }

  get author(): string {
    return this._author;
  }

  get message(): string {
    return this._message;
  }

  get likes(): number {
    return this._likes;
  }

  get dislikes(): number {
    return this._dislikes;
  }

  get datePublished(): string {
    return this._datePublished;
  }

  public incrementLikes() {
    this._likes++;
  }

  public incrementDislikes() {
    this._dislikes++;
  }
}
