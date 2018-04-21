import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceWidgetComponent } from './balance-widget.component';

describe('BalanceWidgetComponent', () => {
  let component: BalanceWidgetComponent;
  let fixture: ComponentFixture<BalanceWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
