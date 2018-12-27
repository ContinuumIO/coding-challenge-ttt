import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/internal/operators';
import { GameMasterService } from '../services/game-master.service';

@Component({
  selector: 'app-game-master',
  templateUrl: './game-master.component.html',
  styleUrls: ['./game-master.component.scss']
})
export class GameMasterComponent implements OnInit, OnDestroy {

  playersForm: FormArray;
  destroy$: Subject<boolean> = new Subject();


  constructor(protected master: GameMasterService) {
    this.playersForm = new FormArray(this.master.players.map((player) => new FormControl(player)));
  }

  ngOnInit() {
    this.playersForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(500)).subscribe(this.master.updatePlayers);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  onNewGame() {
    this.playersForm.controls.forEach(playerControl => playerControl.disable());
    this.master.newGame();
  }

}
