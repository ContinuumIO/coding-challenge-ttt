import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatDialogModule, MatButtonModule } from '@angular/material';

import { RoutingModule } from './router.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './intro.component';
import { GameComponent } from './game.component';
import { GameCardComponent } from './game-card.component';
import { GameCompleteDialogComponent } from './game-complete-dialog.component';

import { UtilsService } from './utils.service';
import { UsersService } from './users.service';
import { ApiService } from './api.service';
import { EventService } from './event.service';
import { GameService } from './game.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        FormsModule,
        RoutingModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule
    ],
    declarations: [
        AppComponent,
        IntroComponent,
        GameComponent,
        GameCardComponent,
        GameCompleteDialogComponent
    ],
    entryComponents: [
        GameCompleteDialogComponent
    ],
    providers: [
        ApiService,
        UsersService,
        UtilsService,
        EventService,
        GameService
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {}
