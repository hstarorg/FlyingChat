import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import './less/all.less';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { hmrBootstrap } from './hmr';

import { AppModule } from './app.module';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  enableProdMode();
}

function bootstrap() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (!isProd) {
  if (module['hot']) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('Ammm.. HMR is not enabled for webpack');
  }
} else {
  bootstrap();
}
