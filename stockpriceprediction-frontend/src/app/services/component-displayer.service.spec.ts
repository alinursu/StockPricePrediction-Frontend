import { TestBed } from '@angular/core/testing';

import { ComponentDisplayerService } from './component-displayer.service';

describe('ComponentDisplayerService', () => {
  let service: ComponentDisplayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentDisplayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
