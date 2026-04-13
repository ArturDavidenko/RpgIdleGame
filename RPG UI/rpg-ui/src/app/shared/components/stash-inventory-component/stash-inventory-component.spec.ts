import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StashInventoryComponent } from './stash-inventory-component';

describe('StashInventoryComponent', () => {
  let component: StashInventoryComponent;
  let fixture: ComponentFixture<StashInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StashInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StashInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
