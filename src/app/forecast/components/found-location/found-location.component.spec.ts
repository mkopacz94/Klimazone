import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundLocationComponent } from './found-location.component';

describe('FoundLocationComponent', () => {
  let component: FoundLocationComponent;
  let fixture: ComponentFixture<FoundLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
