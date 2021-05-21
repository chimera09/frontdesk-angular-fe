import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontdesk';
  inLogin: boolean = false;
  entries = "http://localhost:4200/entries";
  tablet = "http://localhost:4200/tablet";
  
  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.router.events.subscribe(val => {
      if(this.location.path() === '/login')
        this.inLogin = true;
      else 
        this.inLogin = false;
    })
  }
}
