import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmmountTablesComponent } from './ammount-tables.component';

describe('AmmountTablesComponent', () => {
  let component: AmmountTablesComponent;
  let fixture: ComponentFixture<AmmountTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmmountTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmmountTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
