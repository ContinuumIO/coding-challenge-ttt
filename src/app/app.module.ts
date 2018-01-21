import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { GamesApiService } from './games-api.service';
import { GameStateService } from './game-state.service';
import { TurnIndicatorComponent } from './turn-indicator/turn-indicator.component';
import { GameExplorerComponent } from './game-explorer/game-explorer.component';

const appRoutes: Routes = [
  { path: 'game-explorer', component: GameExplorerComponent },
  { path: '', component: GameboardComponent},
];




@NgModule({
  declarations: [
    AppComponent,
    GameboardComponent,
    TurnIndicatorComponent,
    GameExplorerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GamesApiService, GameStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
