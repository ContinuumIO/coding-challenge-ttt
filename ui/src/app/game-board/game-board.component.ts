import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GameBoardService } from '../services/game-board.service';
import { GameMasterService } from '../services/game-master.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  @Output() turnEnd: EventEmitter<any>;

  constructor(private board: GameBoardService, private master: GameMasterService) {
  }

  ngOnInit() {
  }

  get currentPlayer() {
    return this.master.currentPlayer;
  }


}
