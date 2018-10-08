import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'abe-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  sessions: any[] = [];
  connectedUsers: any[] = [];
  sessionsSubscription;

  constructor(private db: AngularFireDatabase) { 
    this.sessionsSubscription = this.db.list('sessions').valueChanges();
    this.sessionsSubscription.subscribe(sessions => {
      sessions.forEach(session => {
        
        let found = false;
        for(var key in this.connectedUsers) {
          console.log(this.connectedUsers[key]);
          /*if(session.uid === connectedUser.uid) {
            found = true;
          }*/
        }

        if(!found) {
          console.log('non trouve')
          this.db.object('users/' + session.uid).valueChanges().subscribe(user=> {
            this.connectedUsers[session.uid] = user;
            this.connectedUsers[session.uid]['sessions'] = [];
            this.connectedUsers[session.uid]['sessions'].push(session);
          })          
        } else {
          console.log('trouve')
          this.connectedUsers[session.uid]['sessions'].push(session);        
        } 
      });
      
      console.log(this.connectedUsers)
    })
  }

  ngOnInit() {}

}
