import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validateDate(date) {
    var re = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    return re.test(String(date));
  }

  validateCap(code) {
    var re = /[A-Z]{3}/;
    return re.test(String(code));
  }
}
