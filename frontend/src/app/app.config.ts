import  Aura  from '@primeng/themes/aura';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, importProvidersFrom  } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { AuthInterceptor } from './auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';
export const appConfig: ApplicationConfig = {
  providers: [
   provideAnimationsAsync(),
   providePrimeNG({
       theme: {
           preset: Aura,
           options:{
            cssLayer:{
              name:'primeng',
              order:'theme, base, primeng'
            },
            darkModeSelector: '.my-app-dark'
           }
       }
   }),
   importProvidersFrom(FontAwesomeModule),
   provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
    CookieService,
    MessageService,
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    provideRouter(routes), provideClientHydration(withEventReplay())

  ]
};

