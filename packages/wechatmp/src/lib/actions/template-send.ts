import { createAction, PieceAuth, Property, StoreScope, Validators } from '@activepieces/pieces-framework';
import { wxpusherAuth } from '../..';
import { getWechatApi } from '../utils';
 
/**
 */
export const templateSend = createAction({
  name: 'templateSend',
  auth: wxpusherAuth,
  requireAuth: true,
  displayName: '发送模板消息',
  description: '接口：https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Template_Message_Interface.html#%E5%8F%91%E9%80%81%E6%A8%A1%E6%9D%BF%E6%B6%88%E6%81%AF',
  props: {
    touser: Property.ShortText({
      displayName: '用户Openid',
      required: true,
    }),
    template_id: Property.ShortText({
      displayName: '模板ID',
      required: true,
    }),
    url: Property.ShortText({
      displayName: '跳转链接',
      required: false,
    }),
    data: Property.Array({
      displayName: '模板数据',
      required: true,
      properties: {
        keyword: Property.ShortText({
          displayName: '关键字',
          required: true,
        }),
        value: Property.ShortText({
          displayName: '绑定值',
          required: true,
        }),
      },
    }),
    miniprogram_appid: Property.ShortText({
      displayName: '小程序AppID',
      required: false,
      description: "若需跳转小程序，则需传该参数"
    }),
    miniprogram_pagepath: Property.ShortText({
      displayName: '小程序页面路径',
      required: false,
      description: "若需跳转小程序，则需传该参数"
    }),

    client_msg_id: Property.ShortText({
      displayName: '防重入id',
      required: false,
      description: "对于同一个openid + client_msg_id, 只发送一条消息,10分钟有效,超过10分钟不保证效果。若无防重入需求，可不填"
    })
  },
  async run({ propsValue, auth, store }) {
    const client = getWechatApi(auth, store)
    const { touser, template_id, url, data, miniprogram_appid, miniprogram_pagepath, client_msg_id } = propsValue
    const sendData = data.reduce((pre, cur) => {
      // @ts-expect-error Property 'keyword' 
      return Object.assign(pre, { [cur.keyword]: { value: cur.value } });
    }, {}) as Record<string, { value: string; }>
    const params = {
      touser,
      template_id,
      url,
      data: sendData,
      miniprogram: miniprogram_appid ? {
        appid: miniprogram_appid,
        pagepath: miniprogram_pagepath
      } : undefined,
      client_msg_id
    }
    const list = await client.userService.messageTemplateSend(params)
    return list
  },
});
