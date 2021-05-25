import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterEvent } from '@angular/router';
import jwt_decode from 'jwt-decode'
import { Role } from '../models/role';

import { LoginService } from '../services/login/login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    private token: string | null = null
    private role: string | null = null
    private exp: number = 0


    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.token !== null || this.token !== undefined) {
            try {
                const token = localStorage.getItem('currentUser')
                if (token) {
                    const userData = JSON.parse(token)
                    this.token = userData.token
                    this.parseToken(this.token!)
                } else {
                    return false
                }
            } catch (error) {
                console.error(error)
                return false
            }
        }
        
        if (this.exp <= 0) {
            localStorage.removeItem('currentUser')
            this.router.navigate(['/login'])
            return false
        }
        const hasAccess = this.role === route.data.role
        if (hasAccess === false && route.data.failover) {
            this.router.navigate([route.data.failover])
        }
        return hasAccess
    }

    parseToken(token: string) {
        try {
            const decoded = jwt_decode<any>(token)
            const { exp, role } = decoded
            console.log(exp)
            this.exp = exp - (Date.now() / 1000)
            this.role = role
        } catch (error) {
            // TODO nu pot sa decozed, ajutior
            console.error(error)
        }
    }
}