import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberDetailsComponent } from './edit-member-details.component';

describe('EditMemberDetailsComponent', () => {
  let component: EditMemberDetailsComponent;
  let fixture: ComponentFixture<EditMemberDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMemberDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
