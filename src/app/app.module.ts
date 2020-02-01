import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppAuthenticationModule } from './authentication/app-authentication.module';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatSnackBarModule, MatSnackBar } from '@angular/material';
import { AppErrorHttpInterceptor } from './app-error.http-interceptor';
import { AppThemeService } from './app-theme.service';

@NgModule({
  declarations: [ AppComponent, PageNotFoundComponent ],
  entryComponents: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppAuthenticationModule.forRoot(),
    AppRoutingModule,
    MatSnackBarModule
  ],
  providers: [
    AppThemeService,
    { provide: HTTP_INTERCEPTORS, useClass: AppErrorHttpInterceptor, multi: true, deps: [MatSnackBar] }
  ]
})
export class AppModule implements DoBootstrap {

  ngDoBootstrap(appRef: ApplicationRef): void {
    appRef.bootstrap(AppComponent);
  }

}
