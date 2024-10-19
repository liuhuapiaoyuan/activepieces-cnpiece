
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
import { sendTopicMessage } from "./lib/actions/send-message.action";
import { queryScanUsers } from "./lib/actions/query-scanusers.action";
import { queryUserList } from "./lib/actions/query-userlist.action";
import { receiveUsermsg } from "./lib/triggers/receive-usermsg.trigger";
   


const markdownPropertyDescription = `
**填写AppToken:**

1. 在你创建应用的过程中，你应该已经看到appToken，如果没有保存，可以通过下面的方式重制它。

2. 打开应用的后台 [https://wxpusher.zjiecode.com/admin/](https://wxpusher.zjiecode.com/admin/) ，从左侧菜单栏，找到appToken菜单，在这里，你可以重置appToken，请注意，重置后，老的appToken会立即失效，调用接口会失败。

`;

export const wxpusherAuth = PieceAuth.SecretText({
  displayName: 'AppToken',
  description: `从左侧菜单栏，找到appToken菜单，点击链接：  [https://wxpusher.zjiecode.com/admin/](https://wxpusher.zjiecode.com/admin/)`,
  required: true,
});

export const wxpusher = createPiece({
  displayName: "WxPusher",
  auth: wxpusherAuth,
  minimumSupportedRelease: '0.27.1',
  logoUrl: "https://cdn.kedao.ggss.club/wxpusher.png",
  authors: ['liuhuapiaoyuan'],
  actions: [sendTopicMessage, queryScanUsers, queryUserList],
  triggers: [receiveUsermsg],
});
