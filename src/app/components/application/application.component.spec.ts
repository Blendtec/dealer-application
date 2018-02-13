import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationComponent } from './application.component';
import { APP_BASE_HREF } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { ApiService, CountryService, StateService } from '../../services';
import { NgPipesModule } from 'ngx-pipes';
import { MyDatePickerModule } from 'mydatepicker';
import { APP_CONFIG, AppConfigModule } from '../../config';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('ApplicationComponent', () => {


  const applicationSvcMock = jasmine.createSpyObj('ApiService', ['post']);
  applicationSvcMock.post.and.returnValue(Promise.resolve());

  const stateSvcMock = jasmine.createSpyObj('StateService', ['getAll$']);
  stateSvcMock.getAll$.and.returnValue(Promise.resolve());

  const countrySvcMock = jasmine.createSpyObj('CountryService', ['getAll$']);
  countrySvcMock.getAll$.and.returnValue(Promise.resolve());

  const applicationFormMock = {
    value: {
      contact: {
        firstName: '',
        lastName: '',
        title: '',
        email: '',
        phone: '',
        individual: ''
      },
      company: {
        name: '',
        dbas: '',
        phone: '',
        fax: ''
      },
      shippingAddress: {
        name: '',
        address: '',
        city: '',
        stateProvince: '',
        zip: '',
        country: ''
      },
      billingAddress: {
        name: '',
        address: '',
        city: '',
        stateProvince: '',
        zip: '',
        country: ''
      },
      business: {
        license: '',
        state: '',
        taxExemptNum: ''
      },
      website: {
        url: '',
        date: '',
        visits: 0,
        conversionRate: 0,
        revenue: 0,
        tools: ''
      },
      social: {
        facebook: { url: '', count: 0},
        pinterest: { url: '', count: 0},
        instagram: { url: '', count: 0},
        twitter: { url: '', count: 0},
        googlePlus: { url: '', count: 0},
        blog: { url: '', count: 0}
      },
      sales: {
        channels: '',
        amazon: '',
        amazonNames: '',
        demos: ''
      },
      fulfillment: {
       warehouseLocation: '',
       other: '',
       thirdPartyName: '',
       thirdPartyLocation: '',
       directToStore: ''
      },
      differentiators: {
       how: '',
       what: '',
       value: ''
      },
      other: {
       products: '',
       marketing: '',
       locations: ''
      },
      recaptcha: '',
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
        {provide: ApiService, useValue: applicationSvcMock},
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
     applicationSvcMock.post.and.callFake(() => Promise.reject(''));

      component.onSubmit(applicationFormMock)
        .then(() => {
          expect(component.submitError).toBe(true);
          done();
        });
    });

    it('should set success to true', done => {
      applicationSvcMock.post.and.returnValue(Promise.resolve());

      component.onSubmit(applicationFormMock)
        .then(() => {
          expect(component.success).toBe(true);
          done();
        });
    });
  });
});
