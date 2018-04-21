import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsListItemComponent } from './transactions-list-item.component';

describe('TransactionsListItemComponent', () => {
  let component: TransactionsListItemComponent;
  let fixture: ComponentFixture<TransactionsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
