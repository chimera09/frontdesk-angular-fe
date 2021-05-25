import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:9000/auth'
  private isLoggedUrl = 'http://localhost:9000/isLogged'

  constructor(private http: HttpClient) { }   

  login(user: User): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username: user.email, password: user.password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user))
        return user
      }))
  }

  isLogged(): Observable<any> {
    return this.http.post<any>(this.isLoggedUrl, {})
  }

  logout() {
    localStorage.removeItem('currentUser')
  }
}
