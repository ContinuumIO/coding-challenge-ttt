import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';
import swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { GamesApiService } from '../../services/games-api.service';
import { Router } from '@angular/router';

// Component used to render the Game board and Player selection
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

  // Takes user to the games list page
  gameExplorer() : void {
     this.router.navigate(['/game-explorer']);
  }

  // resets data to return to the player select
  goToPlayerSelect() : void {
      this.gameState.resetPlayers();
  }

  // Kicker to start off a new game for the players from the player select
  startGame() : void {
      this.gameState.startNewGame(this.playerXName, this.playerOName);
  }

  // Kicks off the save for a game in progress
  saveGame() : void {
      this.gameState.saveGameProgress();
  }

  // Calls function to place marker on board via GameStateService
  placeMarker(r, c) : void {
      this.gameState.placePlayerMarker(r, c);
  }

}
