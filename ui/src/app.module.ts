import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RoutingModule } from './router.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './intro.component';
import { GameComponent } from './game.component';
import { GameCardComponent } from './game-card.component';

import { UtilsService } from './utils.service';
import { UsersService } from './users.service';
import { ApiService } from './api.service';
import { EventService } from './event.service';
import { GameService } from './game.service';

import { FocusInput } from './directives/focus.directive';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        FormsModule,
        RoutingModule
    ],
    declarations: [
        AppComponent,
        IntroComponent,
        GameComponent,
        GameCardComponent,
        FocusInput
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
