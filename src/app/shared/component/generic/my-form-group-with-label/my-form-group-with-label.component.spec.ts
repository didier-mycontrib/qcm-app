import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFormGroupWithLabelComponent } from './my-form-group-with-label.component';

describe('MyFormGroupWithLabelComponent', () => {
  let component: MyFormGroupWithLabelComponent;
  let fixture: ComponentFixture<MyFormGroupWithLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFormGroupWithLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFormGroupWithLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
