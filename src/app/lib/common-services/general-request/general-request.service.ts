import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, first, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCommonService } from './http-common.service';

@Injectable({
    providedIn: 'root',
})
export class GeneralRequestService {
    constructor(
        private readonly http: HttpClient,
        private readonly httpCommon: HttpCommonService,
    ) { }

    get<T>(url: string): Observable<T> {
        return this.http.get<T>(url).
            pipe(
                retry(1),
                first(),
                catchError((error: HttpErrorResponse) => this.httpCommon.handleError<T>(error)),
            );
    }

    post<T, Y>(endPoints: string, params: Y): Observable<T> {
        return this.http.post<T>(endPoints, params).
            pipe(
                retry(1),
                first(),
                catchError((error: HttpErrorResponse) => this.httpCommon.handleError<T>(error)),
            );
    }

    patch<T, Y>(endPoints: string, params: Y): Observable<T> {
        return this.http.patch<T>(endPoints, params).
            pipe(
                retry(1),
                first(),
                catchError((error: HttpErrorResponse) => this.httpCommon.handleError<T>(error)),
            );
    }

    delete<T>(endPoints: string): Observable<T> {
        return this.http.delete<T>(endPoints).
            pipe(
                retry(1),
                first(),
                catchError((error: HttpErrorResponse) => this.httpCommon.handleError<T>(error)),
            );
    }
}