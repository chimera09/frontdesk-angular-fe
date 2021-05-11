import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TabletComponent } from './tablet/tablet.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tablet', component: TabletComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
