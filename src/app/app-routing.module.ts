import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './auth/authentication.guard';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AboutComponent } from './pages/about.component';
import { HistoryComponent } from './pages/history/history.component';
import { HomeComponent } from './pages/home.component';
import { LoginComponent } from './pages/login.component';
import { ScanResultComponent } from './pages/scan-result/scan-result.component';
import { SignupComponent } from './pages/signup.component';
import { ReadinessComponent } from './pages/readiness.component';
import { LivenessComponent } from './pages/liveness.component';


const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent, 
      },
      {
        path: 'readiness',
        component: ReadinessComponent, 
      },
      {
        path: 'liveness',
        component: LivenessComponent, 
      },
    ],
  },
  {
    path: 'home',
    component: AppLayoutComponent, 
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'result', component: ScanResultComponent },
      { path: 'history', component: HistoryComponent },
    ],
  },
  // { path: '', component: LoginComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignupComponent },
  // { path: 'home', component: HomeComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'result', component: ScanResultComponent },
  // { path: 'history', component: HistoryComponent },
  // { path: 'bikes', component: BikeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
