# 调试模式使用指南

## 概述

Temp Mail Worker 现在支持可配置的调试模式，允许你控制日志的详细程度，帮助开发和故障排除。

## 日志级别

应用支持三个日志级别：

- **ERROR**: 仅记录错误信息
- **INFO**: 记录错误和一般信息（默认）
- **DEBUG**: 记录所有信息，包括详细的调试信息

## 配置方法

### 本地开发环境

#### 方法 1: 修改 wrangler.jsonc

编辑 `wrangler.jsonc` 文件中的 `vars` 部分：

```jsonc
"vars": {
  "TELEGRAM_LOG_ENABLE": true,
  "HOURS_TO_DELETE_D1": 3,
  "DEBUG_MODE": true,        // 启用调试模式
  "LOG_LEVEL": "DEBUG"       // 设置日志级别为 DEBUG
}
```

#### 方法 2: 使用 .dev.vars 文件

在项目根目录创建或编辑 `.dev.vars` 文件：

```
DEBUG_MODE=true
LOG_LEVEL=DEBUG
```

> **注意**: `.dev.vars` 文件的配置优先级高于 `wrangler.jsonc`

### 生产环境

对于生产环境，建议通过 Cloudflare Dashboard 或 wrangler CLI 设置环境变量：

#### 使用 wrangler CLI

```bash
# 设置调试模式
bun wrangler secret put DEBUG_MODE
# 输入: true

# 设置日志级别
bun wrangler secret put LOG_LEVEL
# 输入: DEBUG
```

#### 使用 Cloudflare Dashboard

1. 登录 Cloudflare Dashboard
2. 进入 Workers & Pages
3. 选择你的 Worker
4. 进入 Settings → Variables
5. 添加环境变量：
   - `DEBUG_MODE`: `true` 或 `false`
   - `LOG_LEVEL`: `ERROR`, `INFO`, 或 `DEBUG`

## 调试日志示例

启用调试模式后，你将看到类似以下的详细日志：

```json
{
  "timestamp": "2025-11-21T07:00:00.000Z",
  "level": "DEBUG",
  "message": "Request received",
  "method": "GET",
  "url": "https://api.example.com/emails/test@example.com",
  "path": "/emails/test@example.com"
}
```

```json
{
  "timestamp": "2025-11-21T07:00:01.000Z",
  "level": "DEBUG",
  "message": "Email processing started",
  "from": "sender@example.com",
  "to": "recipient@example.com",
  "subject": "Test Email"
}
```

## 查看日志

### 本地开发

运行 `bun run dev` 时，日志会直接输出到终端。

### 生产环境

使用 wrangler tail 命令实时查看生产环境日志：

```bash
bun run tail
```

或者在 Cloudflare Dashboard 中查看：
1. 进入你的 Worker
2. 点击 "Logs" 标签
3. 选择 "Real-time Logs"

## 性能考虑

- **DEBUG 模式会产生大量日志**，可能影响性能和增加日志存储成本
- 建议仅在开发环境或故障排除时启用 DEBUG 级别
- 生产环境建议使用 INFO 或 ERROR 级别

## 最佳实践

1. **开发阶段**: 使用 `DEBUG` 级别了解应用行为
2. **测试阶段**: 使用 `INFO` 级别验证关键流程
3. **生产环境**: 使用 `INFO` 或 `ERROR` 级别，仅在需要时临时启用 `DEBUG`
4. **故障排除**: 临时启用 `DEBUG` 模式，问题解决后立即关闭

## 禁用调试模式

### 本地开发

在 `wrangler.jsonc` 中设置：

```jsonc
"vars": {
  "DEBUG_MODE": false,
  "LOG_LEVEL": "INFO"
}
```

或在 `.dev.vars` 中设置：

```
DEBUG_MODE=false
LOG_LEVEL=INFO
```

### 生产环境

```bash
bun wrangler secret put DEBUG_MODE
# 输入: false

bun wrangler secret put LOG_LEVEL
# 输入: INFO
```

## 故障排除

### 日志没有输出

1. 确认 `DEBUG_MODE` 已设置为 `true`
2. 确认 `LOG_LEVEL` 设置正确
3. 检查是否有语法错误导致 worker 无法启动

### 日志太多

降低日志级别：
- 从 `DEBUG` 改为 `INFO`
- 从 `INFO` 改为 `ERROR`

### 无法在生产环境看到日志

确保已通过 `wrangler secret` 或 Cloudflare Dashboard 正确设置环境变量。
