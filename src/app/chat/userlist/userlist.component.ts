import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'abe-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  sessions: any[] = [];
  connectedUsersUids: any[] = [];
  connectedUsers: any[] = [];
  sessionsSubscription;

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.sessionsSubscription = this.db.list('sessions').valueChanges();
    this.sessionsSubscription.subscribe(sessions => {
      for(var session of sessions) {
        let found = false;

        for(var connectedUser of this.connectedUsersUids) {
          if(session.uid == connectedUser) {
            found = true;
          }
        }

        if(!found) {
          this.connectedUsersUids.push(session.uid)
        }

        console.log(this.connectedUsersUids);
      }

    })
  }

}
