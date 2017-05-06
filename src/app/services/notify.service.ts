import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class NotifyService {

  private error = new Subject<string>();

  errorThrowed$ = this.error.asObservable();

  throwError(error: string) {
    this.error.next(error);
  }

  constructor() { }

}
