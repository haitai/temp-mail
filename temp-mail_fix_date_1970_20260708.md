# temp-mail 修复 EML 日期为 1970 的问题

**日期**: 2026-07-08
**提交**: bc9e1ba (本地，待 push)

## 问题
下载的 .eml 文件名中日期显示为 `1970-01-21`，EML 头部的 Date 字段也是 1970 年。

## 根因
`received_at` 字段是 **Unix epoch 秒级时间戳**（数字，如 `1753317948`），定义在 `src/schemas/emails/index.ts`:
```ts
received_at: z.number().openapi({
  description: "The timestamp when the email was received (Unix epoch).",
  example: 1753317948,
})
```

但 `saveEmailAsEml` 中直接用 `new Date(email.received_at)` 解析，JavaScript 的 `Date` 构造函数把数字当作**毫秒**级时间戳。`1753317948` 毫秒 ≈ 1970-01-21。

项目中的 `formatTime` 函数已有秒/毫秒判断逻辑（`timestamp < 1e12 ? timestamp * 1000 : timestamp`），但 `saveEmailAsEml` 没复用它。

## 修复
在 `src/routes/staticRoutes.ts` 的 `saveEmailAsEml` 函数中，两处 `new Date(email.received_at)` 改为 `new Date(email.received_at * 1000)`:
1. EML 头部 Date 字段: `new Date(email.received_at * 1000).toUTCString()`
2. 文件名日期: `new Date(email.received_at * 1000).toISOString().slice(0, 10)`

修复后日期将正确显示为 `2025-07-23` 等实际日期。
