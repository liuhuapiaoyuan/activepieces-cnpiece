import {
  createAction,
  PieceAuth,
  Property,
  Validators,
} from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

import { wxpusherAuth } from '../..';

/**
 * 删除用户
 */
export const removeUser = createAction({
  name: 'removeUser',
  auth: wxpusherAuth,
  displayName: '删除用户',
  description: `
你可以通过本接口，删除用户对应用，主题的关注。
>说明：你可以删除用户对应用、主题的关注，删除以后，用户可以重新关注，如不想让用户再次关注，可以调用拉黑接口，对用户拉黑。`,
  props: { 
    uids: Property.Array({
      displayName: '用户的uid',
      description:
        '用户的uid，可选，如果不传就是查询所有用户，传uid就是查某个用户的信息。',
      required: true,
    }),
  },
  async run(configValue) {
    // 分发的
    const appToken = configValue.auth;
    const uids = configValue.propsValue.uids;

    const TARGET_URL = 'https://wxpusher.zjiecode.com/api/fun/remove';
    const topStoryIdsResponse = await Promise.all(uids.map(uid=>{
      return httpClient.sendRequest<any>({
        method: HttpMethod.DELETE,
        url: TARGET_URL,
        queryParams:{
          appToken,
          id: uid as string,
        }
      })
    }))
    return topStoryIdsResponse;
  },
});
