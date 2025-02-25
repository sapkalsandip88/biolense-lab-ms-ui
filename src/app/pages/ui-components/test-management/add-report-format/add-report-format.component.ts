import { ChangeDetectionStrategy,Component} from '@angular/core';
import { CdkDragDrop,} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PrameterWithNormalRangeComponent } from './prameter-with-normal-range/prameter-with-normal-range.component';
import { ActivatedRoute} from '@angular/router';
import { ParameterMaster } from 'src/app/model/parameterMaster';
import { TestManagementService } from 'src/app/services/test-management.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-add-report-format',
  imports: [ MatFormFieldModule,
      MatChipsModule,
      MatIconModule,
      MatCardModule,
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatListModule,
      MatToolbarModule,
      MatTableModule,
      CommonModule,
      MatTooltipModule
    ],
      changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-report-format.component.html',
  styleUrl: './add-report-format.component.scss'
})
export class AddReportFormatComponent {

  testId:number;
  testName:string;
  showField:boolean = true;
  lenghtOfParam:number=0;
  parameterMasterList: ParameterMaster[];
  constructor(private dialog : MatDialog,
    private activatedRoute: ActivatedRoute,
    private _testService: TestManagementService,
  ){
  } 
  dataLoaded=true;
   ngOnInit(){
    console.log("dataloaded :", this.dataLoaded)
    
    this.activatedRoute.queryParams.subscribe(params =>{
      this.testId =  params['id'];
      this.testName =  params['testName'];
      console.log("id ", params['id']);
    });
   /* setTimeout(()=>{
      this.dataLoaded = true;
      console.log("dataloaded :", this.dataLoaded)
      //this.loadParameters();
    }, 2000)*/
   this.loadParameters();
   
  }
  loadParameters(){
    this._testService.getParamForTest(this.testId).subscribe(resp => { 
      this.parameterMasterList =  resp;
      this.lenghtOfParam = this.parameterMasterList.length;
      console.log(" param list :", this.parameterMasterList);

    });
    
  }

  
    
  addParamWithNormRange(){
  console.log("addParamWithNormRange()")
  this.openParamsAddDialog("PARAM_WITH_NORMAL_RANGE");
  }
  
 addParamWithDescRange(){
  console.log("addParamWithDescRange()")
  this.openParamsAddDialog("PARAM_WITH_DESC_RANGE");
 }
 addParamWithAgeRange(){
  console.log("addParamWithAgeRange()")
  this.openParamsAddDialog("PARAM_WITH_AGE_RANGE");
 }
 addDescParamNoRange(){
  console.log("addDescParamNoRange()")
  this.openParamsAddDialog("DESC_PARAM_WITH_NO_RANGE");
 }
 addParamWithListVal(){
  this.openParamsAddDialog("PARAM_WITH_LIST_VALUE");
 }
 addHeadingInCenter(){
  console.log("addHeadingInCenter()")
  this.openParamsAddDialog("HEADING");
 }
 addHeadingInLeft(){
  this.openParamsAddDialog("HEADING");
 }

 openParamsAddDialog(paramType:string){
  let positionInPdf :number;
  if(this.parameterMasterList.length != undefined){
    positionInPdf = this.parameterMasterList.length+1;
  }
  else{
    positionInPdf = 1;
  }
  const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '900px';
    dialogConfig.height = '500px';
    dialogConfig.backdropClass = 'popupBackdropClass';
    this.dialog.open(PrameterWithNormalRangeComponent ,{
      width : '1200px',
      height : '500px',
      data: {testId: this.testId, paramType: paramType, positionInPdf: positionInPdf},
    }).afterClosed()
    .subscribe((shouldReload: boolean) => {
         //window.location.reload()
         this.loadParameters()
    });
}
//Edit params Function call

callEditParams(params: ParameterMaster) {
  if(params.paramType== 'PARAM_WITH_NORMAL_RANGE') {
    this.openParamsEditDialog("PARAM_WITH_NORMAL_RANGE", params);
  }  
  if(params.paramType== 'PARAM_WITH_DESC_RANGE') {
    this.openParamsEditDialog(params.paramType, params);
  } 
  if(params.paramType== 'PARAM_WITH_AGE_RANGE') {
    this.openParamsEditDialog(params.paramType, params);
  } 
  if(params.paramType== 'DESC_PARAM_WITH_NO_RANGE') {
    this.openParamsEditDialog(params.paramType, params);
  } 
  if(params.paramType== 'PARAM_WITH_LIST_VALUE') {
    this.openParamsEditDialog(params.paramType, params);
  
  } 
  if(params.paramType== 'HEADING') {
    this.openParamsEditDialog(params.paramType, params);
  } 
}

 openParamsEditDialog(paramType:string,param:ParameterMaster){
  const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '900px';
    dialogConfig.height = '500px';
    dialogConfig.backdropClass = 'popupBackdropClass';
    this.dialog.open(PrameterWithNormalRangeComponent ,{
      width : '1200px',
    height : '500px',
    data: {testId: param.testId, paramType: param.paramType, param:param},
    }).afterClosed()
    .subscribe((shouldReload: boolean) => {
         //window.location.reload()
         this.loadParameters()
    });

}

downloadPDF() {
const pdfElement = document.querySelector('.pdf-container') as HTMLElement;
html2canvas(pdfElement,{
  scale:2, 
  useCORS:true, 
  allowTaint: true,
  backgroundColor:null,
  removeContainer:true
}).then(canvas=>{
const imgData = canvas.toDataURL('image/png');
const pdf = new jsPDF('p', 'mm','a4');
const imgWidth = 210;
const imgHeight = (canvas.height * imgWidth)/ canvas.width;
pdf.addImage(imgData, 'PNG', 0,0, imgWidth, imgHeight);
const pdfBlob = pdf.output('blob');
const pdfUrl = URL.createObjectURL(pdfBlob);
window.open(pdfUrl, '_blank');
//pdf.save('document.pdf');
}).catch(error =>console.error("error while generating PDF", error));
}

}

