import { NgModule, ModuleWithProviders } from '@angular/core';

import { AuthenticationModule, AUTH_ISSUER_URL, AUTHENTICATION_MODULE_CONFIG, authenticationModuleConfigFactory } from '@ngw/authentication';

import { environment } from '../../environments/environment';

import { AuthenticationGuard } from './authentication.guard';
import { ShouldLoginGuard } from './should-login.guard';
import { AppAuthenticationInitProvider } from './app-authentication.init';

const allowedUrls = [
    environment.api
];

@NgModule({
    imports: [
        AuthenticationModule
    ],
    exports: [ AuthenticationModule ],
    providers: [
        AppAuthenticationInitProvider,
        AuthenticationGuard,
        ShouldLoginGuard
    ]
})
export class AppAuthenticationModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppAuthenticationModule,
            providers: [
                { provide: AUTHENTICATION_MODULE_CONFIG, useFactory: authenticationModuleConfigFactory(allowedUrls) },
                { provide: AUTH_ISSUER_URL, useValue: environment.api },
            ]
        };
    }
}
