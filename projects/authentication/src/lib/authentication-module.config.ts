export class AuthenticationModuleConfig {

    constructor(
        public allowedUrls: string[]
    ) {}

    public checkUrl(url: string): boolean {
        if (this.allowedUrls) {
            return !!this.allowedUrls.find(u => url.startsWith(u));
        }

        return true;
    }
}

export function authenticationModuleConfigFactory(allowedUrls: string[]) {
    return () => new AuthenticationModuleConfig(allowedUrls);
}
