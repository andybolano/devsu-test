import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpCommonService {

    handleError<T>(error: HttpErrorResponse): Observable<T> {
        console.error(JSON.stringify(error))
        return throwError(() => error);
    }
}
