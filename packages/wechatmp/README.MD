# activepieces国内适配计划： 微信公众号支持

## 微信公众号
> 计划支持微信公众号大量接口能力，用于流程编排


[微信公众号](https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Access_Overview.html)






## 支持能力：
- [x] 向指定用户回复文本消息（被动回复）
- [x] 向指定用户发送模板消息
- [x] 获取用户列表
- [x] 获取指定标签下的用户列表
- [x] 获得当前的`accessToken`
- [x] 获取公众号已创建的标签
- [] 获取用户新增数据
- [] 获取用户累计数据
- [] 获取图文群发每日数据
- [] 获取图文群发总数据
- [] 获取图文统计数据
- [] 获取图文统计分时数据
- [] 获取图文分享转发数据
- [] 获取图文分享转发分时数据
- [] 获取用户基本信息
- [] 获取模板列表（隐藏）
- [] 查询标签（隐藏）
- [] 根据模板id获取模板内容（隐藏）
- [] 获取模板id（隐藏）
- [] 获取授权信息（调试使用）


# TODO： 微信消息发送与数据获取操作列表

## 向指定用户回复文本消息（被动回复）
- **action**: 向指定用户回复文本消息
- **参数**:
  - `touser`: 用户账号(OpenID)
  - `content`: 文本消息内容

## 向指定用户发送模板消息
- **action**: 向指定用户发送模板消息
- **参数**:
  - `touser`: 用户账号(OpenID)
  - `template_id`: 选择模板
  - `templatejumptype`: 选择跳转链接类型
  - `url`: 跳转链接
  - `appid`: 小程序appid
  - `pagepath`: 小程序跳转的具体页码路径
  - `template`: 模板内容
 

## 获取用户列表
- **action**: 获取用户列表
- **参数**:
  - `content`: 配置说明

## 获取指定标签下的用户列表
- **action**: 获取指定标签下的用户列表
- **参数**:
  - `tagid`: 选择要查询的标签

## 获取用户新增数据
- **action**: 获取用户新增数据
- **参数**:
  - `searchDateType`: 查询日期类型
  - `appointedDate`: 指定日期
  - `begin_date`: 选择开始日期
  - `end_date`: 选择结束日期
  - `helpText`: 帮助文本

## 获取用户累计数据
- **action**: 获取用户累计数据
- **参数**:
  - `searchDateType`: 查询日期类型
  - `appointedDate`: 指定日期
  - `begin_date`: 选择开始日期
  - `end_date`: 选择结束日期
  - `helpText`: 帮助文本

## 获取图文群发每日数据
- **action**: 获取图文群发每日数据
- **参数**:
  - `searchDateType`: 查询日期类型
  - `date`: 指定日期
  - `end_date`: 选择日期
  - `helpText`: 帮助文本

## 获取图文群发总数据
- **action**: 获取图文群发总数据
- **参数**:
  - `searchDateType`: 查询日期类型
  - `date`: 指定日期
  - `end_date`: 选择日期
  - `helpText`: 帮助文本

## 获取图文统计数据
- **action**: 获取图文统计数据
- **参数**:
  - `searchDateType`: 查询日期类型
  - `appointedDate`: 指定日期
  - `begin_date`: 选择开始日期
  - `end_date`: 选择结束日期
  - `helpText`: 帮助文本

## 获取图文统计分时数据
- **action**: 获取图文统计分时数据
- **参数**:
  - `searchDateType`: 查询日期类型
  - `date`: 指定日期
  - `end_date`: 选择日期
  - `helpText`: 帮助文本

## 获取图文分享转发数据
- **action**: 获取图文分享转发数据
- **参数**:
  - `searchDateType`: 查询日期类型
  - `appointedDate`: 指定日期
  - `begin_date`: 选择开始日期
  - `end_date`: 选择结束日期
  - `helpText`: 帮助文本

## 获取图文分享转发分时数据
- **action**: 获取图文分享转发分时数据
- **参数**:
  - `searchDateType`: 查询日期类型
  - `date`: 指定日期
  - `end_date`: 选择日期
  - `helpText`: 帮助文本

## 获取用户基本信息
- **action**: 获取用户基本信息
- **参数**:
  - `openid`: 用户openid

## 获取模板列表（隐藏）
- **action**: 获取模板列表（隐藏）

## 查询标签（隐藏）
- **action**: 查询标签（隐藏）

## 根据模板id获取模板内容（隐藏）
- **action**: 根据模板id获取模板内容（隐藏）
- **参数**:
  - `template_id`: 模板id

## 获取模板id（隐藏）
- **action**: 获取模板id（隐藏）

## 获取授权信息（调试使用）
- **action**: 获取授权信息（调试使用）