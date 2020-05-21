import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tech',
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.scss']
})
export class TechComponent implements OnInit {

  constructor() { }
  screen(width) {
    return (width < 700) ? 'sm' : 'lg';
  }
  ngOnInit(): void {
  }
}
