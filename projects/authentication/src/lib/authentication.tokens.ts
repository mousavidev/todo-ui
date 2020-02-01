import { InjectionToken } from '@angular/core';
import { AuthenticationModuleConfig } from './authentication-module.config';

export const AUTH_ISSUER_URL = new InjectionToken<string>('AuthIssuerUrl');
export const AUTHENTICATION_MODULE_CONFIG = new InjectionToken<AuthenticationModuleConfig>('AuthAllowedUrls');
