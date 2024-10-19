import {
  createAction,
  PieceAuth,
  Property,
  Validators,
} from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

import { wxpusherAuth } from '../..';

/**
 * 查询用户列表
 */
export const queryUserList = createAction({
  name: 'queryUserList',
  auth: wxpusherAuth,
  displayName: '查询用户列表',
  description: `
你可以通过本接口，分页查询到所有关注应用和关注主题的用户。
说明：获取到所有关注应用/主题的微信用户用户信息。需要注意，一个微信用户，如果同时关注应用，主题，甚至关注多个主题，会返回多条记录。`,
  props: {
    // page 请求数据的页码
    page: Property.Number({
      displayName: '页码',
      description: '请求数据的页码',
      defaultValue: 1,
      required: true,
    }),
    // pageSize 分页大小，不能超过100
    pageSize: Property.Number({
      displayName: '分页大小',
      description: '分页大小，不能超过100',
      defaultValue: 100,
      required: true,
    }),
    // uid 用户的uid，可选，如果不传就是查询所有用户，传uid就是查某个用户的信息。
    uid: Property.Number({
      displayName: '用户的uid',
      description:
        '用户的uid，可选，如果不传就是查询所有用户，传uid就是查某个用户的信息。',
      required: false,
    }),
    // isBlock 查询拉黑用户，可选，不传查询所有用户，true查询拉黑用户，false查询没有拉黑的用户
    isBlock: Property.Checkbox({
      displayName: '查询拉黑用户',
      description:
        '查询拉黑用户，可选，不传查询所有用户，true查询拉黑用户，false查询没有拉黑的用户',
      defaultValue: false,
      required: false,
    }),
    // type 关注的类型，可选，不传查询所有用户，0是应用，1是主题
    type: Property.StaticDropdown({
      displayName: '关注类型',
      description: '选择查询用户从哪个渠道关注',
      required: false,
      options: {
        options: [
          {
            label: '全部',
            value: '-1',
          },
          {
            label: '应用',
            value: '0',
          },
          {
            label: '主题',
            value: '1',
          },
        ],
      },
    }),
  },
  async run(configValue) {
    // 分发的
    const appToken = configValue.auth;
    const page = configValue.propsValue['page'];
    const pageSize = configValue.propsValue['pageSize'];
    const uid = configValue.propsValue['uid'];
    const isBlock = configValue.propsValue['isBlock'];
    const type = configValue.propsValue['type'];


    const TARGET_URL = 'https://wxpusher.zjiecode.com/api/fun/wxuser/v2';
    const queryParams:any = {
      appToken,
      page,
      pageSize,
      uid,
      isBlock,
    };

    if(type){
      queryParams.type =  Number(type) == -1 ? undefined : Number(type)
    }

    const topStoryIdsResponse = await httpClient.sendRequest<any>({
      method: HttpMethod.GET,
      url: TARGET_URL,
      queryParams
    });
    return topStoryIdsResponse;
  },
});
