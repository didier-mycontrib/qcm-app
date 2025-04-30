import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportQcmComponent } from './import-export-qcm.component';

describe('ImportExportQcmComponent', () => {
  let component: ImportExportQcmComponent;
  let fixture: ComponentFixture<ImportExportQcmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportExportQcmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportExportQcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
