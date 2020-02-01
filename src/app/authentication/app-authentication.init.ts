import { Provider, APP_INITIALIZER } from "@angular/core";

import { AuthenticationService } from '@ngw/authentication';

export const AppAuthenticationInitProvider: Provider = {
    provide: APP_INITIALIZER,
    useFactory: appAuthenticationInitFactory,
    deps: [AuthenticationService],
    multi: true
}

export function appAuthenticationInitFactory(authenticationService: AuthenticationService) {
    return () => authenticationService.initializeAuthentication();
}
