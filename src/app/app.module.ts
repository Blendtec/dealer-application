import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApplicationComponent } from './components';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';
import { ApiService } from './services/api.service';
import { CountryService } from './services/country.service';
import { MyDatePickerModule } from 'mydatepicker';
import { StateService } from './services/state.service';
import { NgPipesModule } from 'ngx-pipes';
import { AppConfigModule } from './config';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppConfig } from './config/models/app-config.interface';
import { APP_CONFIG } from './config/app-config.module';

export function HttpLoaderFactory(http: HttpClient, config: AppConfig) {
  return new TranslateHttpLoader(http, `${config.assets}/i18n/`, '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
  ],
  imports: [
    AppConfigModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MyDatePickerModule,
    NgHttpLoaderModule,
    NgPipesModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, APP_CONFIG]
      }
    })
  ],
  providers: [
    ApiService,
    CountryService,
    FormBuilder,
    StateService,
    TranslatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
