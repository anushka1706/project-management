import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemsComponent } from './user-items.component';

describe('UserItemsComponent', () => {
  let component: UserItemsComponent;
  let fixture: ComponentFixture<UserItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserItemsComponent]
    });
    fixture = TestBed.createComponent(UserItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
