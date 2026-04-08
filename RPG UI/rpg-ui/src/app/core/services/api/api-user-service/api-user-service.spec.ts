import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiUserService } from './api-user-service';

describe('ApiUserService', () => {
  let component: ApiUserService;
  let fixture: ComponentFixture<ApiUserService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiUserService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiUserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
