import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapidfireGameComponent } from './rapidfire-game.component';

describe('RapidfireGameComponent', () => {
  let component: RapidfireGameComponent;
  let fixture: ComponentFixture<RapidfireGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapidfireGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapidfireGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
