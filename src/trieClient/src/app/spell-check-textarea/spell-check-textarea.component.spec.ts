import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellCheckTextareaComponent } from './spell-check-textarea.component';

describe('SpellCheckTextareaComponent', () => {
  let component: SpellCheckTextareaComponent;
  let fixture: ComponentFixture<SpellCheckTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpellCheckTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellCheckTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
