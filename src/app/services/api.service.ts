import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { ApplicationCommand } from '../models';
import { APP_CONFIG, AppConfig } from '../config';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) { }

  public post(command: ApplicationCommand): Promise<any> {
    /* tslint:disable */
    console.log('POSTING: ', JSON.stringify(command));
    /* tslint:enable */
//    return this.http.post(`${this.config.apiHost}/${this.config.registrationEndpoint}`, command, {responseType: 'text'}).toPromise();
    return Promise.resolve();
  }
}
