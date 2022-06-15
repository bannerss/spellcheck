import { TestBed } from '@angular/core/testing';

import { DictionaryManagerService } from './dictionary-manager.service';

describe('DictionaryManagerService', () => {
  let service: DictionaryManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictionaryManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
