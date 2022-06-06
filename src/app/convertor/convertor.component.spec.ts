import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertorComponent } from './convertor.component';

describe('ConvertorComponent', () => {
  let component: ConvertorComponent;
  let fixture: ComponentFixture<ConvertorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
