import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepiesItemComponent } from './recepies-item.component';

describe('RecepiesItemComponent', () => {
  let component: RecepiesItemComponent;
  let fixture: ComponentFixture<RecepiesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepiesItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepiesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
