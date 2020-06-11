import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from './auth.service'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(public authService: AuthService,
                public router: Router,
    ) { }
    
    currentURL: string;

    canActivate(
        activatedRouteSnapshot: ActivatedRouteSnapshot
    ): boolean {
        if (!this.authService.isAuthenticatedBool()) {
            localStorage.setItem('nextHop', activatedRouteSnapshot.routeConfig.path);
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

}
