import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:9000/auth'
  private recoverUrl = 'http://localhost:9000/auth/recover'
  private resetUrl = 'http://localhost:9000/auth/reset'

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username: user.email, password: user.password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user))
        return user
      }))
  }

  recover(email: string): Observable<any> {
    return this.http.put<any>(this.recoverUrl, email)
  }

  resetPassword(newPass: string, token: string, id: string): Observable<any> {
    return this.http.post<any>(`${this.resetUrl}/${token}/${id}`, { newPass })
  }

  logout() {
    localStorage.removeItem('currentUser')
  }
}
