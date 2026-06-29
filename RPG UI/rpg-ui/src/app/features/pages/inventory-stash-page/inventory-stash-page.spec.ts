import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryStashPage } from './inventory-stash-page';

describe('InventoryStashPage', () => {
  let component: InventoryStashPage;
  let fixture: ComponentFixture<InventoryStashPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryStashPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryStashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
