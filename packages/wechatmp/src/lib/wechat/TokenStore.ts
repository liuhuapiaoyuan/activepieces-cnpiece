

export interface TokenStore {
    update(appid: string, token: string, expired: Date): Promise<void>
    remove(appid: string): Promise<void>
    get(appid: string): Promise<string|undefined>
}