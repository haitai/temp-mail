# temp-mail 保存邮件按钮 UX 改进

**日期**: 2026-07-08
**提交**: 2ad66be (已 push 到 origin/main)

## 目标
根据用户反馈改进邮件详情弹窗中保存按钮的三个方面。

## 修改内容

### 1. 图标：保存 → 下载
- 原来：软盘图标（保存语义）
- 改为：向下箭头 + 底线（下载语义）
- SVG path: `M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4` + polyline `7 10 12 15 17 10` + line `12,15 → 12,3`
- title 属性从"保存邮件"改为"下载邮件"

### 2. 位置：居中 → 紧靠关闭按钮
- 新增 `.modal-header-actions` 容器，包裹保存按钮和关闭按钮
- CSS: `display: flex; align-items: center; gap: 4px; flex-shrink: 0`
- `.modal-header h3` 增加 `flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap` 确保标题占满左侧空间
- 移除 `.save-btn` 的 `margin-right: 8px`（改用 gap 控制间距）
- 两处 HTML 模板（桌面版和移动版）同步修改

### 3. 通知时机：点击即提示 → 下载触发后提示
- 原来在 `a.click()` 后同步调用 `showNotification`
- 改为 `setTimeout(function() { showNotification(...); }, 100)` 延迟 100ms
- 确保浏览器下载对话框已出现后才显示"邮件已保存"提示

## 技术细节
- 文件 `src/routes/staticRoutes.ts` 中的 HTML 在 TS 模板字符串内，用 tab 缩进
- PowerShell 脚本处理中文字符串时需用 Unicode 转义（`[char]0x90AE` 等）避免编码问题
- TypeScript 编译验证通过（`tsc --noEmit` BUILD SUCCESS）

## 关联
- 同时包含上一个 commit cc4af79 的修复：模板字符串中 `\r\n` 转义为 `\\r\\n`
