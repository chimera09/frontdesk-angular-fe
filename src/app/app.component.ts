import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';

import { LoginService } from './services/login/login.service';
import { TabletComponent } from './tablet/tablet.component';
import { ToastrService } from 'ngx-toastr';

import * as moment from 'moment';

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
  currentDate: string = moment().format('YYYY-MM-DD')
  startDate: moment.Moment = moment()
  endDate: moment.Moment = moment()

  constructor(private router: Router, 
    private location: Location, 
    private loginService: LoginService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      if (this.location.path() === '/login')
        this.inLogin = true;
      else
        this.inLogin = false;
    })
  }

  ngDoCheck(): void {
    const storage = localStorage.getItem('currentUser')
    if (storage) {
      this.loggedUser = JSON.parse(storage)
      this.loggedUser.token ? this.isLogged = true : this.isLogged = false
    } else {
      this.isLogged = false
    }
  }

  onChange(event: any) {
    if (event.srcElement.id === 'startDate') {
      this.startDate = moment(event.target.value)
    }
    else if (event.srcElement.id === 'endDate')
      this.endDate = moment(event.target.value)

    if (this.startDate.isAfter(this.endDate))
      this.toastrService.error('Start date should be before end date')
  }

  onActivate(component: TabletComponent) {
    component.isLogged = this.isLogged
  }

  logout() {
    this.loginService.logout()
    this.router.navigate(['/login'])
  }
}
