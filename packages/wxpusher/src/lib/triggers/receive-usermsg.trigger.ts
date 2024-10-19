import { wxpusherAuth } from '@/index';
import {
    Property,
    TriggerStrategy,
    createTrigger,
} from '@activepieces/pieces-framework';
import {
    DynamicPropsValue,
} from '@activepieces/pieces-framework';
const message = `**回调地址:**
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

### 目前WxPusher已经支持指令类的上行消息，用户发送指令，WxPusher会将指令消息回调给开发者。
- 标准指令： 指令的格式为：#{appID} 内容 ，比如给演示程序发送消息，可以发送：#97 测试 ，注意中间有一个空格。
- 订阅指令: 如果只发送appID：#{appID}，比如：#97 ，后面没有内容，表示关注appID为97的应用。
- 简化指令: 如果只发送内容：xxx ，比如：重启服务器 ，这个时候又分为2种情况：
只订阅了一个应用，会直接发送给给这个默认应用
订阅了多个应用，这个时候用户会提示用户选择，在手机端可以直接点击完成操作。


`
enum AuthType {
    NONE = 'none',
    BASIC = 'basic',
    HEADER = 'header',
}

export const receiveUsermsg = createTrigger({
    name: 'receiveUsermsg',
    displayName: '接收到用户消息',
    auth:wxpusherAuth,
    description: `目前WxPusher已经支持指令类的上行消息，用户发送指令，WxPusher会将指令消息回调给开发者`,
    props: {
        markdown: Property.MarkDown({
            value: message,
        }),
        appId: Property.ShortText({
            description: '抓取对应应用ID的参数',
            required: true,
            defaultValue: '97',
            displayName: '应用ID'
        }),
        authType: Property.StaticDropdown<AuthType>({
            displayName: 'Authentication',
            required: true,
            defaultValue: 'none',
            options: {
                disabled: false,
                options: [
                    { label: 'None', value: AuthType.NONE },
                    { label: 'Basic Auth', value: AuthType.BASIC },
                    { label: 'Header Auth', value: AuthType.HEADER },
                ],
            },
        }),
        authFields: Property.DynamicProperties({
            displayName: 'Authentication Fields',
            required: false,
            refreshers: ['authType'],
            props: async ({ authType }) => {
                if (!authType) {
                    return {};
                }
                const authTypeEnum = authType.toString() as AuthType;
                let fields: DynamicPropsValue = {};
                switch (authTypeEnum) {
                    case AuthType.NONE:
                        fields = {};
                        break;
                    case AuthType.BASIC:
                        fields = {
                            username: Property.ShortText({
                                displayName: 'Username',
                                description: 'The username to use for authentication.',
                                required: true,
                            }),
                            password: Property.ShortText({
                                displayName: 'Password',
                                description: 'The password to use for authentication.',
                                required: true,
                            }),
                        };
                        break;
                    case AuthType.HEADER:
                        fields = {
                            headerName: Property.ShortText({
                                displayName: 'Header Name',
                                description: 'The name of the header to use for authentication.',
                                required: true,
                            }),
                            headerValue: Property.ShortText({
                                displayName: 'Header Value',
                                description: 'The value to check against the header.',
                                required: true,
                            }),
                        };
                        break;
                    default:
                        throw new Error('Invalid authentication type');
                }
                return fields;
            },
        }),
    },

    sampleData: {

        "action": "send_up_cmd",//动作，send_up_cmd 表示上行消息回调，后期可能会添加其他动作，请做好兼容。
        "data": {
            "uid": "UID_xxx",//用户uid
            "appId": 97, //应用id
            "appName": "WxPusher演示",//应用名称
            "time": 1603002697386,//发生时间
            "content": "内容" //用户发送的内容
        }
    },
    async onEnable() {
        // ignore
    },
    async onDisable() {
        // ignore
    },
    type: TriggerStrategy.WEBHOOK,
    async run(context) {
        const authenticationType = context.propsValue.authType;
        if (!authenticationType) {
            throw new Error(`AuthType is null or undefined`)
        }
        const verified = verifyAuth(authenticationType, context.propsValue.authFields ?? {}, context.payload.headers);
        if (!verified) {
            return []
        }
        return [context.payload.body]
    },
});



function verifyAuth(authenticationType: AuthType, authFields: DynamicPropsValue, headers: Record<string, string>): boolean {
    switch (authenticationType) {
        case AuthType.NONE:
            return true;
        case AuthType.BASIC:
            return verifyBasicAuth(headers['authorization'], authFields['username'], authFields['password']);
        case AuthType.HEADER:
            return verifyHeaderAuth(headers, authFields['headerName'], authFields['headerValue']);
        default:
            throw new Error('Invalid authentication type');
    }
}

function verifyHeaderAuth(headers: Record<string, string>, headerName: string, headerSecret: string) {
    const headerValue = headers[headerName.toLocaleLowerCase()];
    return headerValue === headerSecret;
}

function verifyBasicAuth(headerValue: string, username: string, password: string) {
    if (!headerValue.toLocaleLowerCase().startsWith('basic ')) {
        return false;
    }
    const auth = headerValue.substring(6);
    const decodedAuth = Buffer.from(auth, 'base64').toString();
    const [receivedUsername, receivedPassword] = decodedAuth.split(':');
    return receivedUsername === username && receivedPassword === password;
}
