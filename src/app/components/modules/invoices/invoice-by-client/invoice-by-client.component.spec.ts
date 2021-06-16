import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceByClientComponent } from './invoice-by-client.component';

describe('InvoiceByClientComponent', () => {
  let component: InvoiceByClientComponent;
  let fixture: ComponentFixture<InvoiceByClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceByClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceByClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
