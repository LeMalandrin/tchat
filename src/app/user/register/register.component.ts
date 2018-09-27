import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {    
    this.registerForm = new FormGroup({
      'email' : new FormControl(this.user.email, [ Validators.required, Validators.email] ),
      'username' : new FormControl(this.user.email, [ Validators.required, Validators.min(5), Validators.max(15) ])
      
    });
  }

  // convenience getter for easy access to form fields
  get controls() { return this.registerForm.controls; }

  onSubmit() {    
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        console.log(this.controls.email.errors)
        return;
    }
    console.log('SUCCESS!! :-)')
  }

}
