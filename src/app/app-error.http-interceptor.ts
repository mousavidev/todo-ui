import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AppErrorHttpInterceptor implements HttpInterceptor {

    constructor(
        private snackbar: MatSnackBar
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    this.handleError(err);
                }

                return throwError(err);
            })
        );
    }

    handleError(error: HttpErrorResponse): void {
        if (!navigator.onLine) {
            this.handleConnectionRefused();
        } else if (error.status >= 500) {
           this.handleHttpError(error);
        }
    }

    handleConnectionRefused() {
        this.snackbar.open('Network connection refused.', 'Oops!', {
            verticalPosition: 'top'
        });
    }

    handleHttpError(error: HttpErrorResponse) {
        this.snackbar.open(error.error, 'Oops!', {
            verticalPosition: 'top'
        });
    }

}
