import { InjectionToken } from '@angular/core';
import { StorageType } from './storage.types';

export const STORAG_TYPE = new InjectionToken<StorageType>('StorageType');
