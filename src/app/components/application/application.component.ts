import { Component, Inject, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/throw';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecaptchaValidator } from '../../validators';
import { CountryService, StateService, ApiService }from '../../services';
import { ICountry } from '../../models';
import { APP_CONFIG, AppConfig } from '../../config';
import { StatesValidator } from '../../validators/has-states.validator';
import { BaseComponent } from '../base.component';
import { ApplicationCommand } from '../../models/application.command';
import { getTouchedControlsValidationErrors } from '../../util/get-form-validation-errors';


@Component({
  selector: 'app-form',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent extends BaseComponent implements OnDestroy {

  public submitError= false;
  public form: FormGroup;
  public countries$: Observable<ICountry[]>;
  public states$: Observable<any[]>;
  public dateOptions: any = {
    dateFormat: 'mm-dd-yyyy',
    indicateInvalidDate: true,
    showClearDateBtn: false
  };
  public captchaKey: string;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private countryService: CountryService,
              private stateService: StateService,
              @Inject(APP_CONFIG) private config: AppConfig) {
    super();

    this.captchaKey = config.captchaKey;
    this.countries$ = countryService.getAll$();
    this.states$ = stateService.getAll$();
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      contact: this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        title: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        individual: ['', [Validators.required]]
      }),
      company: this.formBuilder.group({
        name: ['', [Validators.required]],
        dbas: ['', []],
        phone: ['', []],
        fax: ['', []]
      }),
      shippingAddress: this.formBuilder.group({
        name: ['', [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        stateProvince: ['', [Validators.required]],
        zip: ['', [Validators.required]],
        country: ['US', [Validators.required]]
      }),
      billingAddress: this.formBuilder.group({
        name: ['', [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        stateProvince: ['', [Validators.required]],
        zip: ['', [Validators.required]],
        country: ['US', [Validators.required]]
      }),
      business: this.formBuilder.group({
        license: ['', [Validators.required]],
        state: ['', [Validators.required]],
        taxExemptNum: ['', []]
      }),
      website: this.formBuilder.group({
        url: ['', [Validators.required]],
        date: ['', [Validators.required]],
        visits: ['', [Validators.required, Validators.min(0), Validators.max(99999999999)]],
        conversionRate: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
        revenue: ['', [Validators.required, Validators.min(0), Validators.max(99999999999)]],
        tools: ['', []]
      }),
      social: this.formBuilder.group({
        facebook: this.formBuilder.group({
          url: ['', []],
          count: ['', [Validators.min(0), Validators.max(99999999999)]]
        }),
        pinterest: this.formBuilder.group({
          url: ['', []],
          count: ['', [Validators.min(0), Validators.max(99999999999)]]
        }),
        instagram: this.formBuilder.group({
          url: ['', []],
          count: ['', [Validators.min(0), Validators.max(99999999999)]]
        }),
        twitter: this.formBuilder.group({
          url: ['', []],
          count: ['', [Validators.min(0), Validators.max(99999999999)]]
        }),
        googlePlus: this.formBuilder.group({
          url: ['', []],
          count: ['', [Validators.min(0), Validators.max(99999999999)]]
        }),
        blog: this.formBuilder.group({
          url: ['', []],
          count: ['', [Validators.min(0), Validators.max(99999999999)]]
        })
      }),
      sales: this.formBuilder.group({
        channels: ['', []],
        amazon: ['', []],
        amazonNames: ['', []],
        demos: ['', []]
      }),
      fulfillment: this.formBuilder.group({
        warehouseLocation: ['', []],
        other: ['', []],
        thirdPartyName: ['', []],
        thirdPartyLocation: ['', []],
        directToStore: ['', []],
      }),
      differentiators: this.formBuilder.group({
        how: ['', []],
        what: ['', []],
        value: ['', []]
      }),
      other: this.formBuilder.group({
        products: ['', []],
        marketing: ['', []],
        locations: ['', []]
      }),
      recaptcha: [false, [RecaptchaValidator]]
    });

    const now = new Date();
    this.form.patchValue({
      website: {
        date: {
          date: {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            day: now.getDate()
          }
        }
      }
    });

    this.form.get('shippingAddress.stateProvince').setAsyncValidators(StatesValidator.createValidator(this.stateService));
    this.form.get('billingAddress.stateProvince').setAsyncValidators(StatesValidator.createValidator(this.stateService));

    this.form
      .get('shippingAddress.country')
      .valueChanges
      .takeUntil(this.destroy$)
      .subscribe(() => this.form.get('shippingAddress.stateProvince').updateValueAndValidity());

    this.form
      .get('billingAddress.country')
      .valueChanges
      .takeUntil(this.destroy$)
      .subscribe(() => this.form.get('billingAddress.stateProvince').updateValueAndValidity());
  }

  public getErrorCount(): number {
    return getTouchedControlsValidationErrors(this.form.controls).length;
  }




  public onSubmit(formData: any): Promise<void> {
    return this.apiService.post(new ApplicationCommand(formData.value))
      .then(() => {
        this.form.reset();
      })
      .catch(() => {
        this.submitError= true;
      });
  }
}



