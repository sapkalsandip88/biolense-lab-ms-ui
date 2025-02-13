import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogRef } from '@angular/material/dialog';
interface SelectType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-test',
  imports: [ MatFormFieldModule,
      MatSelectModule,
      FormsModule,
      ReactiveFormsModule,
      MatRadioModule,
      MatButtonModule,
      MatCardModule,
      MatInputModule,
      MatCheckboxModule,],
  templateUrl: './add-test.component.html',
  styleUrl: './add-test.component.scss'
})

export class AddTestComponent {
  constructor(private dialogRef: MatDialogRef<AddTestComponent>){ }

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

  selectedmachineType= this.machineType[0].value;
  closeDialog(){
    this.dialogRef.close();
  }
}
