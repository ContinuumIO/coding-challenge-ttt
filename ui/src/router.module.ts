import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroComponent } from './intro.component';
import { GameComponent } from './game.component';

const routes: Routes = [
    {
        path: 'intro',
        component: IntroComponent
    },
    {
        path: 'play',
        component: GameComponent
    },
    {
        path: '',
        redirectTo: '/intro',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: []
})

export class RoutingModule {}
