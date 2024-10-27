import { createAction, PieceAuth, Property, StoreScope, Validators } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { wxpusherAuth } from '../..';
import { getWechatApi } from '../utils';
/**
 * accessToken
 */
export const accessToken = createAction({
  name: 'accessToken',
  auth: wxpusherAuth,
  requireAuth: true,
  displayName: '获得AccessToken',
  description: '获得AccessToken',
  props: {
    forceRefresh: Property.Checkbox({
      displayName: '强制刷新',
      description: '强制刷新模式，会导致上次获取的 access_token 失效，并返回新的 access_token',
      defaultValue: false,
      required: false
    })
   },
  async run({ auth, store }) {
    const client = getWechatApi(auth,store)
    return client.getAccessToken()
  },
});
