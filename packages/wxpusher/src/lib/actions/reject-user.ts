import {
  createAction,
  Property,
} from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

import { wxpusherAuth } from '../..';

/**
 * 拉黑用户
 */
export const rejectUser = createAction({
  name: 'rejectUser',
  auth: wxpusherAuth,
  displayName: '拉黑用户',
  description: `
你可以通过本接口，可以拉黑用户
>说明：拉黑以后不能再发送消息，用户也不能再次关注，除非你取消对他的拉黑。调用拉黑接口，不用再调用删除接口。`,
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

    const TARGET_URL = 'https://wxpusher.zjiecode.com/api/fun/reject';
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
