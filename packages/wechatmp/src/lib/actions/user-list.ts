import { createAction, PieceAuth, Property, StoreScope, Validators } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { wxpusherAuth } from '../..';
import { getWechatClient } from '../utils';
 
/**
 * 获得用户列表
 */
export const userList = createAction({
  name: 'userList',
  auth: wxpusherAuth,
  requireAuth: true,
  displayName: '获取关注用户列表',
  description: '获取关注用户列表',
  props: {
    nextOpenid: Property.ShortText({
      displayName: '上一个openid',
      description: "上一批列表的最后一个OPENID，不填默认从头开始拉取",
      required: false,
    }),
  },
  
  async run({ propsValue, auth, store }) {
    const client = getWechatClient(auth, store)
    const list = await client.userGet(propsValue.nextOpenid)
    return list
  },
});
