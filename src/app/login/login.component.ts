import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import { ResetModalComponent } from './resetModal/reset-modal.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user?: User
  tabletUrl: string = 'http://localhost:4200/tablet'

  constructor(private loginService: LoginService,
    private router: Router,
    private toastrService: ToastrService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ResetModalComponent, {
      width: '30%',
      height: '20%',
    });
  }

  login(user: User): void {
    this.loginService.login({ email: user.email, password: user.password } as User)
      .subscribe(user => {
        if (user.token) {
          if (user.role === 'User')
            this.router.navigate(['/entries'])
          else if (user.role === 'Super Admin')
            this.router.navigate(['/register'])
          else
            this.router.navigate(['/login'])
        } else {
          this.toastrService.error('User not found')
        }
      }, error => {
        console.error(error)
        this.toastrService.error('Incorrect login')
      })
  }
}
