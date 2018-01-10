import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationComponent } from './application.component';
import { APP_BASE_HREF } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationService, RetailerService, CountryService, StateService } from '../../services';
import { NgPipesModule } from 'ngx-pipes';
import { MyDatePickerModule } from 'mydatepicker';
import { APP_CONFIG, AppConfigModule } from '../../config';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('ApplicationComponent', () => {


  const registrationSvcMock = jasmine.createSpyObj('RegistrationService', ['post']);
  registrationSvcMock.post.and.returnValue(Promise.resolve());

  const stateSvcMock = jasmine.createSpyObj('StateService', ['getAll$']);
  stateSvcMock.getAll$.and.returnValue(Promise.resolve());

  const countrySvcMock = jasmine.createSpyObj('CountryService', ['getAll$']);
  countrySvcMock.getAll$.and.returnValue(Promise.resolve());

  const retailerSvcMock = jasmine.createSpyObj('RetailerService', ['getAll$']);
  retailerSvcMock.getAll$.and.returnValue(Promise.resolve());

  const registrationFormMock = {
    value: {
      firstName: '',
      lastName: '',
      marketingOptIn: true,
      recaptcha: '',
      address: {
        one: '',
        two: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        email: '',
        phone: ''
      },
      purchase: {
        place: '',
        other: ''
      },
      serial: {
        prefix: '',
        suffix: ''
      }
    }
  };

  let component: ApplicationComponent;
  let fixture: ComponentFixture<ApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationComponent],
      imports: [
        AppConfigModule,
        FormsModule,
        HttpClientModule,
        MyDatePickerModule,
        NgPipesModule,
        ReactiveFormsModule,
        RecaptchaModule.forRoot(),
        TranslateModule
      ],
      providers: [
        FormBuilder,
        {provide: RegistrationService, useValue: registrationSvcMock},
        {provide: RetailerService, useValue: retailerSvcMock},
        {provide: CountryService, useValue: countrySvcMock},
        {provide: StateService, useValue: stateSvcMock},
        {provide: TranslateService, useValue: {} },
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: APP_CONFIG, useValue: {s3: 's3Url', captchaKey: 'testKey'}},
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(ApplicationComponent);
    component = fixture.componentInstance;

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set captchaKey from config', () => {
      expect(component.captchaKey).toEqual('testKey');
  });

  describe('onSubmit', () => {

    it('should set application Error to true when application fails', done => {
     registrationSvcMock.post.and.callFake(() => Promise.reject(''));

      component.onSubmit(registrationFormMock)
        .then(() => {
          expect(component.registrationError).toBe(true);
          done();
        });
    });

  });
});
