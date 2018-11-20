import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatGridListModule,
  MatTableModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NewGameComponent } from './new-game/new-game.component';
import { TttGameComponent } from './ttt-game/ttt-game.component';
import { GamesListComponent } from './games-list/games-list.component';

import { TTTService } from './ttt.service';
import { LandingPageComponent } from './landing-page/landing-page.component';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'new-game', component: NewGameComponent },
  { path: 'games', component: GamesListComponent },
  { path: 'ttt-game', component: TttGameComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NewGameComponent,
    TttGameComponent,
    GamesListComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [TTTService],
  bootstrap: [AppComponent]
})
export class AppModule {}
