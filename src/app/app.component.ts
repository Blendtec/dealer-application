import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  appState: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
