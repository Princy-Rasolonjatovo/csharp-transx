import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders} from '@angular/common/http';
import {fromEventPattern, Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import { AuthenticationService } from '@app/_services';




// for sign in
export interface IUserDetails{
    firstname: string;
    lastname : string;
    email: string;
    phonenumber: string;
    password: string;
    // accountType: number;
}

// for Log in
export interface IUser{
    email: string;
    password: string;
}


const httpHeaderOption = {
	headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // Authorization: 'X-CSRFToken',
        // Authorization : 'Token key_str'
    })
    ,
	// withCredentials: true,
    // observe: 'response' as 'response',
};

// TODO Make a globals files containing this urls
const api_host = 'localhost';
const api_port = 5001;
// let api_url = `http://${api_host}:${api_port}/mediamanage/API/v1/registerUser`;
const api_url = `http://${api_host}:${api_port}/mediamanager/API/v1/`;


@Injectable({
    providedIn : 'root'
})
export class UserLoginService{
    constructor(private http: HttpClient, private authenticationService: AuthenticationService){

    }

    login(emailOrPassword: string, password: string)
    {
        return this.authenticationService.Login(emailOrPassword, password);
    }
    logout()
    {
        return this.authenticationService.Logout();
    }
    getCookie(): Observable<any>{
        const cookie_url = 'getCookie';
        const url = `${api_url}${cookie_url}`;
        console.log('[UserLoginServiceInfo] getCookie called');
        return this.http.get<any>(url, { observe: 'response'}).pipe(
            retry(5),
            catchError(this.errorHandler)
        );
        
    }

    private errorHandler(err: HttpErrorResponse){
        if(err.status == 0){
            console.error('[UserLoginServiceError.ClientSideError] ');
        }else{
            console.error(`[UserLoginServiceError.backendError] errorCode : ${err.status}, body: `, err.error);
        }
        return throwError('[UseroginServiceErrror.badrequest] try again later');
    }


}