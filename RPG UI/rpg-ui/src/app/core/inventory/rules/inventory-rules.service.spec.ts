import { TestBed } from '@angular/core/testing';

import { InventoryRulesService } from './inventory-rules.service';

describe('InventoryRulesService', () => {
  let service: InventoryRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
