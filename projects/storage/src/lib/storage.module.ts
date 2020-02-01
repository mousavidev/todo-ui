import { NgModule, ModuleWithProviders } from '@angular/core';

import { StorageType } from './storage.types';
import { STORAG_TYPE } from './storage.token';
import { StorageService } from './storage.service';

@NgModule()
export class StorageModule {
    
    static forRoot(storageType: StorageType | null): ModuleWithProviders {
        return {
            ngModule: StorageModule,
            providers: [
                { provide: STORAG_TYPE, useValue: storageType || 'session' },
                StorageService
            ]
        };
    }

}
