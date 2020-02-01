import { NgModule } from '@angular/core';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatSnackBarModule } from '@angular/material';

const includesModule = [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
];

@NgModule({
    imports: includesModule,
    exports: includesModule
})
export class AccountMaterialModule {}
