import { StoreScope, type Store } from "@activepieces/pieces-framework";
import type { TokenStore } from "./wechat/TokenStore";
type Token = {
    token: string,
    expired: number
}
/**
 * 适配
 */
export class ActivepiecesTokenStore implements TokenStore {
    private store: Store
    constructor(store: Store) {
        this.store = store
    }
    async update(appid: string, token: string, expired: Date): Promise<void> {
        const data = {
            token, expired: expired.getTime()
        }
        await this.store.put<Token>(appid, data, StoreScope.PROJECT)
    }
    async remove(appid: string): Promise<void> {
        await this.store.delete(appid, StoreScope.PROJECT)
    }
    async get(appid: string): Promise<string | undefined> {
        const data = await this.store.get<Token>(appid, StoreScope.PROJECT)
        if (data && data.expired > Date.now()) {
            return data.token
        }
        return undefined
    }


}