import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserLoginService } from './login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  	activeView: string = 'login';
	badLogin: boolean = true;
	remember_me: boolean = false;
  constructor(private route: Router, private loginManager: UserLoginService) { }

  ngOnInit(): void {
    // this.loginManager.getCookie().subscribe((response: any)=>{
		// 	console.log('GET COOKIE DONE')
		// 	let cookie = response.headers.get('csrftoken');
		// 	console.log(`cookie value: ${cookie}`);
		// 	console.log(cookie)
		// 	console.log('[QueryCookier] reponse' + response);
		// });
  }
  
//   changeView(loginForm: HTMLDivElement, signinForm: HTMLDivElement, viewName: string){
  changeView(loginForm: HTMLFormElement, signinForm: HTMLFormElement, viewName: string){
		const loginFormActive = {
			loginTransform: 'translateX(0%)',
			signinFormTransform: 'translateX(0%)'
		};
		const signinFormActive = {
			loginTransform: 'translateX(-100%)',
			signinFormTransform: 'translateX(-100%)'
		};
		const activeLogin = ()=>{
			loginForm.style.transform = loginFormActive.loginTransform;
			signinForm.style.transform = loginFormActive.signinFormTransform;
		};
		const activeSignin = () => {
			loginForm.style.transform = signinFormActive.loginTransform;
			signinForm.style.transform = signinFormActive.signinFormTransform;
		};
		if(viewName == 'login' && this.activeView != viewName){
			activeLogin();
			this.activeView = 'login';
			// TODO clear fiedls?

		}else if(viewName == 'signin' && this.activeView != viewName){
			activeSignin();
			this.activeView = 'signin';
		}else{
			// pass unknown keyword
		}
	}
	
	loginRequest(username: HTMLInputElement, password: HTMLInputElement){
		// TODO Make a post request to server with injected service
		console.log('click event post')
		const str_username = username.value.trim();
		const str_password = password.value;
		// console.log(`username: ${str_username} password: ${str_password}`);
		this.loginManager.login(str_username, str_password)
		.subscribe((response: any) => {
			console.log(response);
		}, 
		err=>{
			console.log('bobobobo');
			this.badLogin=true;
		}
		);
		
	}

	get isBadLogin(){
		return this.badLogin;
	}
}
