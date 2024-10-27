import { StoreScope, type Store } from "@activepieces/pieces-framework";
import type { WehcatMpAccessTokenCacheManager } from "wechatmp-kit";
import type { AccessTokenApiResult } from "wechatmp-kit/dist/type";
type Token = {
  access_token: string,
  expired: number
  expires_in: number
}
/**
 * 基于内存的Token管理机制
 */
export class ActivepiecesTokenManager
  implements WehcatMpAccessTokenCacheManager {

  private store: Store
  constructor(store: Store) {
    this.store = store
  }
  async get(appId: string): Promise<AccessTokenApiResult | undefined> {
    const data = await this.store.get<Token>(appId, StoreScope.PROJECT)
    if (data && data.expired > Date.now()) {
      return {
        access_token: data.access_token,
        expires_in: data.expires_in
      }
    }
    return undefined
  }

  async set(appId: string, value: AccessTokenApiResult): Promise<void> {
    const expiresAt = Date.now() + value.expires_in * 1000
    const data = { ...value, expired: expiresAt }
    await this.store.put<Token>(appId, data, StoreScope.PROJECT)
  }
}
