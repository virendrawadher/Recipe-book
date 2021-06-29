import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepiesDetailComponent } from './recepies-detail.component';

describe('RecepiesDetailComponent', () => {
  let component: RecepiesDetailComponent;
  let fixture: ComponentFixture<RecepiesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepiesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepiesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
