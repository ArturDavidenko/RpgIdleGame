import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInventoryComponent } from './user-inventory-component';

describe('UserInventoryComponent', () => {
  let component: UserInventoryComponent;
  let fixture: ComponentFixture<UserInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
