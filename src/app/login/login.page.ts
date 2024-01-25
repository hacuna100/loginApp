import { Component, ContentChild, OnInit } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import { RegisterContainerComponent } from '../register-container/register-container.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountDataService } from '../api-services/account-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  password: string = '';
  showPassword: boolean = false;
  private loginSubscription: any = Subscription; 

  // Group Form for login page that validates inputs
  loginGroupForm = new FormGroup({
    usernameLoginControl: new FormControl('', Validators.required),
    passwordLoginControl: new FormControl('', Validators.required)
  })

  constructor(private modalCtrl: ModalController, private loginService: AccountDataService) { }

  // Opens the Registration Modal for new users
  async openRegister() {
    const modal = await this.modalCtrl.create({
      component: RegisterContainerComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  // Method that allows a user to see their input password
  showHidden() {
    this.showPassword = !this.showPassword;
  }

  // validates login information from the server
  onLogin() {
    if(this.loginGroupForm.valid) {
      const username = this.loginGroupForm.get('usernameLoginControl')?.value as string;
      const password = this.loginGroupForm.get('passwordLoginControl')?.value as string;
      this.loginSubscription = this.loginService.loginAccount(username, password).subscribe({
        next: (response) => {
          console.log('Login Sucessful', response);
        },
        error: (error) => {
          console.error('Error logging in', error);
        }
      });
    }
    else {
      console.log('Form input invalid');
    }
  }

  // Used to call on the HTML page for validation response
  loginVar(vars: string) {
    if (vars == 'username') {
      return this.loginGroupForm.get('usernameLoginControl');
    }
    else if (vars == 'password') {
      return this.loginGroupForm.get('passwordLoginControl');
    }
    else {
      return console.log('Error');
    }
  }

  ngOnInit() {
  }

}
