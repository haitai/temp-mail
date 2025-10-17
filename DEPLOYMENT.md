# 🚀 Cloudflare 部署指南

## 前置条件

1. **Cloudflare账户**: 确保你有Cloudflare账户
2. **Wrangler CLI**: 已安装并配置
3. **项目依赖**: 确保所有依赖已安装

## 部署步骤

### 1. 登录Cloudflare

```bash
wrangler login
```

### 2. 创建必要资源

#### 创建D1数据库
```bash
npm run db:create
```

#### 创建KV存储
```bash
npm run kv:create
```

#### 创建R2存储桶
```bash
npm run r2:create
npm run r2:create-preview
```

### 3. 初始化数据库

```bash
# 创建表结构
npm run db:tables

# 创建索引
npm run db:indexes
```

### 4. 部署应用

```bash
# 部署到生产环境
npm run deploy
```

### 5. 验证部署

部署完成后，你会得到一个类似这样的URL：
```
https://temp-mail.your-subdomain.workers.dev
```

## 配置说明

### 环境变量
- `TELEGRAM_LOG_ENABLE`: 启用Telegram日志
- `HOURS_TO_DELETE_D1`: 数据删除时间（小时）

### 定时任务
- `0 */4 * * *`: 每4小时执行
- `0 */5 * * *`: 每5小时执行

### 资源绑定
- **D1数据库**: 存储邮件数据
- **KV存储**: 缓存和临时数据
- **R2存储**: 存储邮件附件

## 故障排除

### 常见问题

1. **构建失败**: 检查依赖是否正确安装
2. **数据库连接失败**: 确保D1数据库已创建
3. **KV访问失败**: 检查KV命名空间配置
4. **R2上传失败**: 验证R2存储桶权限

### 调试命令

```bash
# 查看日志
npm run tail

# 本地开发
npm run dev

# 类型检查
npm run tsc
```

## 监控和维护

1. **查看应用日志**: 使用 `wrangler tail`
2. **监控性能**: 在Cloudflare Dashboard查看
3. **数据库管理**: 使用D1控制台管理数据
4. **存储管理**: 通过R2控制台管理附件

## 自定义域名

如需使用自定义域名：

1. 在Cloudflare Dashboard添加域名
2. 配置DNS记录
3. 更新 `wrangler.jsonc` 中的路由配置

## 安全建议

1. **环境变量**: 使用 `wrangler secret` 存储敏感信息
2. **访问控制**: 配置适当的CORS策略
3. **数据清理**: 定期清理过期数据
4. **监控**: 设置告警和监控

## 更新部署

```bash
# 重新部署
npm run deploy

# 查看部署状态
wrangler deployments list
```

## 回滚

如需回滚到之前的版本：

```bash
wrangler rollback
```
