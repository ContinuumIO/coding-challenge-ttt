import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import isEmpty from 'lodash.isempty';

@Component({
  selector: 'form-dialog',
  templateUrl: 'form.dialog.html',
})
export class FormDialog {
  data = {
    player1: '',
    player2: '',
  };

  constructor(public dialogRef: MatDialogRef<FormDialog>) {
  }

  isValid(): boolean {
    return !isEmpty(this.data.player1) && !isEmpty(this.data.player2) && this.data.player1 != this.data.player2;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
