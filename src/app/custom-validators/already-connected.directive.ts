import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[abeAlreadyConnected]'
})
export class AlreadyConnectedDirective {
  users: any[];

  constructor() {}
  static validate(login,users) {  
    for(var user of users) {
      console.log(user)
    }
  }

}
