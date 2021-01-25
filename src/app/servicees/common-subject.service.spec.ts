import { TestBed } from '@angular/core/testing';

import { CommonSubjectService } from './common-subject.service';

describe('CommonSubjectService', () => {
  let service: CommonSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
