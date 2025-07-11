import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddTestComponent } from './add-test/add-test.component';
import { Router } from '@angular/router';
import { AddReportFormatComponent } from './add-report-format/add-report-format.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TestManagementService } from 'src/app/services/test-management.service';
import { TestMaster } from 'src/app/model/testMaster';
import { T } from '@angular/cdk/keycodes';
import { ConfirmDialogComponent } from 'src/app/pages/ui-components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-test-management',
  imports: [ MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './test-management.component.html',
  styleUrl: './test-management.component.scss',
  encapsulation: ViewEncapsulation.None,
  
})
export class TestManagementComponent {

  dataSource1: MatTableDataSource<TestMaster>;

  @ViewChild(MatPaginator) paginator!:  MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, 
    private router: Router, 
    private testService: TestManagementService,
  ){
    //this.dataSource1 = new MatTableDataSource(PRODUCT_DATA);
    }


  displayedColumns1: string[] = ['id', 'testName', 'price','testCode' ,'testType', 'outsourcingCenter', 'budget'];
  displayedColumnsFilter: string[] = ['f-id','f-testName', 'f-price', 'f-testCode','f-testType' ,'f-outsourcingCenter'];

filterValues= {
    id:'', testName:'', price:'',testCode:'',testType:'', outsourcingCenter:''
  }
  globalFilter=''
  //dataSource1 = PRODUCT_DATA;
  displayStyle = "none"; 
  testData:TestMaster[];
  ngOnInit(){
     this.loadTestDetails();
  }
  loadTestDetails() {
    this.testService.getAllTests().subscribe(resp =>{
      console.log("refresh")
       this.testData = resp;
      this.dataSource1 = new MatTableDataSource(this.testData);
      this.dataSource1.paginator = this.paginator;
      this.dataSource1.sort = this.sort;
      this.dataSource1.filterPredicate= this.customeFilterPredicton();
     },(error)=>{
     }
    );
  }
  openPopup=() =>{ 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1200px';
    dialogConfig.height = '500px';
    dialogConfig.backdropClass = 'popupBackdropClass';
    this.dialog.open(AddTestComponent ,{
      width : '1200px' ,
    height : '500px',
    }).afterClosed()
    .subscribe((shouldReload: boolean) => {
         //window.location.reload()
         this.loadTestDetails();
    });
  } 
  openPopupToEdit=(testId:string) =>{ 
    console.log("id to send :", testId)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1200px';
    dialogConfig.height = '500px';
    dialogConfig.backdropClass = 'popupBackdropClass';
    dialogConfig.data= {testId: testId}
    console.log("dialogConfig:", dialogConfig)
    //this.dialog.open(AddTestComponent ,dialogConfig);
    this.dialog.open(AddTestComponent ,{
      width : '1200px' ,
    height : '500px',
    data : {testId: testId}
    }).afterClosed()
    .subscribe((shouldReload: boolean) => {
         //window.location.reload();
         this.loadTestDetails();
    });
  } 
  routeToAddReport(element:any, testName:string) {
    console.log("routing to add report format", element)
    this.router.navigate(['/ui-components/add-report-format'],{queryParams:{id:element, testName:testName}})
   }
  

   filterChangeEvent(colunmName:string, element:any){
    if(colunmName==='id' || colunmName==='testName' || colunmName==='price' || colunmName==='testCode' || colunmName==='testType' || colunmName==='outsourcingCenter'  ){
      this.filterValues[colunmName]= element.target.value.trim().toLocaleLowerCase();
      this.dataSource1.filter=JSON.stringify(this.filterValues);
    }
   }
   customeFilterPredicton(){
    const filterPrediction=(data:TestMaster, filterValue: string)=>{
      let searchString = JSON.parse(filterValue);
      return data.id.toString().trim().toLocaleLowerCase().indexOf(searchString.id.toString().trim().toLocaleLowerCase()) !== -1 &&
      data.testName.toString().trim().toLocaleLowerCase().indexOf(searchString.testName.toString().trim().toLocaleLowerCase()) !== -1 &&
      data.price.toString().trim().toLocaleLowerCase().indexOf(searchString.price.toString().trim().toLocaleLowerCase()) !== -1 &&
      data.testCode.toString().trim().toLocaleLowerCase().indexOf(searchString.testCode.toString().trim().toLocaleLowerCase()) !== -1 &&
      data.testType.toString().trim().toLocaleLowerCase().indexOf(searchString.testType.toString().trim().toLocaleLowerCase()) !== -1 
    }
    return filterPrediction;
   }

   deleteTest(testId: number) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '700px';
      dialogConfig.height = '250px';
      dialogConfig.backdropClass = 'popupBackdropClass';
      this.dialog.open(ConfirmDialogComponent ,{
        width : '700px' ,
      height : '250px',
      data:{'testId': testId}
      }).afterClosed()
      .subscribe((shouldReload: boolean) => {
           //window.location.reload()
           this.loadTestDetails();
      });
    } 
    
}
