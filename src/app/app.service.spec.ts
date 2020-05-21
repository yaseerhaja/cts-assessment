import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AppService } from './app.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of as observableOf } from 'rxjs';

describe('AppService', () => {
  let service: AppService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  class ActionMock {
    getMockData() {
      return observableOf({});
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [{ provide: service, useClass: ActionMock }]
    });
    injector = getTestBed();
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoud have Employee data', () => {
    service.getEmployeeList().subscribe(posts => {
      expect(posts.items.length).toBe(24);
    });
    const request = httpMock.expectOne(`/api/employee/getEmployeeList`);
    expect(request.request.method).toBe('GET');
  });

  it('shoud Identify Login', () => {
    service.identifyLogin({
      username: 'admin',
      password: 'admin'
    }).subscribe(res => {
      expect(res).toBe({
        id: 9858685,
        username: "admin",
        firstName: "Admin",
        lastName: "System",
        token: "aswdefrgtyhu",
      });
    });
    const request = httpMock.expectOne(`/api/login/identifyLogin`);
    expect(request.request.method).toBe('POST');
  });

  it('should Logout', () => {
    service.logout();
    expect(localStorage.getItem('currentUser')).toBe(null);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
