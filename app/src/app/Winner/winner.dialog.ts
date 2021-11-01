import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Player} from '../../model/Player';

@Component({
  selector: 'winner-dialog',
  templateUrl: 'winner.dialog.html',
})
export class WinnerDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { winner: Player }) {
    console.log('Winner', data.winner);
  }
}
