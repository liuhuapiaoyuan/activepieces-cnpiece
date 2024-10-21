
import { createPiece, PieceAuth } from "@activepieces/pieces-framework"; 
import { receiveUsermsg } from "./lib/triggers/receive-usermsg.trigger";
import { respXMLMessage } from "./lib/actions/resp-xml-message";
import { templateSend } from "./lib/actions/template-send";
import { userList } from "./lib/actions/user-list";
import { userTagList } from "./lib/actions/user-tag-list";
import { accessToken } from "./lib/actions/access-token";
import { tagsGet } from "./lib/actions/tags-get";
   


const markdownPropertyDescription = `
**微信公众号配置**

> [公众号测试平台](https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index)。
> [公众号平台](https://mp.weixin.qq.com)。
`;

export const wxpusherAuth = PieceAuth.CustomAuth({
  description:markdownPropertyDescription,
  props: {
    appId: PieceAuth.SecretText({
      displayName: 'appId',
      required: true,
    }),
    appSecret: PieceAuth.SecretText({
      displayName: 'appSecret',
      required: true,
    })
  },
  required: true
})

export const wxpusher = createPiece({
  displayName: "微信公众号",
  auth: wxpusherAuth,
  minimumSupportedRelease: '0.27.1',
  logoUrl: "https://cdn.kedao.ggss.club/wechatmp.svg",
  authors: ['liuhuapiaoyuan'],
  actions: [accessToken,respXMLMessage ,templateSend,userList,userTagList,tagsGet],
  triggers: [receiveUsermsg],
});
