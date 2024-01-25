import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { MaskitoOptions, MaskitoElementPredicate } from '@maskito/core';
import { StrongPasswordRegx, confirmMatchPassword } from '../validators/custom-validators';
import { Subscription } from 'rxjs';
import { AccountDataService } from '../api-services/account-data.service';

@Component({
  selector: 'app-register-container',
  templateUrl: './register-container.component.html',
  styleUrls: ['./register-container.component.scss'],
})
export class RegisterContainerComponent  implements OnInit, OnDestroy {
  password1: string = '';
  password2: string = '';
  showPassword1: boolean = false;
  showPassword2: boolean = false;
  private userSubscription: any = Subscription;


  // Group form for account creation page and its validation
  accountCreateForm = new FormGroup({
    accountTypeControl: new FormControl(false, Validators.required),
    firstNameControl: new FormControl('', Validators.required),
    lastNameControl: new FormControl('', Validators.required),
    userNameControl: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    phoneNumControl: new FormControl('', [
      Validators.required,
      Validators.minLength(14)
    ]),
    emailControl: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    pwdControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(StrongPasswordRegx)
    ]),
    pwdConfirmControl: new FormControl('', [
      Validators.required
    ]),
  }, {validators: confirmMatchPassword});

  // Regex for phone number input in real time using Maskito dependency
  readonly phoneMask: MaskitoOptions = {
    mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  constructor(private modalCtrl: ModalController, private createUserService: AccountDataService) {
   }

  // Sync's Masiko regex in real time to the HTML tag
  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();

  // Method that shows users input on password
  showHidden1() {
    this.showPassword1 = !this.showPassword1;
  }

  showHidden2() {
    this.showPassword2 = !this.showPassword2;
  }

  // Handles the data and submits it to the database calling the API
  onSubmit() {
    if(this.accountCreateForm.valid) {
      const accType = this.accountCreateForm.get('accountTypeControl')!.value as boolean;
      const fName = this.accountCreateForm.get('firstNameControl')!.value as string;
      const lName = this.accountCreateForm.get('lastNameControl')!.value as string;
      const uName = this.accountCreateForm.get('userNameControl')!.value as string;
      const pNum = this.accountCreateForm.get('phoneNumControl')!.value as string;
      const email = this.accountCreateForm.get('emailControl')?.value as string;
      const pwd = this.accountCreateForm.get('pwdControl')?.value as string;
      this.userSubscription = this.createUserService.postAccounts(accType, fName, lName, uName, pNum, email, pwd).subscribe({
        next: (response) => {
          console.log('user created', response)
        },
        error: (error) => {
          console.error('Error creating user', error)
        },
      });
    }
    else {
      console.log('Form is Invalid');
    }
  }

  // Method that returns desired form control using a string parameter
  accountVar(vars: string) {
    if(vars == 'fName') {
      return this.accountCreateForm.get('firstNameControl');
    }
    else if (vars == 'lName') {
      return this.accountCreateForm.get('lastNameControl');
    }
    else if (vars == 'uName') {
      return this.accountCreateForm.get('userNameControl');
    }
    else if (vars == 'pNum') {
      return this.accountCreateForm.get('phoneNumControl');
    }
    else if (vars == 'email') {
      return this.accountCreateForm.get('emailControl');
    }
    else if (vars == 'pwd') {
      return this.accountCreateForm.get('pwdControl')
    }
    else if (vars == 'pwdConfirm') {
      return this.accountCreateForm.get('pwdConfirmControl');
    }
    else {
      return console.log('Error');
    }
  }

  // Dismisses registration modal
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
