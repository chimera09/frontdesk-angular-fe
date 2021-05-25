import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user?: User

  constructor(private loginService: LoginService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  login(user: User): void {
    this.loginService.login({ email: user.email, password: user.password } as User)
      .subscribe(user => {
        if(user) {
          if (user.role === 'User')
            this.router.navigate(['/entries'])
          else if (user.role === 'Super Admin') 
            this.router.navigate(['/register'])
          else
            this.router.navigate(['/login'])
        } else {
          this.toastr.error('User not found')
        }
      })
    }
}
