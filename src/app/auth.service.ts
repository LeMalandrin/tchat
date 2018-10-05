import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedUser = new Subject<any>();

  constructor(private router: Router, public db: AngularFireDatabase) { }

  logout(): void {    
    console.log(this.getLoggedUser());
    this.router.navigateByUrl('/login');
    let cid = localStorage.getItem('connectionId');
    this.db.object('sessions/' + cid).remove();
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('email');
    this.setLoggedUser(false);
  } 

  
  setLoggedUser(user: any) {
    this.loggedUser.next(user);
  }

  getLoggedUser(): Observable<any> {
    return this.loggedUser.asObservable();
  }
  
  public isLoggedIn(): boolean{
    let status = false;
    if( localStorage.getItem('isLoggedIn') == "true"){
      status = true;
    }
    else{
      status = false;
    }
    return status;
  }

  public getEmail():string {
    return localStorage.getItem('email');
  }

}