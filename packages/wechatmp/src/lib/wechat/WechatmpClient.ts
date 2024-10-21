import type { TokenStore } from "./TokenStore";
import type { UserGetResp, UserTagGetResp } from "./types";





export class WechatmpClient {
    private tokenStore: TokenStore
    private appId: string
    private appSecret: string


    constructor(tokenStore: TokenStore, appId: string, appSecret: string) {
        this.tokenStore = tokenStore
        this.appId = appId
        this.appSecret = appSecret
    }


    async getAccessToken(force_refresh?: boolean) {
        if (!force_refresh) {
            const token = await this.tokenStore.get(this.appId)
            if (token) {
                return token
            }

        }
        const data = {
            grant_type: "client_credential",
            appid: this.appId,
            secret: this.appSecret,
            force_refresh
        }
        const url = `https://api.weixin.qq.com/cgi-bin/stable_token`;
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
        }).then(r => r.json()).then(async ({ access_token, expires_in }) => {
            await this.tokenStore.update(this.appId, access_token,
                new Date(Date.now() + expires_in * 1000)
            )
            return access_token
        })
    }

    async userGet(next_openid?: string) {
        const data = await this.request<UserGetResp>('/user/get', {
            queryParam: next_openid?{
                next_openid: next_openid!
            }:{}
        })
        return data
    }
    async userTagGet(tagid: number, next_openid?: string) {
        const data = await this.request<UserTagGetResp>('/user/tag/get', {
            body: JSON.stringify({
                tagid,
                next_openid: next_openid!
            }),
            method: "POST"
        })
        return data
    }

    /**
     * 发送模板消息
     * @param data 
     * @returns 
     */
    async messageTemplateSend(data: {
        touser: string,
        template_id: string,
        url?: string,
        miniprogram?: {
            appid: string,
            pagepath?: string
        },
        client_msg_id?: string,
        data: Record<string, {
            value: string
        }>
    }) {
        return this.request<{ msgid: string }>("/message/template/send", {
            body: JSON.stringify(data),
            method: "POST"
        })
    }

    async request<T>(endpoint: string, options?: RequestInit & { queryParam?: Record<string, undefined> }) {
        const url = `https://api.weixin.qq.com/cgi-bin${endpoint}`
        const queryParam = options?.queryParam ?? {}
        queryParam['access_token'] = await this.getAccessToken()
        const search = new URLSearchParams()
        for (const [key, value] of Object.entries(queryParam)) {
            if (value) {
                search.append(key, value)
            }
        }
        return fetch(url + "?" + search.toString(), options).then(r => r.json()).then(r => {
            if (r.errcode) {
                throw new Error(r.errmsg)
            }
            return r as T
        })
    }

}