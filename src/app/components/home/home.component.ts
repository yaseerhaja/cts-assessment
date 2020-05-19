import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';

import { MatDialog } from '@angular/material/dialog';
import { HomeDialogComponent } from './home.dialog';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayType = 'table';
  employeeList: any = [];
  employeeListFiltered: any = [];
  displayedColumns: string[] = ['employee_name',
    'employee_salary', 'employee_age'];
  dataSource: MatTableDataSource<any>;
  @ViewChild('dataSort', { static: true }) dataSort: MatSort;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;

  constructor(private appService: AppService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  inpChange(e) {
    const val = e.target.value;
    if (val === '') {
      this.employeeListFiltered = this.employeeList;
      this.dataSource = new MatTableDataSource(this.employeeList);
    } else {
      this.employeeListFiltered = this.employeeList.filter(ins => {
        return (ins.employee_name.toLowerCase()).includes(val.toLowerCase());
      });
      this.dataSource = new MatTableDataSource(this.employeeListFiltered);
    }
    this.dataSource.sort = this.dataSort;
    setTimeout(() => this.dataSource.paginator = this.paginator, 200);
  }

  getEmployeeList() {
    //const el = document.getElementsByClassName('flight-details')[0];
    //el.classList.add('be-loading-active');

    this.appService.getEmployeeList().subscribe(data => {
      //el.classList.remove('be-loading-active');
      if (data && data.data.length) {
        this.employeeList = data.data;
        this.employeeListFiltered = data.data;

        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.sort = this.dataSort;
        setTimeout(() => this.dataSource.paginator = this.paginator);

      } else {
        this.employeeList = [];
        this.employeeListFiltered = [];
        this.dataSource = new MatTableDataSource([]);
      }
    }, err => {
      this.employeeList = [];
      this.employeeListFiltered = [];
      this.dataSource = new MatTableDataSource([]);
      //el.classList.remove('be-loading-active');
    });
  }

  toggleType(type){
    this.displayType = type;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(HomeDialogComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEmployeeList();
    });
  }

}
