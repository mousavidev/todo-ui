import { ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

export class AppErrorHandler extends ErrorHandler {

    constructor(
        private snackbar: MatSnackBar
    ) {
        super();
    }

    handleError(error: Error | HttpErrorResponse): void {
        if (error instanceof HttpErrorResponse) {
            if (!navigator.onLine) {
                this.handleConnectionRefused();
            } else {
               this.handleHttpError(error);
            }
        } else {
            this.handleClientError(error);
        }

        super.handleError(error);
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
    handleClientError(error: any) {
        console.log(error);
    }
}
