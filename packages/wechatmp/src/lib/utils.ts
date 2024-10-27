import type { SecretTextProperty, StaticPropsValue, Store } from "@activepieces/pieces-framework";
import type { WxpusherAuthType } from "..";
import { WechatMpApi } from "wechatmp-kit";
import { ActivepiecesTokenManager } from "./wechat/ActivepiecesTokenManager";

 
/**
 * 获得服务接口
 * @param auth 
 * @param store 
 * @returns 
 */
export function getWechatApi(auth: WxpusherAuthType, store: Store) {
    return new WechatMpApi({
        appId: auth.appId,
        appSecret: auth.appSecret,
        accessTokenCacheManager: new ActivepiecesTokenManager(store)
    })
}
/**
 * 获得消息包
 * @param auth 
 * @param store 
 * @returns 
 */
export function getWechatMessage(auth: WxpusherAuthType, store: Store) {
    const api =  new WechatMpApi({
        appId: auth.appId,
        appSecret: auth.appSecret,
        accessTokenCacheManager: new ActivepiecesTokenManager(store)
    })
    return api.getMessageService(
        auth.token,
        auth.safeMode=="true" ? auth.encodingAESKey : undefined
    )
}