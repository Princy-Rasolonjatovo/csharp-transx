import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';

import { environment } from '@environments/environment';

import { IUser, NoUser, User }  from '@app/_models';

const httpHeaderOption = {
	headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // Authorization: 'X-CSRFToken',
        // Authorization : 'Token key_str'
    })
    ,
	// withCredentials: true,
    observe: 'response' as 'response',
};


@Injectable({ providedIn: 'root'})
export class AuthenticationService
{
    private CurrentUserSubject: BehaviorSubject<User>; // BehaviorSubject<IUser>
    private CurrentUser : Observable<User>;

    constructor(private http: HttpClient)
    {
        
        let user = JSON.parse(localStorage.getItem('currentUser') || '{"none": "none"}');
        this.CurrentUserSubject = new BehaviorSubject<IUser>(user);
        this.CurrentUser = this.CurrentUserSubject.asObservable();
    }

    public get CurrentUserValue() : User
    {
        return this.CurrentUserSubject.value;
    }

    public Login(usernameOrEmail: string, password: string)
    {
        /**
         * interface IUserRequest
         * {
         *      UsernameOrEmail: string;
         *      Password: string
         * }
         */
        
        return this.http.post<any> /// this.http.post<IUserRequest>
        (`${environment.apiURL}customers/authenticate`, 
            {UsernameOrEmail: usernameOrEmail, Password: password},
            httpHeaderOption
            ) /// follow api data contrat
        .pipe(map(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.CurrentUserSubject.next(user.body);
            return user;
        }));
    }

    public Logout()
    {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.CurrentUserSubject.next(NoUser);
    }
}