import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'abe-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  users: any[];

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.db.list('sessions').valueChanges().subscribe(users => {
      let connectedUsers = [];
      users.forEach(user => {
        for(var connectedUser in connectedUsers) {

        }
      });
    });
  }

}
