import { Injectable, Inject } from '@angular/core';
import {
    HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { StorageService } from '@ngw/storage';

import { AUTH_TOKEN, IGNORE_AUTHTORIZE } from './authentication.keys';
import { AUTHENTICATION_MODULE_CONFIG } from './authentication.tokens';
import { AuthenticationModuleConfig } from './authentication-module.config';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(
        @Inject(AUTHENTICATION_MODULE_CONFIG) private authenticationModuleConfig: AuthenticationModuleConfig,
        private storageService: StorageService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (this.authenticationModuleConfig.checkUrl(req.url)) {
            const token = this.storageService.getItem(AUTH_TOKEN);

            if (req.headers.has(IGNORE_AUTHTORIZE)) {
                req.headers.delete(IGNORE_AUTHTORIZE);
                return next.handle(req);
            }

            if (token) {
              const header = 'Bearer ' + token;
              const headers = req.headers.set('Authorization', header);
              const cloneReq = req.clone({ headers });

              return next.handle(cloneReq);
            }
        } else {
            return next.handle(req);
        }
    }
}
