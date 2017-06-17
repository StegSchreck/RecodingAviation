import { PersistenceModule } from 'angular-persistence';
import { UserService } from './user.service';
import { TasksService } from './tasks.service';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { TaskComponent } from './task/task.component';
import { ManageTimeComponent } from './manage-time/manage-time.component';
import { KittenComponent } from './kitten/kitten.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    LandingComponent,
    TaskComponent,
    ManageTimeComponent,
    KittenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    PersistenceModule
  ],
  providers: [TasksService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
