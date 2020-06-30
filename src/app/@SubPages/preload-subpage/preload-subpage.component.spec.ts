import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadSubpageComponent } from './preload-subpage.component';

describe('ChooseLangSubpageComponent', () => {
  let component: PreloadSubpageComponent;
  let fixture: ComponentFixture<PreloadSubpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloadSubpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloadSubpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
