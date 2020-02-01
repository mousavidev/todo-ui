import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

import { StorageService } from '@ngw/storage';

import { AUTH_TOKEN } from './authentication.keys';
import { AUTH_ISSUER_URL } from './authentication.tokens';

@Injectable()
export class AuthenticationService {

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  private registeredUser = new Subject<{ username: string, password: string }>();
  registeredUser$ = this.registeredUser.asObservable();

  constructor(
    @Inject(AUTH_ISSUER_URL) private authIssuerUrl: string,
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  initializeAuthentication(): void {
    const token = this.storageService.getItem(AUTH_TOKEN);
    if (!!token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(username: string, password: string): void {
    if (!username || !password) {
      throw new Error('Username or password is empty.');
    }

    const headers = new HttpHeaders({'X-Ignore-Authorize': 'ignore'});

    this.http
      .post(
        `${this.authIssuerUrl}/users/login`,
        { username, password},
        { headers }
      ).subscribe(
        (token: any) => {
          this.authenticateUser(token.token);
        }
      );
  }

  register(username: string, password: string, autoLogin: boolean = false): void {
    if (!username || !password) {
      throw new Error('Username or password is empty.');
    }

    const user = { username, password, autoLogin };
    const headers = new HttpHeaders({'X-Ignore-Authorize': 'ignore'});

    this.http
      .post(
        `${this.authIssuerUrl}/users`,
        user,
        { headers })
      .subscribe(
        (token: any) => {
          this.authenticateUser(token.token);
          this.registeredUser.next(user);
        }
      );
  }

  authenticateUser(token): void {
    const isAuthenticated = !!token;

    if (isAuthenticated) {
      this.storageService.setItem(AUTH_TOKEN, token);
    }
    this.isAuthenticated.next(isAuthenticated);
  }

  logout(): void {
    this.storageService.removeItem(AUTH_TOKEN);
    this.isAuthenticated.next(false);
  }
}
