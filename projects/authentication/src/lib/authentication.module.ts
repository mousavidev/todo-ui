import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { StorageModule } from '@ngw/storage';

import { AuthenticationService } from './authentication.service';
import { AuthenticationInterceptor } from './authentication.interceptor';

@NgModule({
  imports: [
    StorageModule.forRoot('local')
  ],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
  ]
})
export class AuthenticationModule {}
