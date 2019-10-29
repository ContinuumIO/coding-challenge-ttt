import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';

import { TTTService } from './../ttt.service';
import { GameData } from '../data-models/game.data';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {
  pOneName: string;
  pTwoName: string;
  pOneCtrl: AbstractControl;
  pTwoCtrl: AbstractControl;
  newGameForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tttService: TTTService,
    private router: Router
  ) {
    this.newGameForm = this.fb.group({
      pOneCtrl: ['', Validators.required],
      pTwoCtrl: ['', Validators.required]
    });
    this.pOneCtrl = this.newGameForm.controls['pOneCtrl'];
    this.pTwoCtrl = this.newGameForm.controls['pTwoCtrl'];
  }

  ngOnInit() {}

  createNewGame() {
    // console.log('one - ' + this.pOneCtrl.value);
    // console.log('two - ' + this.pTwoCtrl.value);
    this.tttService
      .createNewGame(this.pOneCtrl.value, this.pTwoCtrl.value)
      .subscribe(
        (data: GameData) => {
          // new GameData is returned and saving as Active Game
          this.tttService.setActiveGame(data);
          // routing to game component
          this.router.navigate(['/ttt-game']);
        },
        error => this.handleError(error)
      );
  }

  private handleError(error: Error) {
    console.log('Error occured - ' + error);
  }
}
