import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppConfigModule } from '../config';
import { ApiService } from './api.service';


describe('ApiService', () => {

  let requestService: ApiService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppConfigModule,
      ],
      providers: [
        ApiService
      ]
    });

    requestService = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {

    expect(requestService).toBeTruthy();
  });
});


