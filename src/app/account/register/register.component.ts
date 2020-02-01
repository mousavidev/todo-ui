import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { AuthenticationService } from '@ngw/authentication';

@Component({
  selector: 'ngw-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @HostBinding('class') classes = 'ngw-register';

  @ViewChild('registerForm', { static: false }) registerForm: NgForm;
  form: FormGroup;
  private get autoLogin(): boolean {
    return this.form.get('autoLogin').value;
  }

  constructor(
    private authenticationService: AuthenticationService,
    private matSnackbar: MatSnackBar,
    private router: Router,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      autoLogin: [false]
    });
  }
  ngOnInit(): void {
    this.authenticationService.registeredUser$
      .subscribe(
        user => {
          this.showNotificationToRegistedUser(user);
          if (!this.autoLogin) {
            this.router.navigate(['/account/login']);
          }
          this.registerForm.resetForm();
        }
      );
  }

  showNotificationToRegistedUser(user): void {
    this.matSnackbar
    .open(`${user.username}' Thanks to register your account.`, 'Your welcome.', {
      verticalPosition: 'top'
    });
  }

  register(valid, { username, password, autoLogin }): void {
    if (valid) {
      this.authenticationService.register(username, password, autoLogin);
    }
  }

}
