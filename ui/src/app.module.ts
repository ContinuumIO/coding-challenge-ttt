import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { RoutingModule } from './router.module';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        RoutingModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [

    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {}
