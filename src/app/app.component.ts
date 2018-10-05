import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'abe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  userSubscription: Subscription;
  user: any;
  userInitialized: any;

  constructor(public db: AngularFireDatabase, private authService: AuthService) {       
    if( this.authService.isLoggedIn() ) {
      let user = this.db.list('users', ref=>ref.orderByChild('email').equalTo(this.authService.getEmail()).limitToFirst(1)).valueChanges();
      user.subscribe( user => {
        this.user = user[0];
        this.userInitialized = true;
      })
    } else {
      this.user = false;
      this.userInitialized = true;
    }
  }
}
