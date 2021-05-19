import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
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
        if(user.name) {
          this.user = user
          this.router.navigateByUrl('/entries')
        } else {
          this.toastr.error('User not found')
        }
      })
    }
}
