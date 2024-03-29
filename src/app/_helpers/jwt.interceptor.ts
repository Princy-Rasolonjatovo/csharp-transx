import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@app/_services';




@Injectable()
export class JwtInterceptor implements HttpInterceptor
{
    constructor ( private authenticationService: AuthenticationService)
    {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authenticationService.CurrentUserValue;
        const isLoggedIn = currentUser && currentUser.Token;
        if (isLoggedIn)
        {
            request = request.clone(
                {
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.Token}`
                    }
                }
            )
        }
        return next.handle(request);
    }
}