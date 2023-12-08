import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RequestHeadersInterceptor } from '@lib/common-services/interceptors/request-header.interceptor';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestHeadersInterceptor,
            multi: true,
        },
        {
            provide: 'env',
            useValue: environment,
        }
    ]
};
