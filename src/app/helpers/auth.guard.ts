import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterEvent } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    private token: string | null = null
    private role: string | null = null
    private exp: number = 0


    constructor(
        private router: Router,
        private toastrService: ToastrService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = localStorage.getItem('currentUser')
        if (token) {
            const userData = JSON.parse(token)
            this.token = userData.token
            this.parseToken(this.token!)
        } else {
            this.router.navigate(['/login'])
            return false
        }

        if (this.exp <= 0) {
            localStorage.removeItem('currentUser')
            this.router.navigate(['/login'])
            this.toastrService.error('Token has expired')
            return false
        }

        const hasAccess = this.role === route.data.role
        if (hasAccess === false) {
            if (route.data.failover)
                this.router.navigate([route.data.failover])
            else {
                this.router.navigate(['/tablet'])
            }
            this.toastrService.error("You don't have access to this route")
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
            this.toastrService.error('Could not decode token')
            console.error(error)
        }
    }
}