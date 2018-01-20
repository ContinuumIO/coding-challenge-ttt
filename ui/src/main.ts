import './index.scss';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

// This is used for Webpack HMR
declare var module:any;
if (module.hot) {
    module.hot.accept();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .then(platformRef => {
        // hello darkness my old friend
    },
    error => {
        console.log('Bootstrap Error ', error);
    });
