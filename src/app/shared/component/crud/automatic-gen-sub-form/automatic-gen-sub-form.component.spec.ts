import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticGenSubFormComponent } from './automatic-gen-sub-form.component';

describe('AutomaticGenSubFormComponent', () => {
  let component: AutomaticGenSubFormComponent;
  let fixture: ComponentFixture<AutomaticGenSubFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomaticGenSubFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomaticGenSubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
