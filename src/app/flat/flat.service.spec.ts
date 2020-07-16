/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FlatService } from './flat.service';

describe('Service: Flat', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlatService]
    });
  });

  it('should ...', inject([FlatService], (service: FlatService) => {
    expect(service).toBeTruthy();
  }));
});
