import { TestBed } from '@angular/core/testing';

import { CompInteractionService } from './comp-interaction.service';

describe('CompInteractionService', () => {
  let service: CompInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
