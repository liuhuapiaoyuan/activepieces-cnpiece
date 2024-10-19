
# activepieces-cnpiece 🎉

## 介绍 🌟
`activepieces-cnpiece` 是一套专为中国用户定制的流程组件，旨在与自动化流程工具 **ActivePieces** 无缝集成，提升工作效率。

## 已集成组件 ✅
- **微信通知**: 集成了 [wxpusher](https://wxpusher.zjiecode.com/) 进行实时消息推送  
  - 包含包: `@activepieces-cnpiece/wxpusher`

## 待办事项 📝
- [ ] **金山表单**: 集成金山表单 API，实现表单自动化处理
- [ ] **钉钉通知**: 集成钉钉通知服务，提供消息推送功能

## 安装 📦
使用 npm 安装：
```bash
npm install @activepieces-cnpiece/wxpusher
```

## 使用方法 🚀
```javascript
const wxpusher = require('@activepieces-cnpiece/wxpusher');

// 发送微信通知
wxpusher.sendNotification('Your message here');
```

## 贡献 🙌
欢迎提交 Issues 和 Pull Requests，以帮助我们改进 `activepieces-cnpiece`。

## 许可证 📄
本项目遵循 MIT 许可证，详细信息请参见 LICENSE 文件。
 