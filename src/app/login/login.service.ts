import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders} from '@angular/common/http';
import {fromEventPattern, Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';



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
        Authorization: 'X-CSRFToken',
        // Authorization : 'Token key_str'
    })
    ,
	// withCredentials: true,
    // observe: 'response' as 'response',
};

// TODO Make a globals files containing this urls
const api_host = 'localhost';
const api_port = 8000;
// let api_url = `http://${api_host}:${api_port}/mediamanage/API/v1/registerUser`;
const api_url = `http://${api_host}:${api_port}/mediamanager/API/v1/`;


@Injectable({
    providedIn : 'root'
})
export class UserLoginService{
    constructor(private http: HttpClient){

    }

    logIn(email_or_username: string, password: string): Observable<any>{
        const login_url = 'login';
        const url = `${api_url}${login_url}`;
        console.log(`url : ${url}`);
        
        return this.http.post(url, 
            {
                username: email_or_username,
                password: password
            },
            httpHeaderOption
        ).pipe(
            catchError(this.errorHandler)
        );
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