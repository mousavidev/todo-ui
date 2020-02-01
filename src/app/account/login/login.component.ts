import { Component, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '@ngw/authentication';

@Component({
  selector: 'ngw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @HostBinding('class') classes = 'ngw-login';

  form: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      username: ['mousavi', Validators.required],
      password: ['123456', Validators.required]
    });

    this.authenticationService.isAuthenticated$.subscribe(
      isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/todo']);
        }
      }
    );
  }

  login(valid, { username, password }): void {
    if (valid) {
      this.authenticationService.login(username, password);
    }
  }

}
