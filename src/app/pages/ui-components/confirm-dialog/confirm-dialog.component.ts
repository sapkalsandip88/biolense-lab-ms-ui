import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { TestManagementComponent } from '../test-management/test-management.component';
import { TestManagementService } from 'src/app/services/test-management.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-confirm-dialog',
  imports: [
     MatDialogContent,
     MatDialogModule,
     MatCardModule
    ],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
 encapsulation: ViewEncapsulation.None,
})

export class ConfirmDialogComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent> ,
   @Inject(MAT_DIALOG_DATA) public data: { testId: number},
   private _testService: TestManagementService,
   private _toastr: ToastrService,
    
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onNoClick(): void {
        this.dialogRef.close();
  }
  deleteTest() {
    console.log("delete test : ",this.data.testId)
    this._testService.deleteTest(this.data.testId).subscribe((resp: any)=>{
      if(resp){
        this._toastr.success("Test deleted successfully !", 'success');
      }
    }, (error: string) =>{
        this._toastr.error('Error while deleteing test : '+error,'error');
    })
  }
}
