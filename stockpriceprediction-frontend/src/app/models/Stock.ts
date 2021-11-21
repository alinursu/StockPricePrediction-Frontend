export class Stock {
  private readonly _name: string;
  private readonly _abbreviation: string;
  private readonly _actualValue: number;
  private readonly _predictedValue: number;

  constructor(name: string, abbreviation: string, actualValue: number, predictedValue: number) {
    this._name = name;
    this._abbreviation = abbreviation;
    this._actualValue = actualValue;
    this._predictedValue = predictedValue;
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
}
