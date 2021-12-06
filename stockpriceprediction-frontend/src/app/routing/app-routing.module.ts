import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../modules/login/login.component";
import {MainPageComponent} from "../modules/main-page/main-page.component";
import {RegisterComponent} from "../modules/register/register.component";
import {AllStocksComponent} from "../modules/all-stocks/all-stocks/all-stocks.component";
import {NotFoundComponent} from "../modules/not-found/not-found/not-found.component";
import {ForbiddenComponent} from "../modules/forbidden/forbidden/forbidden.component";
import {StockComponent} from "../modules/stock/stock/stock.component";
import {FavoriteStocksComponent} from "../modules/favorite-stocks/favorite-stocks/favorite-stocks.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'all-stocks',
    component: AllStocksComponent
  },
  {
    path: 'stock/:abbreviation',
    component: StockComponent
  },
  {
    path: 'favorite-stocks',
    component: FavoriteStocksComponent
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: '',
    component: MainPageComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
