import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
// import { AuthComponent } from './auth/auth.component'
// import { AuthDetailComponent } from './auth/auth-detail.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { AuthGuard } from './shared/guards/auth-guard.service'


const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuard],
    component:HomeComponent,
  },
  {
    path:'auth',
    loadChildren:'./auth/auth.module#AuthModule'
  },
  // {
  //   path:'auth',
  //   component:AuthComponent
  // },
  // {
  //   path:'auth/:slug',
  //   component:AuthDetailComponent
  // },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
