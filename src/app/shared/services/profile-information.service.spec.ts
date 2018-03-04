import { TestBed, inject } from '@angular/core/testing';

import { ProfileInformationService } from './profile-information.service';

describe('ProfileInformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileInformationService]
    });
  });

  it('should be created', inject([ProfileInformationService], (service: ProfileInformationService) => {
    expect(service).toBeTruthy();
  }));
});
