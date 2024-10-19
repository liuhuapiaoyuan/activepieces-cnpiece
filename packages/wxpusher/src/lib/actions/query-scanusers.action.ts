import { createAction, PieceAuth, Property, Validators } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';


import { wxpusherAuth } from '../..';

/**
 * 发送消息
 */
export const queryScanUsers = createAction({
  name: 'queryScanUsers',
  auth: wxpusherAuth,
  displayName: '查询扫码用户',
  description: '查询扫描过二维码的用户列表',
  props: {
    code: Property.ShortText({
      displayName: '二维码代码',
      description:
        '二维码代码',
      required: true,
    })
  },
  async run(configValue) {
    // 分发的
    const appToken = configValue.auth;
    const code = configValue.propsValue['code'];
    const TARGET_URL = 'https://wxpusher.zjiecode.com/api/fun/scan-qrcode-uid';
    const body = { };
    const topStoryIdsResponse = await httpClient.sendRequest<any>({
      method: HttpMethod.GET,
      url: TARGET_URL,
      body,
      queryParams: { code, appToken },
    });
    return topStoryIdsResponse;
  },
});
