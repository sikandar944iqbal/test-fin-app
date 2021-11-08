import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header.component';
import { HomeComponent } from './pages/home.component';
import { AboutComponent } from './pages/about.component';

import { Routes, RouterModule } from '@angular/router';

import { AngularFileUploaderModule } from "angular-file-uploader";
import { LoginComponent } from './pages/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ScanResultComponent } from './pages/scan-result/scan-result.component';
import { HistoryComponent } from './pages/history/history.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { ReadinessComponent } from './pages/readiness.component';
import { LivenessComponent } from './pages/liveness.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    LoadingComponent,
    ScanResultComponent,
    HistoryComponent,
    AuthLayoutComponent,
    AppLayoutComponent,
    ReadinessComponent,
    LivenessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFileUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
