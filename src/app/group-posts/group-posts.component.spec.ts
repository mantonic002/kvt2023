import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPostsComponent } from './group-posts.component';

describe('GroupPostsComponent', () => {
  let component: GroupPostsComponent;
  let fixture: ComponentFixture<GroupPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupPostsComponent]
    });
    fixture = TestBed.createComponent(GroupPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
