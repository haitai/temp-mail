import { Hono } from "hono";

const staticRoutes = new Hono<{ Bindings: CloudflareBindings }>();

// Favicon 路由
staticRoutes.get("/favicon.svg", async (c) => {
	const favicon = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="16" cy="16" r="16" fill="#4A5568"/>
		<path d="M8 12L16 18L24 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		<rect x="8" y="10" width="16" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
		<circle cx="20" cy="14" r="1.5" fill="white" opacity="0.8"/>
	</svg>`;
	return c.text(favicon, 200, { "Content-Type": "image/svg+xml; charset=utf-8" });
});

staticRoutes.get("/favicon-16.svg", async (c) => {
	const favicon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="8" cy="8" r="8" fill="#4A5568"/>
		<path d="M4 6L8 9L12 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		<rect x="4" y="5" width="8" height="6" rx="1" stroke="white" stroke-width="1.5" fill="none"/>
		<circle cx="10" cy="7" r="0.8" fill="white" opacity="0.8"/>
	</svg>`;
	return c.text(favicon, 200, { "Content-Type": "image/svg+xml; charset=utf-8" });
});

staticRoutes.get("/favicon-48.svg", async (c) => {
	const favicon = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="24" cy="24" r="24" fill="#4A5568"/>
		<path d="M12 18L24 27L36 18" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
		<rect x="12" y="15" width="24" height="18" rx="3" stroke="white" stroke-width="3" fill="none"/>
		<circle cx="30" cy="21" r="2" fill="white" opacity="0.8"/>
		<path d="M18 24L24 28L30 24" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
	</svg>`;
	return c.text(favicon, 200, { "Content-Type": "image/svg+xml; charset=utf-8" });
});

staticRoutes.get("/apple-touch-icon.svg", async (c) => {
	const favicon = `<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" style="stop-color:#2D3748;stop-opacity:1" />
				<stop offset="100%" style="stop-color:#4A5568;stop-opacity:1" />
			</linearGradient>
		</defs>
		<circle cx="90" cy="90" r="90" fill="url(#gradient)"/>
		<path d="M45 67.5L90 101.25L135 67.5" stroke="white" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
		<rect x="45" y="56.25" width="90" height="67.5" rx="11" stroke="white" stroke-width="11" fill="none"/>
		<circle cx="112.5" cy="78.75" r="7.5" fill="white" opacity="0.8"/>
		<path d="M67.5 90L90 101.25L112.5 90" stroke="white" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
	</svg>`;
	return c.text(favicon, 200, { "Content-Type": "image/svg+xml; charset=utf-8" });
});

// 静态文件服务 - 直接返回文件内容
staticRoutes.get("/static/style.css", async (c) => {
	const css = `
/* CSS 变量 - 主题系统 */
:root {
	/* 浅色主题 */
	--bg-primary: #f5f5f5;
	--bg-secondary: #ffffff;
	--bg-tertiary: #f8f9fa;
	--bg-hover: #e9ecef;
	--text-primary: #333;
	--text-secondary: #666;
	--text-tertiary: #999;
	--border-color: #e1e5e9;
	--border-hover: #718096;
	--shadow-sm: rgba(0, 0, 0, 0.1);
	--shadow-md: rgba(0, 0, 0, 0.15);
	--shadow-lg: rgba(0, 0, 0, 0.3);
	--modal-overlay: rgba(0, 0, 0, 0.5);
	--input-bg: #f8f9fa;
	--scrollbar-track: #f1f1f1;
	--scrollbar-thumb: #c1c1c1;
	--scrollbar-thumb-hover: #a8a8a8;
}

[data-theme="dark"] {
	/* 深色主题 */
	--bg-primary: #1a1a1a;
	--bg-secondary: #2d2d2d;
	--bg-tertiary: #3a3a3a;
	--bg-hover: #404040;
	--text-primary: #e0e0e0;
	--text-secondary: #b0b0b0;
	--text-tertiary: #808080;
	--border-color: #404040;
	--border-hover: #718096;
	--shadow-sm: rgba(0, 0, 0, 0.3);
	--shadow-md: rgba(0, 0, 0, 0.4);
	--shadow-lg: rgba(0, 0, 0, 0.6);
	--modal-overlay: rgba(0, 0, 0, 0.7);
	--input-bg: #3a3a3a;
	--scrollbar-track: #2d2d2d;
	--scrollbar-thumb: #555;
	--scrollbar-thumb-hover: #666;
}

/* 基础样式重置 */
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	line-height: 1.6;
	color: var(--text-primary);
	background-color: var(--bg-primary);
	transition: background-color 0.3s ease, color 0.3s ease;
}

.container {
	max-width: 1400px;
	margin: 0 auto;
	padding: 20px;
}

/* 头部样式 */
.header {
	text-align: center;
	margin-bottom: 30px;
	padding: 20px;
	background: var(--bg-secondary);
	border-radius: 10px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header h1 {
	font-size: 2.5rem;
	margin-bottom: 10px;
	font-weight: 700;
}

.header p {
	font-size: 1.1rem;
	opacity: 0.9;
}

/* 主内容区域 */
.main-content {
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: 30px;
	min-height: 600px;
}

/* 左侧面板 */
.left-panel {
	background: var(--bg-secondary);
	border-radius: 10px;
	padding: 30px;
	box-shadow: 0 2px 10px var(--shadow-sm);
	height: fit-content;
	transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.email-generator h2 {
	margin-bottom: 20px;
	color: var(--text-primary);
	font-size: 1.5rem;
}

.email-display {
	margin-bottom: 20px;
}

.email-input-group {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 10px;
	padding: 12px;
	border: 2px solid var(--border-color);
	border-radius: 6px;
	background-color: var(--input-bg);
	transition: border-color 0.3s ease, background-color 0.3s ease;
}

.email-input-group:focus-within {
	border-color: var(--border-hover);
}

.email-input-group input {
	flex: 1;
	border: none;
	background: transparent;
	font-size: 1rem;
	outline: none;
	color: var(--text-primary);
	width: 50%;
}

.email-separator {
	font-weight: 600;
	color: #718096;
	font-size: 1.1rem;
}

.domain-select {
	flex: 1;
	border: none;
	background: transparent;
	font-size: 1rem;
	outline: none;
	color: var(--text-primary);
	cursor: pointer;
}
.domain-select option {
	background-color: var(--bg-secondary);
}
.email-display input[readonly] {
	width: 100%;
	padding: 12px;
	border: 2px solid var(--border-color);
	border-radius: 6px;
	font-size: 1rem;
	margin-bottom: 10px;
	background-color: var(--input-bg);
	color: var(--text-primary);
	transition: border-color 0.3s ease, background-color 0.3s ease;
}

.email-display input[readonly]:focus {
	outline: none;
	border-color: var(--border-hover);
}

.email-input-with-copy {
	position: relative;
	display: flex;
	align-items: center;
}

.email-input-with-copy input {
	flex: 1;
	padding-right: 40px;
}

.copy-btn {
	position: absolute;
	right: 8px;
	top: 40%;
	transform: translateY(-50%);
	background: var(--input-bg);
	border: none;
	cursor: pointer;
	padding: 4px;
	border-radius: 4px;
	color: var(--text-secondary);
	transition: all 0.2s ease;
	display: flex;
	align-items: center;
	justify-content: center;
}

.copy-btn:hover {
	background-color: var(--bg-hover);
	color: var(--text-primary);
}

.copy-btn:active {
	background-color: var(--bg-tertiary);
}

.email-url-display {
	margin-top: 10px;
}

.email-url-display label {
	display: block;
	margin-bottom: 5px;
	font-weight: 500;
	color: var(--text-primary);
}

.url-input-with-copy {
	position: relative;
	display: flex;
	align-items: center;
}

.url-input-with-copy input {
	width: 100%;
	padding: 8px 40px 8px 12px;
	border: 1px solid var(--border-color);
	border-radius: 4px;
	font-size: 14px;
	background-color: var(--input-bg);
	color: var(--text-secondary);
	transition: border-color 0.3s ease, background-color 0.3s ease;
}

.email-actions-row {
	display: flex;
	gap: 10px;
	margin-bottom: 10px;
}

.email-actions {
	display: flex;
	gap: 10px;
	margin-bottom: 20px;
}

.email-info {
	background-color: var(--bg-tertiary);
	padding: 15px;
	border-radius: 6px;
	border-left: 4px solid #718096;
	transition: background-color 0.3s ease;
}

.email-info p {
	margin-bottom: 5px;
	font-size: 0.9rem;
	color: var(--text-secondary);
}

/* 右侧面板 */
.right-panel {
	background: var(--bg-secondary);
	border-radius: 10px;
	padding: 30px;
	box-shadow: 0 2px 10px var(--shadow-sm);
	display: flex;
	flex-direction: column;
	transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.inbox-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	padding-bottom: 15px;
	border-bottom: 2px solid var(--border-color);
	transition: border-color 0.3s ease;
}

.inbox-header h2 {
	color: var(--text-primary);
	font-size: 1.5rem;
}

.inbox-controls {
	display: flex;
	align-items: center;
	gap: 15px;
}

.email-count {
	background-color: #718096;
	color: white;
	padding: 5px 12px;
	border-radius: 20px;
	font-size: 0.8rem;
	font-weight: 500;
}

.auto-refresh-status {
	background-color: #28a745;
	color: white;
	padding: 5px 12px;
	border-radius: 20px;
	font-size: 0.8rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	gap: 5px;
}

.refresh-indicator {
	width: 8px;
	height: 8px;
	background-color: #fff;
	border-radius: 50%;
	animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
	0% { opacity: 1; }
	50% { opacity: 0.5; }
	100% { opacity: 1; }
}

.inbox-content {
	flex: 1;
	overflow-y: auto;
}

.inbox-empty {
	text-align: center;
	padding: 60px 20px;
	color: var(--text-secondary);
}

.inbox-empty p {
	font-size: 1.1rem;
}

/* 邮件列表 */
.inbox-list {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.email-item {
	background-color: var(--bg-tertiary);
	border: 1px solid var(--border-color);
	border-radius: 8px;
	padding: 15px;
	cursor: pointer;
	transition: all 0.2s ease;
}

.email-item:hover {
	background-color: var(--bg-hover);
	border-color: var(--border-hover);
	transform: translateY(-1px);
	box-shadow: 0 2px 8px var(--shadow-sm);
}

.email-item.unread {
	background-color: #e3f2fd;
	border-color: #2196f3;
}

.email-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 8px;
}

.email-subject {
	font-weight: 600;
	color: var(--text-primary);
	font-size: 1rem;
}

.email-time {
	font-size: 0.8rem;
	color: var(--text-secondary);
	white-space: nowrap;
}

.email-from {
	color: #718096;
	font-size: 0.9rem;
	margin-bottom: 5px;
}

.email-preview {
	color: var(--text-secondary);
	font-size: 0.9rem;
	line-height: 1.4;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.email-attachments {
	margin-top: 8px;
}

.attachment-badge {
	display: inline-block;
	background-color: #ff9800;
	color: white;
	padding: 2px 8px;
	border-radius: 12px;
	font-size: 0.7rem;
	margin-right: 5px;
}

/* 按钮样式 */
.btn {
	padding: 10px 20px;
	border: none;
	border-radius: 6px;
	font-size: 0.9rem;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;
	text-decoration: none;
	display: inline-block;
	text-align: center;
}

.btn:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

.btn-primary {
	background-color: #4A5568;
	color: white;
}

.btn-primary:hover:not(:disabled) {
	background-color: #2D3748;
	transform: translateY(-1px);
}

.btn-secondary {
	background-color: #6c757d;
	color: white;
}

.btn-secondary:hover:not(:disabled) {
	background-color: #5a6268;
	transform: translateY(-1px);
}

.btn-danger {
	background-color: #dc3545;
	color: white;
	padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
}

.btn-danger:hover:not(:disabled) {
	background-color: #c82333;
	transform: translateY(-1px);
}

/* 模态框样式 */
.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: var(--modal-overlay);
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.3s ease;
}

.modal-content {
	background: var(--bg-secondary);
	border-radius: 10px;
	width: 90%;
	max-width: 800px;
	max-height: 90vh;
	overflow: hidden;
	box-shadow: 0 10px 30px var(--shadow-lg);
	transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	background-color: var(--bg-tertiary);
	border-bottom: 1px solid var(--border-color);
	transition: background-color 0.3s ease, border-color 0.3s ease;
}

.modal-header h3 {
	margin: 0;
	color: var(--text-primary);
}

.close-btn {
	background: none;
	border: none;
	font-size: 1.5rem;
	cursor: pointer;
	color: var(--text-secondary);
	padding: 0;
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: color 0.2s ease;
}

.save-btn {
	background: none;
	border: none;
	cursor: pointer;
	padding: 4px;
	margin-right: 8px;
	color: var(--text-secondary);
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	transition: all 0.2s ease;
}

.save-btn:hover {
	color: var(--text-primary);
	background-color: var(--bg-hover);
}

.close-btn:hover {
	color: var(--text-primary);
}

.modal-body {
	padding: 20px;
	max-height: 60vh;
	overflow-y: auto;
}

.email-details {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.email-meta {
	background-color: var(--bg-tertiary);
	padding: 15px;
	border-radius: 6px;
	transition: background-color 0.3s ease;
}

.email-meta p {
	margin-bottom: 8px;
}

.email-content {
	border: 1px solid var(--border-color);
	border-radius: 6px;
	padding: 20px;
	background-color: var(--bg-secondary);
	transition: background-color 0.3s ease, border-color 0.3s ease;
}

/* 刷新图标按钮样式 */
.refresh-icon-btn {
	background: none;
	border: none;
	cursor: pointer;
	padding: 4px;
	border-radius: 4px;
	color: #666;
	transition: all 0.2s ease;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin-left: 8px;
	vertical-align: middle;
}

.refresh-icon-btn:hover {
	background-color: #f0f0f0;
	color: #333;
}

.refresh-icon-btn:active {
	background-color: #e0e0e0;
}

.refresh-icon-btn:disabled {
	cursor: not-allowed;
	opacity: 0.5;
}

.refresh-icon-btn:disabled:hover {
	background-color: transparent;
	color: #666;
}

/* 旋转动画 */
.refresh-icon-btn.rotating svg {
	animation: rotate 1s linear infinite !important;
	transform-origin: center !important;
}

.refresh-icon-btn.rotating {
	pointer-events: none;
}

@keyframes rotate {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

/* 响应式设计 */
@media (max-width: 768px) {
	.main-content {
		grid-template-columns: 1fr;
		gap: 20px;
	}
	
	.container {
		padding: 10px;
	}
	
	.header h1 {
		font-size: 2rem;
	}
	
	.left-panel,
	.right-panel {
		padding: 20px;
	}
	
	.email-actions {
		flex-direction: column;
	}
	
	.email-actions-row {
		flex-direction: column;
	}
	
	.inbox-controls {
		flex-direction: column;
		gap: 10px;
		align-items: stretch;
	}
	
	.modal-content {
		width: 95%;
		margin: 10px;
	}
}

/* 加载动画 */
.loading {
	display: inline-block;
	width: 20px;
	height: 20px;
	border: 3px solid #f3f3f3;
	border-top: 3px solid #718096;
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}

/* 滚动条样式 */
.inbox-content::-webkit-scrollbar,
.modal-body::-webkit-scrollbar {
	width: 6px;
}

.inbox-content::-webkit-scrollbar-track,
.modal-body::-webkit-scrollbar-track {
	background: var(--scrollbar-track);
	border-radius: 3px;
}

.inbox-content::-webkit-scrollbar-thumb,
.modal-body::-webkit-scrollbar-thumb {
	background: var(--scrollbar-thumb);
	border-radius: 3px;
}

.inbox-content::-webkit-scrollbar-thumb:hover,
.modal-body::-webkit-scrollbar-thumb:hover {
	background: var(--scrollbar-thumb-hover);
}

/* 主题切换按钮 */
.theme-toggle {
	position: fixed;
	bottom: 20px;
	right: 20px;
	width: 56px;
	height: 56px;
	border-radius: 50%;
	background: var(--bg-secondary);
	border: 2px solid var(--border-color);
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4px 12px var(--shadow-md);
	transition: all 0.3s ease;
	z-index: 999;
	font-size: 24px;
}

.theme-toggle:hover {
	transform: scale(1.1);
	box-shadow: 0 6px 16px var(--shadow-md);
}

.theme-toggle:active {
	transform: scale(0.95);
}
	`;

	return c.text(css, 200, {
		"Content-Type": "text/css; charset=utf-8"
	});
});

staticRoutes.get("/static/script.js", async (c) => {
	const js = `
// 全局变量
let currentEmail = '';
let refreshInterval = null;
let domains = [];

// 主题管理
function initTheme() {
	const savedTheme = localStorage.getItem('theme') || 'light';
	document.documentElement.setAttribute('data-theme', savedTheme);
	updateThemeIcon(savedTheme);
}

function toggleTheme() {
	const currentTheme = document.documentElement.getAttribute('data-theme');
	const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
	document.documentElement.setAttribute('data-theme', newTheme);
	localStorage.setItem('theme', newTheme);
	updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
	const themeToggle = document.getElementById('themeToggle');
	if (themeToggle) {
		themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
		themeToggle.setAttribute('aria-label', theme === 'dark' ? '切换到浅色模式' : '切换到深色模式');
	}
}

// DOM 元素
const emailPrefixInput = document.getElementById('emailPrefix');
const emailDomainSelect = document.getElementById('emailDomain');
const emailInput = document.getElementById('emailAddress');
const emailUrlInput = document.getElementById('emailUrl');
const generateBtn = document.getElementById('generateBtn');
const copyEmailBtn = document.getElementById('copyEmailBtn');
const copyUrlBtn = document.getElementById('copyUrlBtn');
const refreshBtn = document.getElementById('refreshBtn');
const clearBtn = document.getElementById('clearBtn');
const emailCount = document.getElementById('emailCount');
const autoRefreshStatus = document.getElementById('autoRefreshStatus');
const inboxEmpty = document.getElementById('inboxEmpty');
const inboxList = document.getElementById('inboxList');
const emailModal = document.getElementById('emailModal');
const closeModal = document.getElementById('closeModal');
const saveEmailBtn = document.getElementById('saveEmailBtn');
let currentModalEmail = null; // 当前打开的邮件数据

// 初始化
document.addEventListener('DOMContentLoaded', function() {
	initTheme(); // 初始化主题
	loadDomains().then(() => {
		// 域名加载完成后再恢复邮箱状态
		restoreEmailState();
	});
	setupEventListeners();
	setupThemeToggle(); // 设置主题切换事件
});

// 设置预设邮箱
function setupPresetEmail(email) {
	const emailParts = email.split('@');
	const prefix = emailParts[0] || '';
	const domain = emailParts[1] || '';
	
	// 设置输入框的值
	emailPrefixInput.value = prefix;
	emailDomainSelect.value = domain;
	emailInput.value = email;
	currentEmail = email;
	updateEmailUrl(email);
	
	// 启用相关按钮
	copyEmailBtn.disabled = false;
	copyUrlBtn.disabled = false;
	refreshBtn.disabled = false;
	clearBtn.disabled = false;
	
	// 显示收件箱
	showInbox();
	
	// 开始自动刷新
	startAutoRefresh();
	
	// 立即刷新一次收件箱
	refreshInbox();
	
	showNotification('已设置邮箱地址: ' + email, 'success');
}

// 设置事件监听器
function setupEventListeners() {
	generateBtn.addEventListener('click', generateEmail);
	copyEmailBtn.addEventListener('click', copyEmail);
	copyUrlBtn.addEventListener('click', copyUrl);
	refreshBtn.addEventListener('click', refreshInbox);
	clearBtn.addEventListener('click', clearInbox);
	closeModal.addEventListener('click', closeEmailModal);
	saveEmailBtn.addEventListener('click', saveEmailAsEml);
	
	// 实时更新邮箱地址预览
	emailPrefixInput.addEventListener('input', updateEmailPreview);
	emailDomainSelect.addEventListener('change', updateEmailPreview);
	
	// 点击模态框外部关闭
	emailModal.addEventListener('click', function(e) {
		if (e.target === emailModal) {
			closeEmailModal();
		}
	});
	
	// ESC键关闭模态框
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape' \u0026\u0026 emailModal.style.display !== 'none') {
			closeEmailModal();
		}
	});
}

// 设置主题切换事件
function setupThemeToggle() {
	const themeToggle = document.getElementById('themeToggle');
	if (themeToggle) {
		themeToggle.addEventListener('click', toggleTheme);
	}
}

// 加载支持的域名
async function loadDomains() {
	try {
		const response = await fetch('/domains');
		const data = await response.json();
		
		if (data.success) {
			domains = data.result;
			populateDomainSelect();
			return Promise.resolve();
		} else {
			console.error('Failed to load domains:', data.error);
			return Promise.reject(new Error(data.error));
		}
	} catch (error) {
		console.error('Error loading domains:', error);
		return Promise.reject(error);
	}
}

// 填充域名下拉选择框
function populateDomainSelect() {
	emailDomainSelect.innerHTML = '<option value="">选择域名...</option>';
	domains.forEach(domain => {
		const option = document.createElement('option');
		option.value = domain;
		option.textContent = domain;
		emailDomainSelect.appendChild(option);
	});
}

// 生成随机前缀
function generateRandomPrefix() {
	// 生成8位随机字符串，包含字母和数字
	const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let randomString = '';
	for (let i = 0; i < 8; i++) {
		randomString += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	emailPrefixInput.value = randomString;
	updateEmailPreview();
}

// 更新邮箱地址预览
function updateEmailPreview() {
	const prefix = emailPrefixInput.value.trim();
	const domain = emailDomainSelect.value;
	
	if (prefix && domain) {
		currentEmail = \`\${prefix}@\${domain}\`;
		emailInput.value = currentEmail;
		updateEmailUrl(currentEmail);
	} else {
		emailInput.value = '';
		currentEmail = '';
		emailUrlInput.value = '';
	}
}

// 更新邮箱URL显示
function updateEmailUrl(email) {
	if (email) {
		const currentHost = window.location.origin;
		emailUrlInput.value = currentHost + '/' + email;
	} else {
		emailUrlInput.value = '';
	}
}

// 生成临时邮箱
function generateEmail() {
	let prefix = emailPrefixInput.value.trim();
	let domain = emailDomainSelect.value;
	
	// 如果前缀为空，自动生成随机前缀
	if (!prefix) {
		prefix = generateRandomPrefixString();
		emailPrefixInput.value = prefix;
		showNotification('已自动生成随机前缀', 'info');
	}
	
	// 如果域名为空，自动选择随机域名
	if (!domain) {
		domain = domains[Math.floor(Math.random() * domains.length)];
		emailDomainSelect.value = domain;
		showNotification('已自动选择随机域名', 'info');
	}
	
	// 验证前缀格式（只允许字母、数字、点、下划线、连字符）
	const prefixRegex = /^[a-zA-Z0-9._-]+$/;
	if (!prefixRegex.test(prefix)) {
		showNotification('邮箱前缀只能包含字母、数字、点、下划线和连字符', 'error');
		emailPrefixInput.focus();
		return;
	}
	
	currentEmail = \`\${prefix}@\${domain}\`;
	emailInput.value = currentEmail;
	updateEmailUrl(currentEmail);
	
	// 保存邮箱状态到缓存
	saveEmailState();
	
	// 启用相关按钮
	copyEmailBtn.disabled = false;
	copyUrlBtn.disabled = false;
	refreshBtn.disabled = false;
	clearBtn.disabled = false;
	
	// 显示收件箱
	showInbox();
	
	// 开始自动刷新
	startAutoRefresh();
	
	// 显示成功消息
	showNotification('邮箱生成成功！', 'success');
}

// 生成随机前缀字符串（不更新UI）
function generateRandomPrefixString() {
	const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let randomString = '';
	for (let i = 0; i < 8; i++) {
		randomString += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return randomString;
}

// 复制成功后切换图标为绿色对勾
function showCopySuccess(btn) {
	const originalSvg = btn.innerHTML;
	btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
	btn.style.color = '#22c55e';
	setTimeout(() => {
		btn.innerHTML = originalSvg;
		btn.style.color = '';
	}, 1500);
}

// 复制邮箱地址
async function copyEmail() {
	try {
		await navigator.clipboard.writeText(currentEmail);
		showCopySuccess(copyEmailBtn);
	} catch (error) {
		// 降级方案
		emailInput.select();
		document.execCommand('copy');
		showCopySuccess(copyEmailBtn);
	}
}

// 复制URL
async function copyUrl() {
	if (!emailUrlInput.value) {
		showNotification('请先生成邮箱地址', 'error');
		return;
	}
	
	try {
		await navigator.clipboard.writeText(emailUrlInput.value);
		showCopySuccess(copyUrlBtn);
	} catch (error) {
		// 降级方案
		emailUrlInput.select();
		document.execCommand('copy');
		showCopySuccess(copyUrlBtn);
	}
}

// 显示收件箱
function showInbox() {
	inboxEmpty.style.display = 'none';
	inboxList.style.display = 'block';
	refreshInbox();
}

// 刷新收件箱
async function refreshInbox() {
	if (!currentEmail) return;
	
	// 添加旋转动画
	refreshBtn.classList.add('rotating');
	refreshBtn.disabled = true;
	console.log('旋转动画已添加，按钮类名:', refreshBtn.className);
	
	try {
		const response = await fetch(\`/emails/\${encodeURIComponent(currentEmail)}\`);
		const data = await response.json();
		
		if (data.success) {
			displayEmails(data.result);
			// 缓存邮件数据
			saveEmailData(data.result);
		} else {
			console.error('Failed to fetch emails:', data.error);
			showNotification('获取邮件失败', 'error');
		}
	} catch (error) {
		console.error('Error fetching emails:', error);
		showNotification('网络错误，请稍后重试', 'error');
	} finally {
		// 移除旋转动画
		refreshBtn.classList.remove('rotating');
		refreshBtn.disabled = false;
		console.log('旋转动画已移除，按钮类名:', refreshBtn.className);
	}
}

// 显示邮件列表
function displayEmails(emails) {
	emailCount.textContent = \`\${emails.length} 封邮件\`;
	
	if (emails.length === 0) {
		inboxList.innerHTML = '<div class="inbox-empty"><p>收件箱为空</p></div>';
		return;
	}
	
	// 按时间排序（最新的在前）
	emails.sort((a, b) => new Date(b.received_at) - new Date(a.received_at));
	
	const emailsHtml = emails.map(email => {
		const time = formatTime(email.received_at);
		
		// 优先显示文本内容，如果没有则显示HTML内容（客户端会处理）
		let preview = '';
		if (email.text_content) {
			preview = email.text_content.substring(0, 100) + '...';
		} else if (email.html_content) {
			// 简单地从HTML中提取文本（移除HTML标签）
			preview = email.html_content.replace(/<[^>]*>/g, '').substring(0, 100) + '...';
		} else {
			preview = '无文本内容';
		}
		
		return \`
			<div class="email-item" onclick="showEmailDetail('\${email.id}')">
				<div class="email-header">
					<div class="email-subject">\${escapeHtml(email.subject || '无主题')}</div>
					<div class="email-time">\${time}</div>
				</div>
				<div class="email-from">来自: \${escapeHtml(email.from_address)}</div>
				<div class="email-preview">\${escapeHtml(preview)}</div>
				\${email.has_attachments ? '<div class="email-attachments"><span class="attachment-badge">📎 附件</span></div>' : ''}
			</div>
		\`;
	}).join('');
	
	inboxList.innerHTML = emailsHtml;
}

// 显示邮件详情
async function showEmailDetail(emailId) {
	try {
		const response = await fetch(\`/inbox/\${emailId}\`);
		const data = await response.json();
		
		if (data.success) {
			const email = data.result;
			displayEmailModal(email);
		} else {
			showNotification('获取邮件详情失败', 'error');
		}
	} catch (error) {
		console.error('Error fetching email detail:', error);
		showNotification('网络错误，请稍后重试', 'error');
	}
}

// 显示邮件模态框
async function displayEmailModal(email) {
	currentModalEmail = email; // 保存当前邮件数据
	document.getElementById('modalSubject').textContent = email.subject || '无主题';
	document.getElementById('modalFrom').textContent = email.from_address;
	document.getElementById('modalTo').textContent = email.to_address;
	document.getElementById('modalTime').textContent = formatTime(email.received_at);
	
	// 显示附件信息
	const attachmentsDiv = document.getElementById('modalAttachments');
	if (email.has_attachments) {
		attachmentsDiv.innerHTML = \`\${email.attachment_count} 个附件 <button onclick="loadAttachments('\${email.id}')" class="btn btn-secondary" style="margin-left: 10px; padding: 5px 10px; font-size: 0.8rem;">查看附件</button>\`;
	} else {
		attachmentsDiv.textContent = '无附件';
	}
	
	// 显示邮件内容
	const contentDiv = document.getElementById('modalContent');
	if (email.html_content) {
		contentDiv.innerHTML = email.html_content;
	} else if (email.text_content) {
		contentDiv.innerHTML = \`<pre style="white-space: pre-wrap; font-family: inherit;">\${escapeHtml(email.text_content)}</pre>\`;
	} else {
		contentDiv.innerHTML = '<p>无内容</p>';
	}
	
	emailModal.style.display = 'flex';
}

// 关闭邮件模态框
function closeEmailModal() {
	emailModal.style.display = 'none';
	currentModalEmail = null;
}

// 保存邮件为 .eml 文件
function saveEmailAsEml() {
	if (!currentModalEmail) return;
	
	const email = currentModalEmail;
	const lines = [];
	
	// EML 头部
	lines.push('From: ' + (email.from_address || ''));
	lines.push('To: ' + (email.to_address || ''));
	lines.push('Subject: ' + (email.subject || '无主题'));
	lines.push('Date: ' + new Date(email.received_at).toUTCString());
	lines.push('MIME-Version: 1.0');
	
	// 根据内容类型设置 Content-Type
	if (email.html_content) {
		lines.push('Content-Type: text/html; charset=UTF-8');
		lines.push('Content-Transfer-Encoding: 8bit');
		lines.push('');
		lines.push(email.html_content);
	} else if (email.text_content) {
		lines.push('Content-Type: text/plain; charset=UTF-8');
		lines.push('Content-Transfer-Encoding: 8bit');
		lines.push('');
		lines.push(email.text_content);
	} else {
		lines.push('Content-Type: text/plain; charset=UTF-8');
		lines.push('Content-Transfer-Encoding: 8bit');
		lines.push('');
		lines.push('无内容');
	}
	
	const emlContent = lines.join('\\r\\n');
	const blob = new Blob([emlContent], { type: 'message/rfc822' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	// 文件名：主题_时间.eml，清理不合法字符
	const safeSubject = (email.subject || '无主题').replace(/[<>:"/\\|?*]/g, '_').substring(0, 50);
	const dateStr = new Date(email.received_at).toISOString().slice(0, 10);
	a.download = safeSubject + '_' + dateStr + '.eml';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
	
	showNotification('邮件已保存', 'success');
}

// 清空收件箱
async function clearInbox() {
	if (!currentEmail) return;
	
	if (!confirm('确定要清空收件箱吗？此操作不可撤销。')) {
		return;
	}
	
	clearBtn.innerHTML = '<span class="loading"></span> 清空中...';
	clearBtn.disabled = true;
	
	try {
		const response = await fetch(\`/emails/\${encodeURIComponent(currentEmail)}\`, {
			method: 'DELETE'
		});
		const data = await response.json();
		
		if (data.success) {
			// 清空缓存
			clearEmailCache();
			showNotification('收件箱已清空', 'success');
			refreshInbox();
		} else {
			showNotification('清空收件箱失败', 'error');
		}
	} catch (error) {
		console.error('Error clearing inbox:', error);
		showNotification('网络错误，请稍后重试', 'error');
	} finally {
		clearBtn.innerHTML = '清空收件箱';
		clearBtn.disabled = false;
	}
}

// 开始自动刷新
function startAutoRefresh() {
	// 清除之前的定时器
	if (refreshInterval) {
		clearInterval(refreshInterval);
	}
	
	// 显示自动刷新状态
	autoRefreshStatus.style.display = 'flex';
	
	// 每30秒刷新一次
	refreshInterval = setInterval(refreshInbox, 30000);
}

// 停止自动刷新
function stopAutoRefresh() {
	if (refreshInterval) {
		clearInterval(refreshInterval);
		refreshInterval = null;
	}
	
	// 隐藏自动刷新状态
	autoRefreshStatus.style.display = 'none';
}

// 格式化时间
function formatTime(timestamp) {
	// 处理不同的时间戳格式
	let date;
	if (typeof timestamp === 'string') {
		// 如果是字符串，尝试解析
		date = new Date(timestamp);
	} else if (typeof timestamp === 'number') {
		// 如果是数字，可能是秒或毫秒时间戳
		// 如果小于 1e12，认为是秒时间戳，需要转换为毫秒
		date = new Date(timestamp < 1e12 ? timestamp * 1000 : timestamp);
	} else {
		date = new Date(timestamp);
	}
	
	// 检查日期是否有效
	if (isNaN(date.getTime())) {
		return '时间未知';
	}
	
	const now = new Date();
	const diff = now - date;
	
	if (diff < 60000) { // 1分钟内
		return '刚刚';
	} else if (diff < 3600000) { // 1小时内
		return \`\${Math.floor(diff / 60000)}分钟前\`;
	} else if (diff < 86400000) { // 24小时内
		return \`\${Math.floor(diff / 3600000)}小时前\`;
	} else {
		return date.toLocaleString('zh-CN', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
}

// HTML转义
function escapeHtml(text) {
	const div = document.createElement('div');
	div.textContent = text;
	return div.innerHTML;
}

// 从HTML中提取纯文本
function extractTextFromHtml(html) {
	const div = document.createElement('div');
	div.innerHTML = html;
	return div.textContent || div.innerText || '';
}

// 加载附件列表
async function loadAttachments(emailId) {
	try {
		const response = await fetch(\`/inbox/\${emailId}/attachments\`);
		const data = await response.json();
		
		if (data.success) {
			displayAttachments(data.result);
		} else {
			showNotification('获取附件列表失败', 'error');
		}
	} catch (error) {
		console.error('Error loading attachments:', error);
		showNotification('网络错误，请稍后重试', 'error');
	}
}

// 显示附件列表
function displayAttachments(attachments) {
	const attachmentsDiv = document.getElementById('modalAttachments');
	
	if (attachments.length === 0) {
		attachmentsDiv.innerHTML = '无附件';
		return;
	}
	
	const attachmentsHtml = attachments.map(attachment => {
		const size = formatFileSize(attachment.size);
		return \`
			<div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; border: 1px solid #e1e5e9; border-radius: 4px; margin-bottom: 5px; background-color: #f8f9fa;">
				<div>
					<strong>\${escapeHtml(attachment.filename)}</strong>
					<br>
					<small style="color: #666;">\${size} • \${escapeHtml(attachment.content_type)}</small>
				</div>
				<button onclick="downloadAttachment('\${attachment.id}')" class="btn btn-primary" style="padding: 5px 10px; font-size: 0.8rem;">下载</button>
			</div>
		\`;
	}).join('');
	
	attachmentsDiv.innerHTML = \`
		<div>
			<strong>\${attachments.length} 个附件</strong>
			<div style="margin-top: 10px;">
				\${attachmentsHtml}
			</div>
		</div>
	\`;
}

// 下载附件
async function downloadAttachment(attachmentId) {
	try {
		const response = await fetch(\`/attachments/\${attachmentId}\`);
		
		if (!response.ok) {
			throw new Error('下载失败');
		}
		
		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = response.headers.get('Content-Disposition')?.split('filename=')[1] || 'attachment';
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
		document.body.removeChild(a);
		
		showNotification('附件下载成功', 'success');
	} catch (error) {
		console.error('Error downloading attachment:', error);
		showNotification('附件下载失败', 'error');
	}
}

// 格式化文件大小
function formatFileSize(bytes) {
	if (bytes === 0) return '0 B';
	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 显示通知
function showNotification(message, type = 'info') {
	// 创建通知元素
	const notification = document.createElement('div');
	notification.className = \`notification notification-\${type}\`;
	notification.textContent = message;
	
	// 添加样式
	notification.style.cssText = \`
		position: fixed;
		top: 20px;
		right: 20px;
		padding: 12px 20px;
		border-radius: 6px;
		color: white;
		font-weight: 500;
		z-index: 1001;
		opacity: 0;
		transform: translateX(100%);
		transition: all 0.3s ease;
		\${type === 'success' ? 'background-color: #28a745;' : ''}
		\${type === 'error' ? 'background-color: #dc3545;' : ''}
		\${type === 'info' ? 'background-color: #17a2b8;' : ''}
	\`;
	
	document.body.appendChild(notification);
	
	// 显示动画
	setTimeout(() => {
		notification.style.opacity = '1';
		notification.style.transform = 'translateX(0)';
	}, 100);
	
	// 3秒后自动消失
	setTimeout(() => {
		notification.style.opacity = '0';
		notification.style.transform = 'translateX(100%)';
		setTimeout(() => {
			document.body.removeChild(notification);
		}, 300);
	}, 3000);
}

// 缓存相关函数
// 保存邮箱状态到localStorage
function saveEmailState() {
	if (!currentEmail) return;
	
	const emailState = {
		email: currentEmail,
		prefix: emailPrefixInput.value,
		domain: emailDomainSelect.value,
		timestamp: Date.now()
	};
	
	try {
		localStorage.setItem('tempMail_currentEmail', JSON.stringify(emailState));
	} catch (error) {
		console.warn('Failed to save email state:', error);
	}
}

// 保存邮件数据到sessionStorage
function saveEmailData(emails) {
	if (!currentEmail || !emails) return;
	
	const emailData = {
		email: currentEmail,
		emails: emails,
		timestamp: Date.now()
	};
	
	try {
		sessionStorage.setItem('tempMail_emailData', JSON.stringify(emailData));
	} catch (error) {
		console.warn('Failed to save email data:', error);
	}
}

// 恢复邮箱状态
function restoreEmailState() {
	try {
		const savedState = localStorage.getItem('tempMail_currentEmail');
		if (!savedState) return;
		
		const emailState = JSON.parse(savedState);
		
		// 检查缓存是否过期（24小时）
		const now = Date.now();
		const cacheAge = now - emailState.timestamp;
		const maxAge = 24 * 60 * 60 * 1000; // 24小时
		
		if (cacheAge > maxAge) {
			localStorage.removeItem('tempMail_currentEmail');
			return;
		}
		
		// 恢复邮箱状态
		currentEmail = emailState.email;
		emailPrefixInput.value = emailState.prefix || '';
		emailDomainSelect.value = emailState.domain || '';
		emailInput.value = currentEmail;
		updateEmailUrl(currentEmail);
		
		// 域名下拉框已经通过设置value自动显示选中状态，无需额外操作
		
		// 启用相关按钮
		refreshBtn.disabled = false;
		clearBtn.disabled = false;
		
		// 显示收件箱
		showInbox();
		
		// 尝试恢复缓存的邮件数据
		restoreEmailData();
		
		// 开始自动刷新
		startAutoRefresh();
		
		showNotification('已恢复之前的邮箱状态', 'info');
		
	} catch (error) {
		console.warn('Failed to restore email state:', error);
		localStorage.removeItem('tempMail_currentEmail');
	}
}

// 恢复邮件数据
function restoreEmailData() {
	try {
		const savedData = sessionStorage.getItem('tempMail_emailData');
		if (!savedData) return;
		
		const emailData = JSON.parse(savedData);
		
		// 检查是否是当前邮箱的数据
		if (emailData.email !== currentEmail) return;
		
		// 检查缓存是否过期（1小时）
		const now = Date.now();
		const cacheAge = now - emailData.timestamp;
		const maxAge = 60 * 60 * 1000; // 1小时
		
		if (cacheAge > maxAge) {
			sessionStorage.removeItem('tempMail_emailData');
			return;
		}
		
		// 恢复邮件数据
		displayEmails(emailData.emails);
		showNotification('已恢复缓存的邮件数据', 'info');
		
	} catch (error) {
		console.warn('Failed to restore email data:', error);
		sessionStorage.removeItem('tempMail_emailData');
	}
}

// 清空缓存
function clearEmailCache() {
	try {
		localStorage.removeItem('tempMail_currentEmail');
		sessionStorage.removeItem('tempMail_emailData');
	} catch (error) {
		console.warn('Failed to clear email cache:', error);
	}
}

// 页面卸载时清理
window.addEventListener('beforeunload', function() {
	stopAutoRefresh();
});
	`;

	return c.text(js, 200, {
		"Content-Type": "application/javascript; charset=utf-8"
	});
});

// 邮箱地址重定向路由 - 处理 /<email> 格式的URL
staticRoutes.get("/:email", async (c) => {
	const email = c.req.param("email");

	// 排除API路由和静态资源
	if (email === 'domains' || email === 'emails' || email === 'attachments' ||
		email === 'health' || email === 'openapi.json' || email === 'docs' ||
		email.startsWith('static/') || email.endsWith('.svg') || email.endsWith('.ico')) {
		return c.text('Not Found', 404);
	}

	// 验证邮箱地址格式
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (emailRegex.test(email)) {
		// 如果URL中的邮箱地址格式正确，返回主页并设置邮箱
		const html = `
<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>临时邮箱</title>
		<link rel="icon" type="image/svg+xml" href="/favicon.svg">
		<link rel="icon" type="image/svg+xml" sizes="16x16" href="/favicon-16.svg">
		<link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon.svg">
		<link rel="icon" type="image/svg+xml" sizes="48x48" href="/favicon-48.svg">
		<link rel="apple-touch-icon" href="/apple-touch-icon.svg">
		<link rel="stylesheet" href="/static/style.css">
	</head>
<body>
	<div class="container">
		<header class="header">
			<h1>临时邮箱</h1>
		</header>

		<div class="main-content">
			<!-- 左侧栏：邮箱生成 -->
			<div class="left-panel">
				<div class="email-generator">
					<h2>生成临时邮箱</h2>
					<div class="email-display">
						<div class="email-input-group">
							<input type="text" id="emailPrefix" placeholder="自定义前缀">
							<span class="email-separator">@</span>
							<select id="emailDomain" class="domain-select">
								<option value="">选择域名...</option>
							</select>
						</div>
						<div class="email-input-with-copy">
							<input type="text" id="emailAddress" readonly placeholder="完整邮箱地址将显示在这里">
							<button id="copyEmailBtn" class="copy-btn" title="复制邮箱地址">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
									<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
								</svg>
							</button>
						</div>
						<div class="email-url-display">
							<label for="emailUrl">访问地址:</label>
							<div class="url-input-with-copy">
								<input type="text" id="emailUrl" readonly placeholder="完整URL将显示在这里">
								<button id="copyUrlBtn" class="copy-btn" title="复制URL">
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
										<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
									</svg>
								</button>
							</div>
						</div>
						<div class="email-actions-row">
							<button id="generateBtn" class="btn btn-primary">生成新邮箱</button>
						</div>
					</div>
					<div class="email-actions">
						<!-- 刷新按钮已移至右栏标题 -->
					</div>
					<div class="email-info">
						<p>邮件将在24小时后自动删除</p>
						<p>支持接收附件，最大50MB</p>
					</div>
				</div>
			</div>

			<!-- 右侧栏：收件箱 -->
			<div class="right-panel">
				<div class="inbox">
					<div class="inbox-header">
						<h2>收件箱 <button id="refreshBtn" class="refresh-icon-btn" title="刷新收件箱">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="23 4 23 10 17 10"></polyline>
								<polyline points="1 20 1 14 7 14"></polyline>
								<path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
							</svg>
						</button></h2>
						<div class="inbox-controls">
							<span id="emailCount" class="email-count">0 封邮件</span>
							<span id="autoRefreshStatus" class="auto-refresh-status" style="display: none;">
								<span class="refresh-indicator"></span> 自动刷新中
							</span>
							<button id="clearBtn" class="btn btn-danger" disabled>清空收件箱</button>
						</div>
					</div>
					<div class="inbox-content">
						<div id="inboxEmpty" class="inbox-empty">
							<p>请先生成一个邮箱地址</p>
						</div>
						<div id="inboxList" class="inbox-list" style="display: none;">
							<!-- 邮件列表将在这里动态生成 -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 邮件详情模态框 -->
	<div id="emailModal" class="modal" style="display: none;">
		<div class="modal-content">
			<div class="modal-header">
				<h3 id="modalSubject">邮件详情</h3>
				<button id="saveEmailBtn" class="save-btn" title="保存邮件">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
						<polyline points="17 21 17 13 7 13 7 21"></polyline>
						<polyline points="7 3 7 8 15 8"></polyline>
					</svg>
				</button>
				<button id="closeModal" class="close-btn">&times;</button>
			</div>
			<div class="modal-body">
				<div class="email-details">
					<div class="email-meta">
						<p><strong>发件人:</strong> <span id="modalFrom"></span></p>
						<p><strong>收件人:</strong> <span id="modalTo"></span></p>
						<p><strong>时间:</strong> <span id="modalTime"></span></p>
						<p><strong>附件:</strong> <span id="modalAttachments"></span></p>
					</div>
					<div class="email-content">
						<div id="modalContent"></div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 主题切换按钮 -->
	<button id="themeToggle" class="theme-toggle" aria-label="切换主题">
		🌙
	</button>

	<script>
		// 设置预设邮箱
		const presetEmail = '${email}';
		window.addEventListener('DOMContentLoaded', function() {
			// 等待页面加载完成后设置邮箱
			setTimeout(() => {
				if (typeof setupPresetEmail === 'function') {
					setupPresetEmail(presetEmail);
				}
			}, 100);
		});
	</script>
	<script src="/static/script.js"></script>
</body>
</html>`;
		return c.html(html, 200, { "Content-Type": "text/html; charset=utf-8" });
	}

	// 如果不是有效的邮箱地址，返回404
	return c.text("Not Found", 404);
});

// 主页面路由
staticRoutes.get("/", async (c) => {
	return c.html(`
<!DOCTYPE html>
<html lang="zh-CN">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>临时邮箱</title>
			<link rel="icon" type="image/svg+xml" href="/favicon.svg">
			<link rel="icon" type="image/svg+xml" sizes="16x16" href="/favicon-16.svg">
			<link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon.svg">
			<link rel="icon" type="image/svg+xml" sizes="48x48" href="/favicon-48.svg">
			<link rel="apple-touch-icon" href="/apple-touch-icon.svg">
			<link rel="stylesheet" href="/static/style.css">
		</head>
<body>
	<div class="container">
		<header class="header">
			<h1>临时邮箱</h1>
		</header>

		<div class="main-content">
			<!-- 左侧栏：邮箱生成 -->
			<div class="left-panel">
				<div class="email-generator">
					<h2>生成临时邮箱</h2>
					<div class="email-display">
						<div class="email-input-group">
							<input type="text" id="emailPrefix" placeholder="自定义前缀">
							<span class="email-separator">@</span>
							<select id="emailDomain" class="domain-select">
								<option value="">选择域名...</option>
							</select>
						</div>
						<div class="email-input-with-copy">
							<input type="text" id="emailAddress" readonly placeholder="完整邮箱地址将显示在这里">
							<button id="copyEmailBtn" class="copy-btn" title="复制邮箱地址">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
									<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
								</svg>
							</button>
						</div>
						<div class="email-url-display">
							<label for="emailUrl">访问地址:</label>
							<div class="url-input-with-copy">
								<input type="text" id="emailUrl" readonly placeholder="完整URL将显示在这里">
								<button id="copyUrlBtn" class="copy-btn" title="复制URL">
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
										<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
									</svg>
								</button>
							</div>
						</div>
						<div class="email-actions-row">
							<button id="generateBtn" class="btn btn-primary">生成新邮箱</button>
						</div>
					</div>
					<div class="email-actions">
						<!-- 刷新按钮已移至右栏标题 -->
					</div>
					<div class="email-info">
						<p>邮件将在24小时后自动删除</p>
						<p>支持接收附件，最大50MB</p>
					</div>
				</div>
			</div>

			<!-- 右侧栏：收件箱 -->
			<div class="right-panel">
				<div class="inbox">
					<div class="inbox-header">
						<h2>收件箱 <button id="refreshBtn" class="refresh-icon-btn" title="刷新收件箱">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="23 4 23 10 17 10"></polyline>
								<polyline points="1 20 1 14 7 14"></polyline>
								<path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
							</svg>
						</button></h2>
						<div class="inbox-controls">
							<span id="emailCount" class="email-count">0 封邮件</span>
							<span id="autoRefreshStatus" class="auto-refresh-status" style="display: none;">
								<span class="refresh-indicator"></span> 自动刷新中
							</span>
							<button id="clearBtn" class="btn btn-danger" disabled>清空收件箱</button>
						</div>
					</div>
					<div class="inbox-content">
						<div id="inboxEmpty" class="inbox-empty">
							<p>请先生成一个邮箱地址</p>
						</div>
						<div id="inboxList" class="inbox-list" style="display: none;">
							<!-- 邮件列表将在这里动态生成 -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 邮件详情模态框 -->
	<div id="emailModal" class="modal" style="display: none;">
		<div class="modal-content">
			<div class="modal-header">
				<h3 id="modalSubject">邮件详情</h3>
				<button id="saveEmailBtn" class="save-btn" title="保存邮件">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
						<polyline points="17 21 17 13 7 13 7 21"></polyline>
						<polyline points="7 3 7 8 15 8"></polyline>
					</svg>
				</button>
				<button id="closeModal" class="close-btn">&times;</button>
			</div>
			<div class="modal-body">
				<div class="email-details">
					<div class="email-meta">
						<p><strong>发件人:</strong> <span id="modalFrom"></span></p>
						<p><strong>收件人:</strong> <span id="modalTo"></span></p>
						<p><strong>时间:</strong> <span id="modalTime"></span></p>
						<p><strong>附件:</strong> <span id="modalAttachments"></span></p>
					</div>
					<div class="email-content">
						<div id="modalContent"></div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 主题切换按钮 -->
	<button id="themeToggle" class="theme-toggle" aria-label="切换主题">
		🌙
	</button>

	<script src="/static/script.js"></script>
</body>
</html>
	`);
});

export default staticRoutes;
