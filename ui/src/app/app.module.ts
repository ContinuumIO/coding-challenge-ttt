import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { GridSize, HttpHost } from './tokens';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameMasterComponent } from './game-master/game-master.component';
import { BoardSpaceComponent } from './board-space/board-space.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameBoardComponent,
    GameMasterComponent,
    BoardSpaceComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {provide: HttpHost, useValue: ''},
    {provide: GridSize, useValue: 3}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
