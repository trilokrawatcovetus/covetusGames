import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossWordAppComponent } from './cross-word-app.component';

describe('CrossWordAppComponent', () => {
  let component: CrossWordAppComponent;
  let fixture: ComponentFixture<CrossWordAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrossWordAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrossWordAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
