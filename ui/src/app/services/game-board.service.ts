import { Inject, Injectable } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { GridSize } from '../tokens';

@Injectable({
  providedIn: 'root'
})
export class GameBoardService {

  protected _boardForm: FormArray;
  readonly gridSize: number = this._gridSize;
  asRows;

  constructor(@Inject(GridSize) private _gridSize: number) {
    this.initGameBoard();
  }

  initGameBoard() {
    const controls = [];
    for (let c = 0; c < (this._gridSize * this._gridSize); c++) {
      controls.push(new FormControl());
    }
    this._boardForm = new FormArray(controls);
    this.asRows = this.toRows(this._boardForm.controls);
  }

  resetGameBoard() {
    this._boardForm.reset();
    this._boardForm.controls.forEach(space => space.reset(null));
  }

  get value(): Array<number> {
    return this._boardForm.value;
  }

  get form() {
    return this._boardForm;
  }

  toRows(arr: Array<any>) {
    const rowLength = this.gridSize;
    return arr.reduce((prev, cur, idx) => {
      return (idx % rowLength) ? prev : prev.concat([arr.slice(idx, idx + rowLength)]);
    }, []);
  }

}
