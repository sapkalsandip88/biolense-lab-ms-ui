import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TestMaster } from 'src/app/model/testMaster';
import { ToastrService } from 'ngx-toastr';
import { TestManagementService } from 'src/app/services/test-management.service';
import { AppIconsComponent } from "../../../extra/icons/icons.component";
import { MatIcon } from '@angular/material/icon';
import { TestManagementComponent } from '../test-management.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
interface SelectType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-test',
  imports: [MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatIcon,
  CommonModule],
  templateUrl: './add-test.component.html',
  styleUrl: './add-test.component.scss'
})

export class AddTestComponent {
  constructor(private dialogRef: MatDialogRef<AddTestComponent>,
    private _toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { testId: string },
    private _testService: TestManagementService,
    private router: Router,
  ) {
  }
  showField: boolean = true;
  testMaster: TestMaster = new TestMaster();
  ngOnInit() {

    if (this.data.testId != null || this.data.testId != undefined) {
      console.log("test id for edit: ", this.data.testId)
      this._testService.getTestById(this.data.testId).subscribe(resp => {
        console.log("test details: ", resp)
        this.testMaster = resp;
      })
    }
  }

  department: SelectType[] = [
    { value: 'Select', viewValue: 'select' },
    { value: 'Hematology', viewValue: 'Hematology' },
    { value: 'Immunology', viewValue: 'Immunology' },
    { value: 'Microbiology', viewValue: 'Microbiology' },
    { value: 'Serology', viewValue: 'Serology' },
    { value: 'Biochemistry', viewValue: 'Biochemistry' },
    { value: 'Clinical Pathology', viewValue: 'Clinical Pathology' },

  ];

  selectedDepartment = this.department[2].value;

  testType: SelectType[] = [
    { value: 'Select', viewValue: 'select' },
    { value: 'Pathology', viewValue: 'Pathology ' },
    { value: 'Radiology', viewValue: 'Radiology' },
    { value: 'Sonography', viewValue: 'Sonography' },
    { value: 'Other', viewValue: 'Other' },
  ];

  selectedTestType = this.testType[1].value;

  parameterSpace: SelectType[] = [
    { value: 'Select', viewValue: 'select' },
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
    { value: '4', viewValue: '4' },
    { value: '5', viewValue: '5' },
    { value: '6', viewValue: '6' },
    { value: '7', viewValue: '7' },
  ];

  selectParameterSpace = this.parameterSpace[3].value;

  machineType: SelectType[] = [
    { value: 'Select', viewValue: 'select' },
    { value: 'Cell Counter', viewValue: 'Cell Counter ' },
    { value: 'Biochemistry', viewValue: 'Biochemistry' },

  ];

  selectedmachineType = this.machineType[0].value;
  closeDialog() {
    this.router.navigate(['/ui-components/test-management']);
    this.dialogRef.close();
  }
  saveTestData() {
    if (this.testMaster.testName == null) {
      this._toastr.error('Please enter Test name !', 'Error');
      return;
    }
    if (this.testMaster.testPrintName == null) {
      this._toastr.error('Please enter Test Print name !', 'Error');
      return;
    }
    if (this.testMaster.shortCutKey == null) {
      this._toastr.error('Please enter short cut key !', 'Error');
      return;
    }
    if (this.testMaster.testCode == null) {
      this._toastr.error('Please enter test code !', 'Error');
      return;
    }
    if (this.testMaster.price == null) {
      this._toastr.error('Please enter Price!', 'Error');
      return;
    }
    console.log("process")
    this._testService.saveTestDetails(this.testMaster).subscribe(resp => {
      console.log(resp)
      if (resp.id) {
        this._toastr.success("Test details updated successfully.", 'Success')
        this.closeDialog()
      }
    }, error => {
      this._toastr.error(error.value, 'Error');
    })
  }
}
