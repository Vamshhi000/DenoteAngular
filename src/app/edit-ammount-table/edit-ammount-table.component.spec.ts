import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAmmountTableComponent } from './edit-ammount-table.component';

describe('EditAmmountTableComponent', () => {
  let component: EditAmmountTableComponent;
  let fixture: ComponentFixture<EditAmmountTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAmmountTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAmmountTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
