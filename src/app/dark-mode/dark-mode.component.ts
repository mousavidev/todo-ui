import { Component, HostBinding } from '@angular/core';
import { AppThemeService } from '../app-theme.service';

@Component({
  selector: 'ngw-dark-mode',
  template: `
    <mat-slide-toggle labelPosition="before" [checked]="isDarkMode" (change)="darkModeChange($event.checked)">Dark Mode</mat-slide-toggle>
  `,
  styles: [ ':host { font-size: 14px; }' ]
})
export class DarkModeComponent {

  @HostBinding('class') classes = 'ngw-dark-mode';

  public get isDarkMode(): boolean {
    return this.appThemeService.isDarkMode();
  }

  constructor(
    private appThemeService: AppThemeService
  ) {}

  darkModeChange(isDarkMode) {
    if (isDarkMode) {
      this.appThemeService.enableDarkMode();
    } else {
      this.appThemeService.disableDarkMode();
    }
  }

}
