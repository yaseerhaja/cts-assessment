import { Component, OnInit, DoCheck } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  isSmallHeader = true;
  hideCountryLanguage = true;
  hasLoggedIn: any;
  locale = 'en-US';

  constructor(private appService: AppService) { }

  ngOnInit(): void { }

  ngDoCheck(): void {
    this.hasLoggedIn = this.appService.currentUserValue;
  }

  logout(e){
    this.appService.logout();
  }
}
