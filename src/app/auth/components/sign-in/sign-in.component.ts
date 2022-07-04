import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Authenticate } from '../../models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['sign-in.component.css']
})

export  class SignInComponent {

  @Output() emailSubmission = new EventEmitter<Authenticate>();

  form: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', Validators.email),
    password: new UntypedFormControl('', Validators.required),
  });

  constructor() {}

  login() {
    if (this.form.valid) {
      this.emailSubmission.emit(this.form.value);
    } 
  }


}
