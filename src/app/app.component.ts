import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontdesk';
  inLogin: boolean = false;
  isLogged: boolean = false;
  entries = "http://localhost:4200/entries";
  tablet = "http://localhost:4200/tablet";
  
  constructor(private router: Router, private location: Location, private loginService: LoginService) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      if(this.location.path() === '/login')
        this.inLogin = true;
      else 
        this.inLogin = false;
    })
  }

  ngDoCheck(): void {
    const storage = localStorage.getItem('currentUser')
    if(storage) {
      this.isLogged = true
    } else {
      this.isLogged = false
    }
  }

  logout() {
    this.loginService.logout()
    this.router.navigate(['/login'])
  }
}
