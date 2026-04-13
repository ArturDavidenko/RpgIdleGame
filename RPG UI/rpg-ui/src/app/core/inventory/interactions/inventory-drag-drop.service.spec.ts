import { TestBed } from '@angular/core/testing';

import { InventoryDragDropService } from './inventory-drag-drop.service';

describe('InventoryDragDropService', () => {
  let service: InventoryDragDropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryDragDropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
