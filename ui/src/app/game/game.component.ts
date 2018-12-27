import { Component, OnInit } from '@angular/core';
import { GameMasterService } from '../services/game-master.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private gameMaster: GameMasterService) {
  }

  ngOnInit() {
  }

}
