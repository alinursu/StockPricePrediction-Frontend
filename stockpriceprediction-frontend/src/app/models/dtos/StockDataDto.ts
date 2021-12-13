export class StockDataDto {
  private readonly _date: Date;
  private readonly _value: number;

  constructor(date: Date, value: number) {
    this._date = date;
    this._value = value;
  }

  get date(): Date {
    return this._date;
  }

  get value(): number {
    return this._value;
  }

  public dateAsString(): string {
    return `${this._date.getDate()}/${this._date.getMonth() + 1}/${this._date.getFullYear()}`;
  }
}
