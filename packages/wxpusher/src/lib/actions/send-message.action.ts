import { createAction, PieceAuth, Property, Validators } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { wxpusherAuth } from '../..';

/**
 * 发送消息
 */
export const sendTopicMessage = createAction({
  name: 'sendTopicMessage',
  auth: wxpusherAuth,
  displayName: '发送Topic消息',
  description: '根据Topic消息发送',
  props: {
    topicIds: Property.Array({
      displayName: '发送的TopicId',
      description:
        '从 ‘https://wxpusher.zjiecode.com/admin/main/topics/list’ 获得主题ID',
      required: false,
    }),
    uids: Property.Array({
      displayName: '用户ID列表',
      description:
        '发送目标的UID，是一个数组。注意uids和topicIds可以同时填写，也可以只填写一个。',
      required: false,
    }),
    contentType: Property.StaticDropdown({
      displayName: '内容类型',
      required: true,
      defaultValue:2, 
      options: {
        options: [
          {value:1,label:"文本渲染"},
          {value:2,label:"html渲染"},
          {value:3,label:"markdown渲染"},
        ]
      },
    }),
 
    content: Property.LongText({
      displayName: '发送文本',
      description: '发送的内容会出现在点击窗口打开后的网页中',
      required: true,
    }),
    link: Property.LongText({
      displayName: '外链',
      description: '点击后打开的外链',
      required: false,
    }),
    summary: Property.LongText({
      displayName: '消息摘要(20字以内)',
      description: '显示在微信聊天页面或者模版消息卡片上，限制长度20',
      required: false,
      validators: [Validators.maxLength(20)],
    }),
    verifyPayType: Property.StaticDropdown({
      displayName: '是否验证订阅时间',
      description: '显示在微信聊天页面或者模版消息卡片上，限制长度20',
      required: false,
      options: {
        options: [
          {value:0,label:"不校验"},
          {value:1,label:"只发送给付费用户"},
          {value:2,label:"只发送给未订阅或者订阅过期的用户"},
        ]
      },
    }),
 
  },
  
  async run(configValue) {
    // 分发的
    const appToken = configValue.auth;
    const TARGET_URL = 'https://wxpusher.zjiecode.com/api/send/message';
    const body = {
      appToken,
      content: configValue.propsValue['content'],
      summary: configValue.propsValue['summary'], //消息摘要，显示在微信聊天页面或者模版消息卡片上，限制长度100，可以不传，不传默认截取content前面的内容。
      contentType: configValue.propsValue.contentType,
      topicIds: configValue.propsValue.topicIds?.map(Number),
      uids: configValue.propsValue.uids,
      url: configValue.propsValue['link'], //原文链接，可选参数
      verifyPayType:configValue.propsValue.verifyPayType
    };
    const topStoryIdsResponse = await httpClient.sendRequest<any>({
      method: HttpMethod.POST,
      url: TARGET_URL,
      body,
    });
    return topStoryIdsResponse;
  },
});
