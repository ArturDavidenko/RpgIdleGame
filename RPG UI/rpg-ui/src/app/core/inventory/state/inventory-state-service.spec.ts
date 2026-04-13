import { TestBed } from '@angular/core/testing';

import { InventoryStateService } from './inventory-state-service';

describe('InventoryStateService', () => {
  let service: InventoryStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
