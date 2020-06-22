import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomShareDialogComponent } from './symptom-share-dialog.component';

describe('SymptomShareDialogComponent', () => {
  let component: SymptomShareDialogComponent;
  let fixture: ComponentFixture<SymptomShareDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymptomShareDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomShareDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
