import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlighedTextComponent } from './highlighed-text.component';

describe('HighlighedTextComponent', () => {
  let component: HighlighedTextComponent;
  let fixture: ComponentFixture<HighlighedTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighlighedTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlighedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
