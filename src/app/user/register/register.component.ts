import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SamePasswordsDirective } from '../../custom-validators/same-passwords.directive';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth  } from 'angularfire2/auth';
import { Observable } from 'rxjs';

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
  processing = false;
  existingUserError:string = "";
  existingUsers: Observable<any[]>;
  subscription: any;
  userCreated: boolean = false;


  constructor(private formBuilder: FormBuilder, public db: AngularFireDatabase, public auth: AngularFireAuth) {   
    this.existingUsers = db.list('users').valueChanges();
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
    if (this.registerForm.invalid) {
        return;
    }
    this.saveProcess();
  }

  saveProcess() {
    this.subscription = this.existingUsers.subscribe(users => {
      if(users.length > 0) {  
        users.forEach((user,index,array) => {
          this.processing = true;
          if(user.email === this.user.email) {
            this.existingUserError = "L'adresse e-mail renseignée est correspond à un compte existant";
            this.processing = false;          
            return;
          }
        })
      } else {        
        this.processing = true;
        this.createAndSaveUser();
      }
    });
  }

  createAndSaveUser() {
    this.subscription.unsubscribe();
    this.auth.auth.createUserWithEmailAndPassword(this.user.email,this.user.password)
    .then(value => {
      this.subscription.unsubscribe();
      this.db.list('users').push({        
        username: this.user.username,
        email: this.user.email
      }).then(value => {    
        this.userCreated = true;
      });
    })
    .catch(err => {
      console.log("test1")
      this.existingUserError = "L'adresse e-mail renseignée est correspond à un compte existant";
      return;
    })
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
