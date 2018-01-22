import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'turn-indicator',
  templateUrl: './turn-indicator.component.html',
  styleUrls: ['./turn-indicator.component.scss']
})
export class TurnIndicatorComponent implements OnInit {

  constructor(private gameState: GameStateService) { }

  ngOnInit() {
  }

}
