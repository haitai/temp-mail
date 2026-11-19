# temp-mail 修复小屏幕水平滚动条问题

**日期**: 2026-07-08
**提交**: 69a0e9d (已 push)

## 问题
小屏幕访问时，left-panel 和 right-panel 宽度超出 header，出现水平滚动条。

## 根因
CSS Grid 的 grid item 默认 `min-width: auto`，意味着它们不会收缩到内容固有宽度以下。当邮箱输入框、域名下拉框或长文本内容的固有宽度超过视口时，grid 列被撑开，导致溢出。

## 修复
给以下元素添加 `min-width: 0`:
- `.left-panel` — grid item
- `.right-panel` — grid item  
- `.email-input-group input` — flex item
- `.domain-select` — flex item

同时移除 `.email-input-group input` 的 `width: 50%`（与 `flex: 1` 冲突，且不需要固定宽度）。

`min-width: 0` 覆盖了默认的 `min-width: auto`，允许 grid/flex item 正常收缩。
