import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PromptData } from './prompt.models';

@Component({
  selector: 'ngw-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent {

	constructor(
		public dialogRef: MatDialogRef<PromptComponent>,
		@Inject(MAT_DIALOG_DATA) public data:PromptData
	) { }
}
