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
	badLogin: boolean = false;
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
  changeView(loginForm: HTMLDivElement, signinForm: HTMLDivElement, viewName: string){
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
		
		this.loginManager.logIn(str_username, str_password)
		//! warning: experimental 
		
		// .subscribe(
		// 	(response: any)=>{
		// 		console.log(`response: ${response}`)
		// 		console.log(response);
		// 		if (response['details'] == 'success'){
		// 			this.badLogin = false;
		// 			// register user
		// 			localStorage.setItem('username', response.username);
		// 			localStorage.setItem('token', response.token);
		// 			localStorage.setItem('userid', response.pk);
		// 			// navigate to view
		// 			this.route.navigate(['/home']);
		// 		}else if(response['details'] == 'failure'){
		// 			// display error
		// 			this.badLogin = true;
		// 		}

		// 	},
		// );
		//! warning: experimental 
		this.route.navigate(['/home']);
	}
}
