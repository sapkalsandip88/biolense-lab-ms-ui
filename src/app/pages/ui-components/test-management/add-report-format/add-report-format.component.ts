import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ThemePalette } from '@angular/material/core';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTestComponent } from '../add-test/add-test.component';
import { PrameterWithNormalRangeComponent } from './prameter-with-normal-range/prameter-with-normal-range.component';

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

export interface Fruit {
  name: string;
}

export interface Vegetable {
  name: string;
}

@Component({
  selector: 'app-add-report-format',
  imports: [ MatFormFieldModule,
      MatChipsModule,
      MatIconModule,
      MatCardModule,
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatListModule],
      changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-report-format.component.html',
  styleUrl: './add-report-format.component.scss'
})
export class AddReportFormatComponent {

  constructor(private dialog : MatDialog){
    
  }
 readonly vegetables = signal<Vegetable[]>([
    { name: 'apple' },
    { name: 'banana' },
    { name: 'strawberry' },
    { name: 'orange' },
    { name: 'kiwi' },
    { name: 'cherry' },
  ]);

  drop(event: CdkDragDrop<Vegetable[]>) {
    this.vegetables.update((vegetables) => {
      moveItemInArray(vegetables, event.previousIndex, event.currentIndex);
      return [...vegetables];
    });
  }

  //
  // Stacked
  //
  availableColors: ChipColor[] = [
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' },
  ];

  //
  //  chips with input
  //
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  }

  // form control

  readonly keywords = signal(['angular', 'how-to', 'tutorial', 'accessibility']);
  readonly formControl = new FormControl(['angular']);

  announcer = inject(LiveAnnouncer);

  removeKeyword(keyword: string) {
    this.keywords.update(keywords => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword}`);
      return [...keywords];
    });
  }

  addForm(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.update(keywords => [...keywords, value]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }
  addParamWithNormRange(){
  console.log("addParamWithNormRange()")
  const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '900px';
      dialogConfig.height = '500px';
      dialogConfig.backdropClass = 'popupBackdropClass';
      this.dialog.open(PrameterWithNormalRangeComponent ,{
        width : '1000px',
      height : '500px',
      });
  }
 addParamWithDescRange(){}
 addParamWithAgeRange(){}
 addDescParamNoRange(){}
 addParamWithListVal(){}
 addHeadingInCenter(){}
 addHeadingInLeft(){}
}
function isDragDrop(object: any): object is CdkDragDrop<string[]> {
  return 'previousIndex' in object;
}

