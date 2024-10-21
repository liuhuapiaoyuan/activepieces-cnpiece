import { createAction, PieceAuth, Property, Validators } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { wxpusherAuth } from '../..';

/**
 * 发送消息
 */
export const respMessage = createAction({
  name: 'respMessage',
  auth: wxpusherAuth,
  displayName: '微信响应消息',
  description: '按照微信的规范响应消息',
  props: {
    content: Property.LongText({
      displayName: '响应消息(xml)',
      description:"注意数据格式必须是xml格式",
      required: false,
    }), 
  },
  
  async run(configValue) { 
    return new Response(
      configValue.propsValue.content,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/xml',
        },
      }
    );
  },
});
