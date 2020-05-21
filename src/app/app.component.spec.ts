import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';

import { AppService } from './app.service';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let appService: AppService;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let spy = null;
  let component: AppComponent;

  const testData: any = {
    id: 9858685,
    username: "admin",
    firstName: "Admin",
    lastName: "System",
    token: "aswdefrgtyhu",
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        AppComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;


    appService = debugElement.injector.get(AppService);
    spy = spyOn(appService, 'currentUserValue').and.returnValue(of(testData));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'cts-assessment'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('cts-assessment');
  });

});
