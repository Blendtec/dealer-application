import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export abstract class BaseComponent implements OnDestroy {
  protected destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnDestroy() {
    this.destroy$.next();
  }
}
