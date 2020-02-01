import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material";
import { Observable } from 'rxjs';

import { PromptComponent } from './prompt.component';
import { PromptData } from './prompt.models';

@Injectable()
export class PromptService {
	constructor(private dialog: MatDialog) { }

	public prompt(data: PromptData): Observable<any> {
		let dialogRef: MatDialogRef<PromptComponent>;

		dialogRef = this.dialog.open(PromptComponent, {
			width: '380px',
			disableClose: true,
			data: {
				...data, buttons: data.buttons.map(b => {
					return { ...b, type: b.type || 'default' }
				})
			}
		});

		return dialogRef.afterClosed();
	}
}
