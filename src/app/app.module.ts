import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { GamesApiService } from './games-api.service';
import { GameStateService } from './game-state.service';
import { TurnIndicatorComponent } from './turn-indicator/turn-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    GameboardComponent,
    TurnIndicatorComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule
  ],
  providers: [GamesApiService, GameStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
