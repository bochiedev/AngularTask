import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component'
import { AuthDetailComponent } from './auth-detail.component'



const routes: Routes = [
  {
    path:'',
    component:AuthComponent
  },
  {
    path:':slug',
    component:AuthDetailComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
