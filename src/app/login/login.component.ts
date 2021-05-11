import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user?: User

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
  }

  login(user: User): void {
    this.loginService.login({ email: user.email, password: user.password } as User)
      .subscribe(user => this.user = user)
  }

}
