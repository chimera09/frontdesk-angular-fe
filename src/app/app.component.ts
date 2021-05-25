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
  loggedUser: any
  entriesUrl: string = 'http://localhost:4200/entries';
  tabletUrl: string = 'http://localhost:4200/tablet';
  registerUrl: string = 'http://localhost:4200/register';
  
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
      this.loggedUser = JSON.parse(storage)
    } else {
      this.isLogged = false
    }
  }

  onActivate(component: any) {
    component.isLogged = this.isLogged
  }

  logout() {
    this.loginService.logout()
    this.router.navigate(['/login'])
  }
}
