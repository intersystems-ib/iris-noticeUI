import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  isTypeAutocomplete: boolean;
  hasValue: boolean;

  type = new FormControl();
  typeAutocomplete = new FormControl();
  value = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public autcompleteOptions: any
  ) { }

  ngOnInit() {

    this.options = this.data.typeOptions;

    this.filteredOptions = this.typeAutocomplete.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value))
    );

    this.isTypeAutocomplete = this.data.isTypeAutocomplete;
    this.hasValue = !!this.data.valueLabel;

    this.type.setValue(this.data.type);
    this.typeAutocomplete.setValue(this.data.type);
    this.value.setValue(this.data.value);
  }

  onSave(): any {

    let result: any = {
      subscriber: this.data.subscriber
    };

    if (this.isTypeAutocomplete) {
      result.type = this.typeAutocomplete.value;
    } else {
      result.type = this.type.value;
    }

    if (this.hasValue) {
      result.value = this.value.value;
    }

    this.dialogRef.close(result);
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }

  private filterOptions(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
