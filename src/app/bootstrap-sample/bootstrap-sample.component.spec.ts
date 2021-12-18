import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapSampleComponent } from './bootstrap-sample.component';

describe('BootstrapSampleComponent', () => {
  let component: BootstrapSampleComponent;
  let fixture: ComponentFixture<BootstrapSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootstrapSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
