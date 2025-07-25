import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { ParameterMaster } from 'src/app/model/parameterMaster';
import { TestManagementService } from 'src/app/services/test-management.service';
interface SelectType {
  value: number;
  viewValue: number;
}
interface SelectPosition {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-prameter-with-normal-range',
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
      CommonModule
    ],
  templateUrl: './prameter-with-normal-range.component.html',
  styleUrl: './prameter-with-normal-range.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PrameterWithNormalRangeComponent {

dataLoaded : boolean = false;
  parameterMaster: ParameterMaster = new ParameterMaster();
  constructor(private dialogRef: MatDialogRef<PrameterWithNormalRangeComponent>,
    private _toastr: ToastrService,
    private _testService: TestManagementService,
     @Inject(MAT_DIALOG_DATA) public data: { testId: number, paramType: string, param:ParameterMaster, positionInPdf: number },
  ){ }
  showField = true;
  ngOnInit(){
  
    console.log("paramType : ",this.data.paramType);
    console.log("parameter : ",this.data.param);
    if(this.data.param != null || this.data.param != undefined){
    this.parameterMaster = this.data.param
    } else {
      this.parameterMaster.positionInPdf = this.data.positionInPdf;
    }
  
    this.preparePosition();
    this.prepareDictionaryValues()
    // if(this.data.paramId != null || this.data.paramId != undefined){
    //   this.getParamsDetails(this.data.testId, this.data.paramType,this.data.paramId);
    // }
  }
  getParamsDetails(testId: number, paramType: string, paramId: number) {
    this._testService.getParamsDetails(testId, paramType, paramId);

  }
  closeDialog(){
    this.dialogRef.close();
  }
  selectedpositionInPdf: number;
  selectedDictionaryValue : string;
  positionInPdf: SelectType[] =[];
  dictionaryVal: SelectPosition[] =[];
  headingPosition: SelectPosition[]=[
    {value: "LEFT", viewValue: "LEFT"},
    {value: "CENTER", viewValue: "CENTER"}
];
selectedHeadingPosition = this.headingPosition[1].value;
  preparePosition(){
    for (let i = 0; i< 26; i++) {
      this.positionInPdf[i]={value: i, viewValue: i}
     }
     this.selectedpositionInPdf=this.positionInPdf[3].value;
  }

  prepareDictionaryValues(){
    console.log("lenght : ", this.parameterMaster.enterDictionary.length)
    if( this.parameterMaster.enterDictionary){
    for (let i = 0; i< this.parameterMaster.enterDictionary.length; i++) {
      this.dictionaryVal[i] ={value:this.parameterMaster.enterDictionary[i], viewValue:this.parameterMaster.enterDictionary[i]}
    }
    this.dictionaryVal[this.parameterMaster.enterDictionary.length] = {value:"SELECT", viewValue:"SELECT"}
    this.selectedDictionaryValue=this.dictionaryVal[this.parameterMaster.enterDictionary.length].value;
  }
  }
  saveParameterData(){
    console.log("param name : ", this.parameterMaster.parameterName)
    if (this.parameterMaster.parameterName == null) {
      this._toastr.error('Please enter Test name !', 'Error');
      return;
    }
    if (this.parameterMaster.unit == null && this.data.paramType!="HEADING") {
      this._toastr.error('Please enterUnit', 'Error');
      return;
    }
    if (this.parameterMaster.positionInPdf == null) {
      this._toastr.error('Please select position In Pdf !', 'Error');
      return;
    }
    if (this.parameterMaster.maleRangeFrom == null && this.data.paramType!="HEADING") {
      this._toastr.error('Please enter min male range!', 'Error');
      return;
    }
    if (this.parameterMaster.maleRangeTo == null && this.data.paramType!="HEADING") {
      this._toastr.error('Please enter max male range', 'Error');
      return;
    }
    if (this.parameterMaster.femaleRangeFrom == null && this.data.paramType!="HEADING") {
      this._toastr.error('Please enter min female range!', 'Error');
      return;
    }
    if (this.parameterMaster.femaleRangeTo == null && this.data.paramType!="HEADING") {
      this._toastr.error('Please enter max female range', 'Error');
      return;
    }
    console.log("process")
    this.parameterMaster.testId = this.data.testId;
    this.parameterMaster.paramType = this.data.paramType;
    this._testService.saveParameterDetails(this.parameterMaster).subscribe(resp => {
      console.log(resp)
      if (resp) {
        this._toastr.success("Parameter details saved successfully.", 'Success')
        this.dialogRef.close()
      }
    }, error => {
      this._toastr.error(error.value, 'Error');
    })
  }
  deleteParameterData() {
    console.log(this.parameterMaster.paramId)
    this._testService.deleteParam( this.parameterMaster.paramId).subscribe(resp => {
      if(resp){
        this._toastr.success("Paramater details deleted successfully.", 'Success')
        this.dialogRef.close();
      }
    }, error => {
      this._toastr.error(error.value, 'Error');
    })
  }

  reflectInFemalerangeFrom(event:any){
    console.log("valuee : ",this.parameterMaster.maleRangeFrom)
    this.parameterMaster.femaleRangeFrom = event.target.value;

  }
  reflectInFemalerangeTo(event:any){
    this.parameterMaster.femaleRangeTo = event.target.value;

  }

  deleteValues() {
     console.log("delet value :", this.parameterMaster.valuesforlist);
    this.parameterMaster.enterDictionary =  this.parameterMaster.enterDictionary.filter(value => value !== this.parameterMaster.valuesforlist)
    this._testService.saveParameterDetails(this.parameterMaster).subscribe(resp => {
      console.log("param after value delete  : ", resp);
      if(resp) { 
        this.parameterMaster = resp
        this.prepareDictionaryValues();
        this._toastr.success("Value deleted successfully.", 'success');
      }
    }, error => {
      this._toastr.error(error.value, 'Error');
    })
    }

  saveDictionaryValues() {
    console.log("value  : ", this.parameterMaster.valuesforlist);
    if( this.parameterMaster.enterDictionary[0] == ''){
      this.parameterMaster.enterDictionary.pop()

    }
    this.parameterMaster.enterDictionary.push(this.parameterMaster.valuesforlist);
    console.log("value  : ", this.parameterMaster);
    this._testService.saveParameterDetails(this.parameterMaster).subscribe(resp => {
      if(resp) { 
        this.prepareDictionaryValues();
        this._toastr.success("Value added successfully.", 'success');
      }
    }, error => {
      this._toastr.error(error.value, 'Error');
    })
    
    }

    assignToValue(event: any) {
      console.log( this.parameterMaster)
      this.parameterMaster.valuesforlist = event.value;
    }
}
