import type { SecretTextProperty, StaticPropsValue, Store } from "@activepieces/pieces-framework";
import { WechatmpClient } from "./wechat/WechatmpClient";
import { ActivepiecesTokenStore } from "./ActivepiecesTokenStore";



export function getWechatClient(auth: StaticPropsValue<{
    appId: SecretTextProperty<true>;
    appSecret: SecretTextProperty<true>;
}>
    , store: Store) {
    return new WechatmpClient(
        new ActivepiecesTokenStore(store),
        auth.appId,
        auth.appSecret
    )
}