import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { importProvidersFrom } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { addIcons } from 'ionicons';
import { home, heart, heartOutline, settings, trash } from 'ionicons/icons';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

addIcons({
  home,
  heart,
  'heart-outline': heartOutline,
  settings,
  trash
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(IonicStorageModule.forRoot()),
  ],
});