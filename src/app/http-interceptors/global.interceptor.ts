import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EntryService } from '../entry.service';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

    constructor(private login: LoginService, private entryService: EntryService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(res => {
                console.log("Server response: ", res)

            }),
            catchError((err) => {
                console.log('Error in login interceptor')
                console.error(err)
                return throwError(err)
            })
        )
    }
}
