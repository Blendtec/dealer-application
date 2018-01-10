import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApplicationComponent } from './components';
import { AppRoutingModule } from './app-routing.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';
import { RegistrationService } from './services/registration.service';
import { CountryService } from './services/country.service';
import { RetailerService } from './services/retailer.service';
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
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
    RegistrationService,
    CountryService,
    RetailerService,
    FormBuilder,
    StateService,
    TranslatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
