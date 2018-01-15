import { IAddress } from './address.interface';
import { IBusiness } from './business.interface';
import { ICompany } from './company.interface';
import { IContact } from './contact.interface';
import { IWebsite } from './website.interface';
import { ISocial } from './social.interface';
import { ISales } from './sales.interface';
import { IFulfillment } from './fulfillment.interface';
import { IDifferentiators } from './differentiators.interface';
import { IOther } from './other.interface';

export interface IApplication {
  contact: IContact;
  company: ICompany;
  shippingAddress: IAddress;
  billingAddress: IAddress;
  business: IBusiness;
  website: IWebsite;
  social: ISocial;
  sales: ISales;
  fulfillment: IFulfillment;
  differentiators: IDifferentiators;
  other: IOther;
  recaptcha: string;
}
