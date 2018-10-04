import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[abeExistingLogin]'
})
export class ExistingLoginDirective {
  users: any[];

  constructor() {}
  static validate(login,users) {  
    for(var user of users) {
      return (login == user.email || login == user.username) ? true : false;
    }
  }

}
