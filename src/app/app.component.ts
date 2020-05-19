import { Component, OnInit, DoCheck } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'cts-assessment';
  hasLoggedIn: any;
  constructor(private appService: AppService) { }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    this.hasLoggedIn = this.appService.currentUserValue;
  }
}
