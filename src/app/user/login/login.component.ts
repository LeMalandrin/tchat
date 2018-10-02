import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ExistingLoginDirective } from '../../custom-validators/existing-login.directive';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth  } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'abe-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() informationMsg: string;

  loginForm: FormGroup;
  user: any = {
     'login': "", 
     'password': "", 
  };
  submitted = false;
  users: any[];
  passwordError = "";


  constructor(private formBuilder: FormBuilder, public db: AngularFireDatabase, public auth: AngularFireAuth) {  
    let existingLoginValidator = new  ExistingLoginDirective();
    existingLoginValidator.setUsers( this.db.list('users').valueChanges() );
    this.loginForm = this.formBuilder.group({
      'login' : new FormControl(this.user.login, [ Validators.required, existingLoginValidator.validate()] ),
      'password' : new FormControl(this.user.password, [ Validators.required ]),
    });
  }

  
  // convenience getter for easy access to form fields
  get controls() { return this.loginForm.controls; }
  
  onSubmit() {   
    this.submitted=true;
    
    if (this.loginForm.invalid) {
      return;
    }
    this.loginProcess();
  }

  loginProcess() {
    
      this.auth.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
        
      });
  }


  ngOnInit() {
  }

}
