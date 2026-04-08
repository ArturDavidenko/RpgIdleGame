import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiItemService } from './api-item-service';

describe('ApiItemService', () => {
  let component: ApiItemService;
  let fixture: ComponentFixture<ApiItemService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiItemService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiItemService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
