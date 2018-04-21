import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPromoComponent } from './login-promo.component';

describe('LoginPromoComponent', () => {
  let component: LoginPromoComponent;
  let fixture: ComponentFixture<LoginPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
