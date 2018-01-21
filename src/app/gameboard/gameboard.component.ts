import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../game-state.service';
import swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { GamesApiService } from '../games-api.service';

@Component({
  selector: 'gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit {

  private exploreGames : boolean;
  private playerXName : string;
  private playerOName : string;

  constructor(private gamesApi : GamesApiService, private gameState : GameStateService) { }

  ngOnInit() {
      this.gamesApi.listGames()
      .subscribe(response => {
          console.log(response);
      })
  }

  gameExplorer() : void {
      this.gameState.exploreGames = true;
  }

  startGame() : void {
      this.gameState.startNewGame(this.playerXName, this.playerOName);
  }

  placeMarker(r, c) : void {
      this.gameState.placePlayerMarker(r, c);
  }

}
