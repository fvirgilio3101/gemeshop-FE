import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideogameFormDialogComponent } from './videogame-form-dialog.component';

describe('VideogameFormDialogComponent', () => {
  let component: VideogameFormDialogComponent;
  let fixture: ComponentFixture<VideogameFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideogameFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideogameFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
