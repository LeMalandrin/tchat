import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SamePasswordsDirective } from '../../custom-validators/same-passwords.directive';

@Component({
  selector: 'abe-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: any = {
     'email': "", 
     'username': "", 
     'password': "", 
     'passwordConfirm': ""
  };
  submitted = false;


  constructor(private formBuilder: FormBuilder) {
    
    this.registerForm = this.formBuilder.group({
      'email' : new FormControl(this.user.email, [ Validators.required, Validators.email] ),
      'username' : new FormControl(this.user.username, [ Validators.required, Validators.minLength(5), Validators.maxLength(15) ]),
      'password' : new FormControl(this.user.password, [ Validators.required, Validators.minLength(8), Validators.maxLength(20) ]),
      'passwordConfirm' : new FormControl(this.user.passwordConfirm, [ Validators.required ])
    }, {validator: SamePasswordsDirective.validate.bind(this)} );
  }

  ngOnInit() {    
  }

  // convenience getter for easy access to form fields
  get controls() { return this.registerForm.controls; }

  onSubmit() {    
    this.submitted = true;
    // stop here if form is invalid
        console.log(this.registerForm.errors)
    if (this.registerForm.invalid) {
        return;
    }
    console.log('SUCCESS!! :-)')
  }


  updateEmail(event) {
    this.user.email = event.target.value;
  }
  updateUsername(event) {
    this.user.username = event.target.value;
  }
  updatePassword(event) {
    this.user.password = event.target.value;
  }
  updatePasswordConfirm(event) {
    this.user.passwordConfirm = event.target.value;
  }
}
