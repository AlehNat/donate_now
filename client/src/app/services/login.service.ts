import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class LoginService {

  constructor() {
  }


  helloWorld(): Observable<string> {
    return Observable.of('Hello World!').delay(1000);
  }

}
