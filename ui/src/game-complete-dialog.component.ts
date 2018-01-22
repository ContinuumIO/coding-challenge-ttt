import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'game-complete-component',
    templateUrl: './game-complete-dialog.component.html',
    styleUrls: ['./game-complete-dialog.component.scss']
})
export class GameCompleteDialogComponent {

    constructor(public dialogRef: MatDialogRef<GameCompleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        }

        /**
         * This click handler closes the dialog with no residual actions
         */
        close(): void {
            this.dialogRef.close();
        }

        /**
         * This click handler closes the dialog and informs the listener we want
         * to play again.
         */
        playAgain():void {
            this.dialogRef.close('playAgain');
        }

}
