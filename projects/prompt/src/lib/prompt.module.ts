import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';

import { PromptComponent } from './prompt.component';
import { PromptService } from './prompt.service';

@NgModule({
  imports: [
    CommonModule,
		MatDialogModule,
		MatButtonModule
  ],
  declarations: [PromptComponent],
  entryComponents: [PromptComponent],
  exports : [PromptComponent],
  providers: [PromptService]
})
export class PromptModule {}
