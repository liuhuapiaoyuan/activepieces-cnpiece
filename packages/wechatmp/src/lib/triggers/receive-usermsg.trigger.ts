import { wxpusherAuth } from '@/index';
import {
    Property,
    TriggerStrategy,
    createTrigger,
} from '@activepieces/pieces-framework';

import crypto from 'crypto';

const message = `**消息回调地址:**
\`\`\`text
{{webhookUrl}}
\`\`\`
<br>
<br>
**Test URL:**
\`\`\`text
{{webhookUrl}}/test
\`\`\`
<br>

`
 

export const receiveUsermsg = createTrigger({
    name: 'receiveUsermsg',
    displayName: '收到用户消息',
    auth:wxpusherAuth,
    type: TriggerStrategy.WEBHOOK,
    description: `目前WxPusher已经支持指令类的上行消息，用户发送指令，WxPusher会将指令消息回调给开发者`,
    props: {
        markdown: Property.MarkDown({
            value: message,
        }),
        token: Property.ShortText({
            description: '微信TOKEN',
            required: true,
            defaultValue: '',
            displayName: 'Token'
        }),
    },
    sampleData: { },
    async onEnable() {
        // ignore
    },
    async onDisable() {
        // ignore
    },
    async run(context) {
        const content = context.payload.body
        const query = context.payload.queryParams
        const signature = query.signature
        const timestamp = query.timestamp
        const nonce = query.nonce
        const isValid = checkSignature(context.propsValue.token , signature,timestamp,nonce)
        return [{
            payload:context.payload,
            isValid,
            echostr:query.echostr
        }]
    } 
});


function checkSignature(token: string, signature: string, timestamp: string, nonce: string) {
    const shasum = crypto.createHash('sha1');
//     1）将token、timestamp、nonce三个参数进行字典序排序
    shasum.update([token, timestamp, nonce].sort().join(''));
// 2）将三个参数字符串拼接成一个字符串进行sha1加密
    const hash = shasum.digest('hex');
// 3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    return hash === signature;
}