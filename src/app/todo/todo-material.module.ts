import { NgModule } from '@angular/core';
import {
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    MatRippleModule,
    MatMenuModule,
    MatSlideToggleModule
} from '@angular/material';

import { MatInputAutofocusDirective } from './todo/auto-focus.directive';

const includesModule = [
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatRippleModule,
    MatMenuModule,
    MatSlideToggleModule
];

@NgModule({
    declarations: [ MatInputAutofocusDirective ],
    imports: includesModule,
    exports: [...includesModule, MatInputAutofocusDirective]
})
export class TodoMaterialModule {}
