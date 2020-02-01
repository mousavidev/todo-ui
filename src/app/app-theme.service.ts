import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class AppThemeService {
    private renderer: Renderer2;
    constructor(
        @Inject(DOCUMENT) private document: Document,
        rendererFactory: RendererFactory2,
    ) {
        this.renderer = rendererFactory.createRenderer(document, null);
    }

    isDarkMode(): boolean {
        return this.document.body.classList.contains('dark-theme');
    }

    enableDarkMode(): void {
        this.renderer.removeClass(this.document.body, 'light-theme');
        this.renderer.addClass(this.document.body, 'dark-theme');
    }

    disableDarkMode(): void {
        this.renderer.removeClass(this.document.body, 'dark-theme');
        this.renderer.addClass(this.document.body, 'light-theme');
    }
}
