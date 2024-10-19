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
    topicId: Property.Number({
      displayName: '发送的TopicId',
      description:
        '从 ‘https://wxpusher.zjiecode.com/admin/main/topics/list’ 获得主题ID',
      required: true,
    }),
    link: Property.LongText({
      displayName: '外链',
      description: '点击后打开的外链',
      required: true,
    }),
    summary: Property.LongText({
      displayName: '发送简要(100字以内)',
      description: '简要信息会出现在推送的聊天窗口内',
      required: true,
      validators: [Validators.maxLength(100)],
    }),
    content: Property.LongText({
      displayName: '发送文本',
      description: '发送的内容会出现在点击窗口打开后的网页中',
      required: true,
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
      contentType: 1, //内容类型 1表示文字  2表示html(只发送body标签内部的数据即可，不包括body标签) 3表示markdown
      topicIds: [
        //发送目标的topicId，是一个数组！！！，也就是群发，使用uids单发的时候， 可以不传。
        Number(configValue.propsValue['topicId']),
      ],
      url: configValue.propsValue['link'], //原文链接，可选参数
      verifyPay: false, //是否验证订阅时间，true表示只推送给付费订阅用户，false表示推送的时候，不验证付费，不验证用户订阅到期时间，用户订阅过期了，也能收到。
    };
    const topStoryIdsResponse = await httpClient.sendRequest<any>({
      method: HttpMethod.POST,
      url: TARGET_URL,
      body,
    });
    return topStoryIdsResponse;
  },
});
