import { Component, OnInit, EventEmitter, HostListener, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscription } from 'rxjs';

@Component({
  selector: 'abe-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  userDropdownOpen = false;
  userLoggedIn = false;
  userSubscription: Subscription;
  user: any;
  users: any[];
  userInitialized = false;
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private db: AngularFireDatabase) { 
    this.userSubscription = this.authService.getLoggedUser().subscribe( loggedUser => {
      this.user = loggedUser;
    })
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {        
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

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  toggleUserDropdown() {
    this.userDropdownOpen = !this.userDropdownOpen;
  }

  hideUserDropdown() {
    this.userDropdownOpen = false;
  }

}
