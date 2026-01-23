import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { myAuthInterceptor } from './common/interceptor/my-auth.interceptor';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(  withInterceptors([myAuthInterceptor]) )  ,
    provideOAuthClient(), provideClientHydration(withEventReplay()) /* instead of imports:[OAuthModule.forRoot()] */ 
  ]
};
