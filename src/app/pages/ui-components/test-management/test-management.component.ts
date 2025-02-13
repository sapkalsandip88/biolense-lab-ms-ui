import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTestComponent } from './add-test/add-test.component';
import { Router } from '@angular/router';
import { AddReportFormatComponent } from './add-report-format/add-report-format.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



export interface testData {
  id: number;
  testName: string;
  price: string;
  testCode: string;
  testType: string;
  outsourcingCenter: string;

}

const PRODUCT_DATA: testData[] = [
  {
    id: 1,
    testName: 'Complete Blood Count - CBC',
    price: '200.0/',
    testCode: 'CBC',
    testType: 'Pathology',
    outsourcingCenter: '',
  },
  {
    id: 2,
    testName: 'ABSOLUTE EOSINOPHIL COUNT ( AEC )',
    price: '200.0/',
    testCode: 'AEC',
    testType: 'Pathology',
    outsourcingCenter: '',
  },
  {
    id: 3,
    testName: 'ABG / VBG',
    price: '1500.0/',
    testCode: 'ABG / VBG',
    testType: 'Pathology',
    outsourcingCenter: '',
  },
  {
    id: 4,
    testName: '17-OH-PROGESTERON',
    price: '400.0/',
    testCode: 'OHPN',
    testType: 'Pathology',
    outsourcingCenter: '',
  },
];
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
  
})
export class TestManagementComponent {
  dataSource1: MatTableDataSource<testData>;

  @ViewChild(MatPaginator) paginator!:  MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private router: Router){
    this.dataSource1 = new MatTableDataSource(PRODUCT_DATA);

  }

  displayedColumns1: string[] = ['id', 'testName', 'price','testCode' ,'testType', 'outsourcingCenter', 'budget'];
  displayedColumnsFilter: string[] = ['f-id','f-testName', 'f-price', 'f-testCode','f-testType' ,'f-outsourcingCenter'];

filterValues= {
    id:'', testName:'', price:'',testCode:'',testType:'', outsourcingCenter:''
  }
  globalFilter=''
  //dataSource1 = PRODUCT_DATA;
  displayStyle = "none"; 
  
  openPopup=() =>{ 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '900px';
    dialogConfig.height = '500px';
    dialogConfig.backdropClass = 'popupBackdropClass';
    this.dialog.open(AddTestComponent ,{
      width : '1200px',
    height : '500px',
    });
  } 
  closePopup() { 
    this.dialog.closeAll();
  } 

  routeToAddReport() {
    console.log("routing to add report format")
    this.router.navigateByUrl('/add-report-format')
    //this.router.navigate([AddReportFormatComponent])
   }
  
   ngAfterViewInit(){
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
    this.dataSource1.filterPredicate= this.customeFilterPredicton();
   }
   filterChangeEvent(colunmName:string, element:any){
    if(colunmName==='id' || colunmName==='testName' || colunmName==='price' || colunmName==='testCode' || colunmName==='testType' || colunmName==='outsourcingCenter'  ){
      this.filterValues[colunmName]= element.target.value.trim().toLocaleLowerCase();
      this.dataSource1.filter=JSON.stringify(this.filterValues);
    }
   }
   customeFilterPredicton(){
    const filterPrediction=(data:testData, filterValue: string)=>{
      let searchString = JSON.parse(filterValue);
      return data.id.toString().trim().toLocaleLowerCase().indexOf(searchString.id.toString().trim().toLocaleLowerCase()) !== -1 &&
      data.testName.toString().trim().toLocaleLowerCase().indexOf(searchString.testName.toString().trim().toLocaleLowerCase()) !== -1 &&
      data.price.toString().trim().toLocaleLowerCase().indexOf(searchString.price.toString().trim().toLocaleLowerCase()) !== -1 &&
      data.testCode.toString().trim().toLocaleLowerCase().indexOf(searchString.testCode.toString().trim().toLocaleLowerCase()) !== -1 &&
      data.testType.toString().trim().toLocaleLowerCase().indexOf(searchString.testType.toString().trim().toLocaleLowerCase()) !== -1 &&
      data.outsourcingCenter.toString().trim().toLocaleLowerCase().indexOf(searchString.outsourcingCenter.toString().trim().toLocaleLowerCase()) !== -1

    }
    return filterPrediction;
   }
}
