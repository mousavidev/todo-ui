import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@ngw/authentication';

@Injectable()
export class AuthenticationGuard implements CanLoad {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve) => {
      this.authenticationService.isAuthenticated$.subscribe(
        isAuthenticated => {
          if(!isAuthenticated) this.router.navigate(['/']);
          resolve(isAuthenticated);
        }
      )
    });
  }
  
}
