import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class RequestHeadersInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        request = request.clone({
            setHeaders: {
                'AuthorId': '221',
                'Cache-Control': 'no-store',
                'Accept-Language': 'en'
            }
        });

        return next.handle(request);
    }
}
