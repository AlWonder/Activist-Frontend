import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class NotifyService {

  private info = new Subject<string>();
  private success = new Subject<string>();
  private error = new Subject<string>();

  infoThrowed$ = this.info.asObservable();
  successThrowed$ = this.success.asObservable();
  errorThrowed$ = this.error.asObservable();

  emitInfo(info: string) {
    this.info.next(info);
  }

  emitSuccess(success: string) {
    this.success.next(success);
  }

  emitError(error: string) {
    this.error.next(error);
  }

  constructor() { }

}
