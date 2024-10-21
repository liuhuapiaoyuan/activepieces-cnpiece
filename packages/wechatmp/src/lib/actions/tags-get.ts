import { createAction, PieceAuth, Property, StoreScope, Validators } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { wxpusherAuth } from '../..';
import { getWechatClient } from '../utils';
 
/**
 * 获取公众号已创建的标签
 */
export const tagsGet = createAction({
  name: 'tagsGet',
  auth: wxpusherAuth,
  requireAuth: true,
  displayName: '获取公众号已创建的标签',
  description: '获取公众号已创建的标签',
  props: { },
  
  async run({  auth, store }) {
    const client = getWechatClient(auth, store)
    const list = await client.tagsGet()
    return list
  },
});
