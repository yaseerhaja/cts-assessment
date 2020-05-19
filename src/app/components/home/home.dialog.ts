import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home-dialog',
  templateUrl: './home.dialog.html',
  styleUrls: ['./home.dialog.scss']
})
export class HomeDialogComponent implements OnInit {
  newEmpFormGroup: FormGroup;
  responseData = null;
  constructor(
    public dialogRef: MatDialogRef<HomeDialogComponent>,
    private formBuilder: FormBuilder,
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.newEmpFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      age: ['', [Validators.required]]
    });
  }

  createNewEmployee(e) {
    if (e) {
      e.preventDefault();
    }

    this.newEmpFormGroup.markAllAsTouched();
    const formIns = this.newEmpFormGroup.getRawValue();

    // stop here if form is invalid
    if (this.newEmpFormGroup.invalid) {
      return;
    }
    const formData = { name: formIns.name, salary: parseInt(formIns.salary, 10), age: parseInt(formIns.age, 10) };

    this.appService.createEmployee(formData).subscribe((response: any) => {
      this.newEmpFormGroup.reset();
      this.responseData = 'success';
    }, (err) => {
      this.responseData = 'failure';
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  closeForm(){
    this.responseData = null;
    this.dialogRef.close();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.newEmpFormGroup.controls[controlName].hasError(errorName);
  }

  resetForm() {

  }
}
