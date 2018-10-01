import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[abeExistingLogin]'
})
export class ExistingLoginDirective {
  users: any[];

  constructor() {}
  public setUsers(userSubscription) {    
    userSubscription = userSubscription.subscribe(users => {
      this.users = users;
    });
  }
  public validate() {    
    return (control: AbstractControl): {[key: string]: any} | null => {
      var found = false;
      for(var user in this.users) {
        if(this.users[user].email == control.value || this.users[user].username == control.value) {
          found = true;
        }
      }
      return !found ? {'existingLogin': found} : null;
    };
  }

}
