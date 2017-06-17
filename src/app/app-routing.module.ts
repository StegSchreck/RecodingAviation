import { OverviewComponent } from './overview/overview.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { "path": '', "redirectTo": '/login', "pathMatch": 'full' },
    { "path": 'login',  "component": LandingComponent},
    { "path": 'home',  "component": HomeComponent},
    { "path": 'overview',  "component": OverviewComponent},
    { "path": '**',  "redirectTo": "login" }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}