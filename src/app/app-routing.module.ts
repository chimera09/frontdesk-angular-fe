import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TabletComponent } from './tablet/tablet.component';
import { EntriesComponent } from './entries/entries.component';
import { RegisterComponent } from './register/register.component';

import { AuthGuard } from './helpers/auth.guard';
import { Role } from './models/role';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tablet', component: TabletComponent },
  { path: 'entries', component: EntriesComponent, canActivate: [AuthGuard], data: { role: Role.User, failover: 'register' } },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard], data: { role: Role.Super, failover: 'entries' } },
  { path: '', redirectTo: '/tablet', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
