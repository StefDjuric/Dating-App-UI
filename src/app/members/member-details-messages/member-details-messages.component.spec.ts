import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailsMessagesComponent } from './member-details-messages.component';

describe('MemberDetailsMessagesComponent', () => {
  let component: MemberDetailsMessagesComponent;
  let fixture: ComponentFixture<MemberDetailsMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberDetailsMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberDetailsMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
