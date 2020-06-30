import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadDialogComponent } from './preload-dialog.component';

describe('YesOrNoDialogComponent', () => {
  let component: PreloadDialogComponent;
  let fixture: ComponentFixture<PreloadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
