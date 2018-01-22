import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../game-state.service';
import swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { GamesApiService } from '../games-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent {

  private exploreGames : boolean;
  private playerXName : string;
  private playerOName : string;

  constructor(private gamesApi : GamesApiService, private gameState : GameStateService, private router: Router) { }

  gameExplorer() : void {
     this.router.navigate(['/game-explorer']);
  }

  goToPlayerSelect() : void {
      this.gameState.resetPlayers();
  }

  startGame() : void {
      this.gameState.startNewGame(this.playerXName, this.playerOName);
  }

  saveGame() : void {
      this.gameState.saveGame();
  }

  placeMarker(r, c) : void {
      this.gameState.placePlayerMarker(r, c);
  }

}
