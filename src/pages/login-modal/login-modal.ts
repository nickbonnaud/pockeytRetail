import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewController } from 'ionic-angular';

import { User } from '../../models/user';
import { HttpUser } from '../../http-formatters/http-user';

import { EmailValidator } from '../../validators/email';
import { ApiProvider } from '../../providers/api/api';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastProvider } from '../../providers/toast/toast';

@Component({
  selector: 'page-login-modal',
  templateUrl: 'login-modal.html',
})
export class LoginModalPage {

	@ViewChild('loginSlider') loginSlider: any;

  loginForm: FormGroup;
  private submitAttempt: boolean = false;
  private loading: boolean = false;

  constructor(
  	private formBuilder: FormBuilder,
  	private viewCtrl: ViewController,
  	private emailValidator: EmailValidator,
  	private api: ApiProvider,
  	private auth: AuthProvider,
  	private toast: ToastProvider
  ) {
  	this.loginForm = formBuilder.group({
  		email: ['', Validators.compose([Validators.email, Validators.required]), this.emailValidator.checkCorrectEmail.bind(this.emailValidator)],
  		password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  	});
  }

  postLoginData() {
  	this.submitAttempt = true;
  	if (this.loginForm.valid) {
  		this.loading = true;
  		let endpoint = 'login';

  		let submitLoginData = this.api.post(endpoint, this.loginForm.value).subscribe((response) => {
  			this.loading = false;
  			this.setUserData((new HttpUser(response.data)).getUser());
  			this.viewCtrl.dismiss();
  			submitLoginData.unsubscribe();
  		}, (error) => {
  			this.loading = false;
  			let message: string;
  			if (error.error == 'invalid_email') {
  				message = 'The email you entered does not exist.';
  			} else if (error.error == 'invalid_password') {
  				message = 'The password you entered is incorrect.';
  			} else {
  				message = 'Oops! Something went wrong. Please try again.';
  			}
  			this.toast.show(message, 'toast-error error-notify', 'middle');
  			submitLoginData.unsubscribe();
  		});
  	}
  }

  setUserData(user: User) {
  	this.auth.setAuthUser(user);
  }
}
