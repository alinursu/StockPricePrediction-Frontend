import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FavoriteStocksComponent} from './favorite-stocks.component';

describe('FavoriteStocksComponent', () => {
  let component: FavoriteStocksComponent;
  let fixture: ComponentFixture<FavoriteStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteStocksComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
