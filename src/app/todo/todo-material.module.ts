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
    MatMenuModule
} from '@angular/material';

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
];

@NgModule({
    imports: includesModule,
    exports: includesModule
})
export class TodoMaterialModule {}
