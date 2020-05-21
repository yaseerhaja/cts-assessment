import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.scss']
})
export class ImportFileComponent implements OnInit {
  fileToUpload: File = null;
  dataList: any = [];
  sliderValue = 1;
  maxSliderValue = 1;
  displayedColumns: string[] = ['First_name',
    'Sur_name', 'Issue_count', 'Date_of_birth'];
  dataSource: MatTableDataSource<any>;
  @ViewChild('dataSort', { static: true }) dataSort: MatSort;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSliderInputChange(e) {
    let filteredArr = this.dataList.slice();

    filteredArr = filteredArr.filter(o => {
      return (parseInt(o.Issue_count, 10) <= this.sliderValue);
    });

    this.dataSource = new MatTableDataSource(filteredArr);
    this.dataSource.sort = this.dataSort;
    setTimeout(() => this.dataSource.paginator = this.paginator, 200);
  }

  uploadFileToActivity() {
    this.appService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      this.dataList = data;
      this.dataSource = new MatTableDataSource(this.dataList);
      if (this.dataList.length) {
        // tslint:disable-next-line: only-arrow-functions
        const val = Math.max.apply(Math, this.dataList.map(function (o) { return parseInt(o.Issue_count, 10); }));

        this.maxSliderValue = val;
        this.sliderValue = val;
      }
      this.dataSource.sort = this.dataSort;
      setTimeout(() => this.dataSource.paginator = this.paginator, 200);
    }, error => {
      console.log(error);
    });
  }
}
