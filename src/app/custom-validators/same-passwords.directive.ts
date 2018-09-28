import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[abeSamePasswords]'
})
export class SamePasswordsDirective {
  constructor() {}
  static validate(group: FormGroup) {    
    return (group.controls.password.value === group.controls.passwordConfirm.value) ? null : {notSame: true};
  }

}
