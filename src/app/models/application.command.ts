import { IApplication } from './application.interface';

export class ApplicationCommand {
  constructor(private _formData: IApplication) {}

  public toJSON() {
    return {
        'DealerApplication' : {
          'first_name': this._formData.contact.firstName
        }
    };
  }
}

