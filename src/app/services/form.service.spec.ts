/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ApiService } from "./api.service";
import { FormService } from './form.service';

describe('FormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ApiService, FormService]
    });
  });

  it('should ...', inject([FormService], (service: FormService) => {
    expect(service).toBeTruthy();
  }));
});
