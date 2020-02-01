export interface PromptData {
	title?: string;
	message?: string;
	buttons: PromptButton[];
}

export interface PromptButton {
	content: string;
	data: any;
	color: ButtonColor;
	type?: ButtonType;
	tabIndex?: number;
}

export type ButtonType = "default" | "flat" | "stroked" | "raised";
export type ButtonColor = "default" | "primary" | "accent" | "warn";
