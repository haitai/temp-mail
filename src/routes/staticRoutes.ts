import { Hono } from "hono";

const staticRoutes = new Hono<{ Bindings: CloudflareBindings }>();

// 静态文件服务 - 直接返回文件内容
staticRoutes.get("/static/style.css", async (c) => {
	const css = `
/* 基础样式重置 */
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	line-height: 1.6;
	color: #333;
	background-color: #f5f5f5;
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
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
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
	background: white;
	border-radius: 10px;
	padding: 30px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	height: fit-content;
}

.email-generator h2 {
	margin-bottom: 20px;
	color: #333;
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
	border: 2px solid #e1e5e9;
	border-radius: 6px;
	background-color: #f8f9fa;
}

.email-input-group:focus-within {
	border-color: #667eea;
}

.email-input-group input {
	flex: 1;
	border: none;
	background: transparent;
	font-size: 1rem;
	outline: none;
}

.email-separator {
	font-weight: 600;
	color: #667eea;
	font-size: 1.1rem;
}

.domain-select {
	flex: 1;
	border: none;
	background: transparent;
	font-size: 1rem;
	outline: none;
	color: #333;
	cursor: pointer;
}

.email-display input[readonly] {
	width: 100%;
	padding: 12px;
	border: 2px solid #e1e5e9;
	border-radius: 6px;
	font-size: 1rem;
	margin-bottom: 10px;
	background-color: #f8f9fa;
}

.email-display input[readonly]:focus {
	outline: none;
	border-color: #667eea;
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
	background-color: #f8f9fa;
	padding: 15px;
	border-radius: 6px;
	border-left: 4px solid #667eea;
}

.email-info p {
	margin-bottom: 5px;
	font-size: 0.9rem;
	color: #666;
}

/* 右侧面板 */
.right-panel {
	background: white;
	border-radius: 10px;
	padding: 30px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
}

.inbox-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	padding-bottom: 15px;
	border-bottom: 2px solid #e1e5e9;
}

.inbox-header h2 {
	color: #333;
	font-size: 1.5rem;
}

.inbox-controls {
	display: flex;
	align-items: center;
	gap: 15px;
}

.email-count {
	background-color: #667eea;
	color: white;
	padding: 5px 12px;
	border-radius: 20px;
	font-size: 0.9rem;
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
	color: #666;
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
	background-color: #f8f9fa;
	border: 1px solid #e1e5e9;
	border-radius: 8px;
	padding: 15px;
	cursor: pointer;
	transition: all 0.2s ease;
}

.email-item:hover {
	background-color: #e9ecef;
	border-color: #667eea;
	transform: translateY(-1px);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
	color: #333;
	font-size: 1rem;
}

.email-time {
	font-size: 0.8rem;
	color: #666;
	white-space: nowrap;
}

.email-from {
	color: #667eea;
	font-size: 0.9rem;
	margin-bottom: 5px;
}

.email-preview {
	color: #666;
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
	background-color: #667eea;
	color: white;
}

.btn-primary:hover:not(:disabled) {
	background-color: #5a6fd8;
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
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
}

.modal-content {
	background: white;
	border-radius: 10px;
	width: 90%;
	max-width: 800px;
	max-height: 90vh;
	overflow: hidden;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	background-color: #f8f9fa;
	border-bottom: 1px solid #e1e5e9;
}

.modal-header h3 {
	margin: 0;
	color: #333;
}

.close-btn {
	background: none;
	border: none;
	font-size: 1.5rem;
	cursor: pointer;
	color: #666;
	padding: 0;
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.close-btn:hover {
	color: #333;
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
	background-color: #f8f9fa;
	padding: 15px;
	border-radius: 6px;
}

.email-meta p {
	margin-bottom: 8px;
}

.email-content {
	border: 1px solid #e1e5e9;
	border-radius: 6px;
	padding: 20px;
	background-color: white;
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
	
	.email-input-group {
		flex-direction: column;
		gap: 5px;
	}
	
	.email-separator {
		display: none;
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
	border-top: 3px solid #667eea;
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
	background: #f1f1f1;
	border-radius: 3px;
}

.inbox-content::-webkit-scrollbar-thumb,
.modal-body::-webkit-scrollbar-thumb {
	background: #c1c1c1;
	border-radius: 3px;
}

.inbox-content::-webkit-scrollbar-thumb:hover,
.modal-body::-webkit-scrollbar-thumb:hover {
	background: #a8a8a8;
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

// DOM 元素
const emailPrefixInput = document.getElementById('emailPrefix');
const emailDomainSelect = document.getElementById('emailDomain');
const emailInput = document.getElementById('emailAddress');
const generateBtn = document.getElementById('generateBtn');
const randomPrefixBtn = document.getElementById('randomPrefixBtn');
const copyBtn = document.getElementById('copyBtn');
const refreshBtn = document.getElementById('refreshBtn');
const clearBtn = document.getElementById('clearBtn');
const emailCount = document.getElementById('emailCount');
const autoRefreshStatus = document.getElementById('autoRefreshStatus');
const inboxEmpty = document.getElementById('inboxEmpty');
const inboxList = document.getElementById('inboxList');
const emailModal = document.getElementById('emailModal');
const closeModal = document.getElementById('closeModal');

// 初始化
document.addEventListener('DOMContentLoaded', function() {
	loadDomains();
	setupEventListeners();
});

// 设置事件监听器
function setupEventListeners() {
	generateBtn.addEventListener('click', generateEmail);
	randomPrefixBtn.addEventListener('click', generateRandomPrefix);
	copyBtn.addEventListener('click', copyEmail);
	refreshBtn.addEventListener('click', refreshInbox);
	clearBtn.addEventListener('click', clearInbox);
	closeModal.addEventListener('click', closeEmailModal);
	
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
		if (e.key === 'Escape' && emailModal.style.display !== 'none') {
			closeEmailModal();
		}
	});
}

// 加载支持的域名
async function loadDomains() {
	try {
		const response = await fetch('/domains');
		const data = await response.json();
		
		if (data.success) {
			domains = data.result;
			populateDomainSelect();
		} else {
			console.error('Failed to load domains:', data.error);
		}
	} catch (error) {
		console.error('Error loading domains:', error);
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
	} else {
		emailInput.value = '';
		currentEmail = '';
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
	
	// 启用相关按钮
	copyBtn.disabled = false;
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

// 复制邮箱地址
async function copyEmail() {
	try {
		await navigator.clipboard.writeText(currentEmail);
		showNotification('邮箱地址已复制到剪贴板', 'success');
	} catch (error) {
		// 降级方案
		emailInput.select();
		document.execCommand('copy');
		showNotification('邮箱地址已复制到剪贴板', 'success');
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
	
	refreshBtn.innerHTML = '<span class="loading"></span> 刷新中...';
	refreshBtn.disabled = true;
	
	try {
		const response = await fetch(\`/emails/\${encodeURIComponent(currentEmail)}\`);
		const data = await response.json();
		
		if (data.success) {
			displayEmails(data.result);
		} else {
			console.error('Failed to fetch emails:', data.error);
			showNotification('获取邮件失败', 'error');
		}
	} catch (error) {
		console.error('Error fetching emails:', error);
		showNotification('网络错误，请稍后重试', 'error');
	} finally {
		refreshBtn.innerHTML = '刷新收件箱';
		refreshBtn.disabled = false;
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
		const preview = email.text_content ? 
			email.text_content.substring(0, 100) + '...' : 
			'无文本内容';
		
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
		const response = await fetch(\`/email/\${emailId}\`);
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
function displayEmailModal(email) {
	document.getElementById('modalSubject').textContent = email.subject || '无主题';
	document.getElementById('modalFrom').textContent = email.from_address;
	document.getElementById('modalTo').textContent = email.to_address;
	document.getElementById('modalTime').textContent = formatTime(email.received_at);
	document.getElementById('modalAttachments').textContent = 
		email.has_attachments ? \`\${email.attachment_count} 个附件\` : '无附件';
	
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
	const date = new Date(timestamp);
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

// 页面卸载时清理
window.addEventListener('beforeunload', function() {
	stopAutoRefresh();
});
	`;
	
	return c.text(js, 200, {
		"Content-Type": "application/javascript; charset=utf-8"
	});
});

// 主页面路由
staticRoutes.get("/", async (c) => {
	return c.html(`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>临时邮箱服务</title>
	<link rel="stylesheet" href="/static/style.css">
</head>
<body>
	<div class="container">
		<header class="header">
			<h1>临时邮箱服务</h1>
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
						<input type="text" id="emailAddress" readonly placeholder="完整邮箱地址将显示在这里">
						<div class="email-actions-row">
							<button id="generateBtn" class="btn btn-primary">生成新邮箱</button>
							<button id="randomPrefixBtn" class="btn btn-secondary">随机前缀</button>
						</div>
					</div>
					<div class="email-actions">
						<button id="copyBtn" class="btn btn-secondary" disabled>复制邮箱</button>
						<button id="refreshBtn" class="btn btn-secondary" disabled>刷新收件箱</button>
					</div>
					<div class="email-info">
						<p>邮箱将在24小时后自动删除</p>
						<p>支持接收附件，最大50MB</p>
					</div>
				</div>
			</div>

			<!-- 右侧栏：收件箱 -->
			<div class="right-panel">
				<div class="inbox">
					<div class="inbox-header">
						<h2>收件箱</h2>
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

	<script src="/static/script.js"></script>
</body>
</html>
	`);
});

export default staticRoutes;
