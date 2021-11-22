import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "../app.component";
import {LoginComponent} from "../modules/login/login.component";
import {MainPageComponent} from "../modules/main-page/main-page.component";
import {RegisterComponent} from "../modules/register/register.component";
import {AllStocksComponent} from "../modules/all-stocks/all-stocks/all-stocks.component";
import {NotFoundComponent} from "../modules/not-found/not-found/not-found.component";

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
    path: 'favorite-stocks',
    component: AllStocksComponent
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
  // TODO: Add 404 page
  // TODO: Surpress user access if he is logged in or not
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
