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

  uploadFileToActivity() {
    this.appService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      this.dataList = data;
      this.dataSource = new MatTableDataSource(this.dataList);
      this.dataSource.sort = this.dataSort;
      setTimeout(() => this.dataSource.paginator = this.paginator, 200);
    }, error => {
      console.log(error);
    });
  }
}
