import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFrozenComponent } from './table-frozen.component';

describe('TableFrozenComponent', () => {
  let component: TableFrozenComponent;
  let fixture: ComponentFixture<TableFrozenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFrozenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFrozenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
