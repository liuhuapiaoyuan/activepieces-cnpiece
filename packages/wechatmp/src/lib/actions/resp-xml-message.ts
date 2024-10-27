import { createAction, PieceAuth, Property, Validators } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { wxpusherAuth } from '../..';
import {} from 'wechatmp-kit'
import { getWechatMessage } from '../utils';
 

/**
 * 发送消息
 */
export const respXMLMessage = createAction({
  name: 'respXMLMessage',
  auth: wxpusherAuth,
  requireAuth: true,
  displayName: '微信响应消息',
  description: '按照微信的规范响应消息',
  props: { 
    FromUserName: Property.ShortText({
      displayName: 'FromUserName',
      required: true,
    }),
    ToUserName: Property.ShortText({
      displayName: 'ToUserName',
      required: true,
    }),
    Content: Property.LongText({
      displayName: '消息内容',
      required: true,
    }),
    MsgType: Property.StaticDropdown({
      displayName: '消息类型',
      required: true,
      options: {
        placeholder: "选择消息类型",
        options: [
          { label:"文本" , value:"text" } ,
          { label:"图片" , value:"image" } ,
        ]
      }
    }),
    fields:Property.Array({
      displayName: '扩展字段',
      description: "注意按照微信要求填写，无效的字段会导致消息失败",
      required: false,
      properties:{
        key: Property.ShortText({
          displayName: '字段名',
          required: true,
        }),
        value: Property.ShortText({
          displayName: '字段值',
          required: true,
        }),
      }
    })
  },
  async run(context) {  
    const { FromUserName, ToUserName, MsgType, fields, Content } = context.propsValue;
    const fieldData:Record<string,string> = (fields as Array<{key:string,value:string}>).reduce((acc, cur) => {
      acc[cur.key] = cur.value;
      return acc;
    }, {} as Record<string,string>);
    const data = {
      ToUserName,
      FromUserName,
      MsgType,
      Content,
      CreateTime:`${Math.floor(Date.now() / 1000)}` , 
      ...fieldData
    }
    const wechatMessage = getWechatMessage(context.auth,context.store)
    const response =  {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
      body:wechatMessage.renderMessage(data),
    } 
    context.run.stop({response});
    const list =await context.flows.list() 

    return [list.data]
  },
});
