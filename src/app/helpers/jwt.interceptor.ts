import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private isLoggedIn: boolean = false
    private isApiUrl: boolean = false
    private user: any = {}

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const store = localStorage.getItem('currentUser')
        if (store) {
            this.user = JSON.parse(store)
            this.isLoggedIn = this.user.role && this.user.token
            this.isApiUrl = request.url.startsWith(environment.apiUrl);
        }
        if (this.isLoggedIn && this.isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.user.token}`
                }
            });
        }

        return next.handle(request);
    }
}