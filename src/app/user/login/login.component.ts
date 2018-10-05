import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth  } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ExistingLoginDirective } from '../../custom-validators/existing-login.directive';
import { AlreadyConnectedDirective } from '../../custom-validators/already-connected.directive';
import { AuthService } from '../../auth.service';
import { v4 as uuid } from 'uuid';

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
  existingLogin = false;
  alreadyConnected = false;
  hasPasswordError = false;
  logging = false;



  constructor(private formBuilder: FormBuilder, private router: Router, public db: AngularFireDatabase, public auth: AngularFireAuth, private authService: AuthService) {  
    this.loginForm = this.formBuilder.group({
      'login' : new FormControl(this.user.login, [ Validators.required] ),
      'password' : new FormControl(this.user.password, [ Validators.required ]),
    });
  }

  
  
  // convenience getter for easy access to form fields
  get controls() { return this.loginForm.controls; }
  
  onSubmit() {   
    this.submitted=true;
    this.logging = true;
    this.existingLogin = ExistingLoginDirective.validate(this.controls.login.value, this.users);
    //AlreadyConnectedDirective.validate(this.controls.login.value, this.users);
    if (this.loginForm.invalid) {
      this.logging = false;
      return;
    }
    this.loginProcess();
  }

  loginProcess() {
    let hasPasswordError = false;
    for(var existingUser of this.users) {
      if(existingUser.email == this.controls.login.value || existingUser.username == this.controls.login.value) {          
        this.auth.auth.signInWithEmailAndPassword(existingUser.email, this.controls.password.value).then(value => {
          this.hasPasswordError = false;          
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('email', existingUser.email);
          let connectionId = uuid();
          localStorage.setItem('connectionId', connectionId);
          this.db.object('sessions/' + connectionId).set({ 
            isLogged: true, 
            uid: existingUser.uid ,
            connectionId: connectionId
          }).then(()=> {
            this.router.navigateByUrl('/chat').then(() => {
              this.authService.setLoggedUser(existingUser);
            });
          })
        }).catch(error => {
          this.hasPasswordError = true;
        });
      }
    }
    this.logging = false;
  }


  ngOnInit() {
    this.db.list('users').valueChanges().subscribe(users => {
      this.users = users
    })
  }

  ngOnDestroy() {
    
  }

}
