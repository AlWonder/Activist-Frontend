import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedUsersPrintableComponent } from './joined-users-printable.component';

describe('JoinedUsersPrintableComponent', () => {
  let component: JoinedUsersPrintableComponent;
  let fixture: ComponentFixture<JoinedUsersPrintableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedUsersPrintableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedUsersPrintableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
