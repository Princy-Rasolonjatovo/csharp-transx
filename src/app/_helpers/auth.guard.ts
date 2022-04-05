import {Injectable} from '@angular/core';

import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { AuthenticationService } from '@app/_services';
import { Observable } from 'rxjs';

import { NoUser } from '@app/_models';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate
{
    constructor (
        private router: Router,
        private authenticationService: AuthenticationService
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const currentUser = this.authenticationService.CurrentUserValue;
        if (currentUser.Id != NoUser.Id)
        {
            // user loged in
            return true;
        }
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
    }

    
}