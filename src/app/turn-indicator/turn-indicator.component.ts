import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';

// Component used to render the Player turn indicator for the game board
@Component({
  selector: 'turn-indicator',
  templateUrl: './turn-indicator.component.html',
  styleUrls: ['./turn-indicator.component.scss']
})
export class TurnIndicatorComponent {

  constructor(private gameState: GameStateService) { }

}
