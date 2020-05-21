import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechComponent } from './tech.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TechComponent', () => {
  let component: TechComponent;
  let fixture: ComponentFixture<TechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      declarations: [ TechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return `sm` when screen size is less than 700px', () => {
    const screenSize = component.screen(650);
    fixture.detectChanges();

    expect(screenSize).toBe('sm');
  });
  it('should return `lg` when screen size is greater than 700px', () => {
    const screenSize = component.screen(820);
    fixture.detectChanges();

    expect(screenSize).toBe('lg');
  });
});
