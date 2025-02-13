import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-prameter-with-normal-range',
  imports: [],
  templateUrl: './prameter-with-normal-range.component.html',
  styleUrl: './prameter-with-normal-range.component.scss'
})
export class PrameterWithNormalRangeComponent {
  constructor(private dialogRef: MatDialogRef<PrameterWithNormalRangeComponent>){ }

  closeDialog(){
    this.dialogRef.close();
  }
}
