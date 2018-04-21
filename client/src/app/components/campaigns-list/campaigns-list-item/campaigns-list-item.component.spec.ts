import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsListItemComponent } from './campaigns-list-item.component';

describe('CampaignsListItemComponent', () => {
  let component: CampaignsListItemComponent;
  let fixture: ComponentFixture<CampaignsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
