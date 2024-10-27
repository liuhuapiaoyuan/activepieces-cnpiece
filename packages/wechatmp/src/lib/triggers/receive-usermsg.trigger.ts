import { wxpusherAuth } from '@/index';
import {
    Property,
    TriggerStrategy,
    createTrigger,
} from '@activepieces/pieces-framework';
import { getWechatMessage } from '../utils';
import { renderXML } from 'wechatmp-kit';


const message = `**消息回调地址:**
\`\`\`text
{{webhookUrl}}/sync
\`\`\`
<br>
填写到微信公众号消息服务接口
`


export const receiveUsermsg = createTrigger({
    name: 'receiveUsermsg',
    displayName: '收到用户消息',
    auth: wxpusherAuth,
    type: TriggerStrategy.WEBHOOK,
    description: `目前WxPusher已经支持指令类的上行消息，用户发送指令，WxPusher会将指令消息回调给开发者`,
    props: {
        markdown: Property.MarkDown({
            value: message,
        })
    },
    sampleData: {},
    async onEnable() {
        // ignore
    },
    async onDisable() {
        // ignore
    },
    async run(context) {
        const wechatMpApi = getWechatMessage(context.auth, context.store)
        const body = context.payload.body as { xml: Record<string, any> }
        const query = context.payload.queryParams
        // @ts-expect-error trigger has  property 'method'
        const method = context.payload.method
        const signature: string = query.signature
        const msg_signature: string = query.msg_signature
        const timestamp = query.timestamp
        const echostr = query.echostr
        const nonce = query.nonce
        let message = {}
        try {

            message = (method === 'POST' && body.xml) ? await wechatMpApi.parserInput(
                renderXML(body.xml)
                , {
                    signature: (msg_signature ?? signature), nonce, timestamp
                }) : {}
        } catch (error) {
            console.error("消息解析错误", error)
        }
        const signatureVerified = wechatMpApi.checkSign({
            timestamp, nonce, signature
        })


        return [
            {
                signatureVerified,
                method,
                message,
                msg_signature,
                signature, timestamp, nonce, echostr,
            }
        ]
    }
});
