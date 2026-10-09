var HTML = String.raw`<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover,user-scalable=no">
<title>Widgets For Rex</title>
<link rel="icon" href="https://raw.githubusercontent.com/MakkaPakka518/FW/refs/heads/main/widgets/tubiao/REX.png" id="faviconLink">
<style>
:root{--bg:#F2F2F7;--card:#FFF;--accent:#007AFF;--text:#1C1C1E;--text2:#8E8E93;--text3:#C7C7CC;--sep:rgba(60,60,67,0.12);--red:#FF3B30;--green:#34C759;--radius:20px;--dock-bg:rgba(248,248,248,0.72)}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;-webkit-font-smoothing:antialiased}
.header{padding:16px 20px 4px;position:sticky;top:0;z-index:10;background:var(--bg)}
.header h1{font-size:34px;font-weight:700;letter-spacing:-0.5px}
.header p{font-size:14px;color:var(--text2);margin-top:2px}
.page{display:none;padding:8px 16px 160px}
.page.active{display:block}
.card{background:var(--card);border-radius:var(--radius);padding:18px;margin-bottom:14px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.row{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--sep)}
.row:last-child{border-bottom:none}
.ico-sq{width:38px;height:38px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.info{flex:1;min-width:0}
.name{font-size:15px;font-weight:500;white-space:nowrap}
.sub{font-size:12px;color:var(--text3);margin-top:2px}
.badge{font-size:10px;font-weight:600;padding:2px 8px;border-radius:5px;flex-shrink:0}
.badge-blue{background:rgba(0,122,255,0.1);color:var(--accent)}
.badge-green{background:rgba(52,199,89,0.14);color:#34C759}
.ico-sq>div{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.menu-wrap{position:relative;flex-shrink:0}
.menu-drop{position:absolute;right:0;top:100%;margin-top:4px;background:var(--card);border-radius:14px;box-shadow:0 4px 24px rgba(0,0,0,0.12);padding:6px;min-width:150px;z-index:200;animation:fadeUp 0.15s ease}
.menu-drop button{display:block;width:100%;padding:10px 14px;border:none;background:transparent;font-size:14px;text-align:left;border-radius:10px;cursor:pointer;color:var(--text);font-family:inherit}
.menu-drop button:hover{background:var(--bg)}
.menu-drop button.danger{color:var(--red)}
.menu-drop button.danger:hover{background:rgba(255,59,48,0.08)}
.dark{--bg:#000;--card:#1C1C1E;--accent:#0A84FF;--text:#FFF;--text2:#98989D;--text3:#636366;--sep:rgba(84,84,88,0.65);--dock-bg:rgba(28,28,30,0.72)}
.poster{--bg:rgba(24,16,54,0.55);--card:rgba(30,22,60,0.8);--accent:#0A84FF;--text:#FFF;--text2:#B8B8C0;--text3:#70707A;--sep:rgba(255,255,255,0.14);--red:#FF3B30;--green:#34C759;--radius:20px;--dock-bg:rgba(16,16,20,0.55)}
.poster .modal-overlay{background:rgba(0,0,0,0.65)}
.poster .modal{background:rgba(30,22,60,0.92)}
.poster .modal h3,.poster .modal p,.poster .modal label{color:#fff}
.poster .input{background:rgba(255,255,255,0.08);color:#fff}
.poster .toast{background:#fff;color:#111}
/* 海报墙 */
#posterWallWrapper{display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:-10;overflow:hidden;pointer-events:none;background:linear-gradient(165deg,#201048 0%,#0f1f49 45%,#28185a 100%)}
#posterWallRotate{position:absolute;top:-50%;left:-50%;width:200%;height:200%;transform:rotate(-12deg)}
.poster #posterWallWrapper{display:block}
#posterWallMover{width:100%;height:auto;display:flex;flex-direction:column;animation:wallScrollUp 80s linear infinite;will-change:transform}
@keyframes wallScrollUp{0%{transform:translateY(0)}100%{transform:translateY(-50%)}}
.poster-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:14px;padding:8px;width:100%;flex-shrink:0}
@media(min-width:768px){.poster-grid{grid-template-columns:repeat(9,1fr)}}
.poster-img{width:100%;height:auto;border-radius:8px;opacity:0.8;transition:opacity .3s;box-shadow:0 4px 8px -2px rgba(0,0,0,.6);object-fit:cover;aspect-ratio:2/3;-webkit-user-drag:none}


@media(prefers-color-scheme:dark){:root:not(.dark):not(.light){--bg:#000;--card:#1C1C1E;--accent:#0A84FF;--text:#FFF;--text2:#98989D;--text3:#636366;--sep:rgba(84,84,88,0.65);--dock-bg:rgba(28,28,30,0.72)}:root:not(.dark):not(.light) .modal-overlay{background:rgba(0,0,0,0.6)}:root:not(.dark):not(.light) .modal h3,:root:not(.dark):not(.light) .modal p{color:#fff}}
.btn-xs{width:32px;height:32px;border-radius:9px;border:none;background:transparent;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:var(--text2);flex-shrink:0}
.btn-xs:hover{background:rgba(0,0,0,0.05);color:var(--text)}
.btn-xs.danger:hover{background:rgba(255,59,48,0.1);color:var(--red)}
.rex-add{display:inline-flex;align-items:center;gap:3px;padding:5px 9px;border-radius:9px;border:none;font-size:12px;font-weight:700;color:#fff;background:linear-gradient(135deg,#ed1c24,#ff7a45);cursor:pointer;flex-shrink:0;box-shadow:0 2px 6px rgba(237,28,36,0.3)}
.rex-add:hover{opacity:0.9}
.rex-add svg{width:13px;height:13px;stroke-width:2.2}
.btn{border:none;cursor:pointer;font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;font-family:inherit;background:var(--bg);color:var(--text)}
.dark .modal h3{color:#fff}
.dark .modal p{color:#fff}
.dark .modal-overlay{background:rgba(0,0,0,0.6)}
.dark .toast{background:#333;color:#fff}
.btn-primary{background:var(--accent);color:#fff}
.btn-ghost{background:transparent;color:var(--accent);font-size:12px;padding:4px 8px}
.btn-sm{font-size:12px;padding:6px 14px}
.empty{text-align:center;padding:64px 20px;color:var(--text3)}
.empty .ico{font-size:52px;margin-bottom:12px;opacity:0.6}
.empty p{font-size:14px}
.dock{position:fixed;bottom:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));left:16px;right:16px;display:flex;justify-content:space-evenly;align-items:center;padding:8px 6px;background:var(--dock-bg);backdrop-filter:blur(30px) saturate(180%);-webkit-backdrop-filter:blur(30px) saturate(180%);border-radius:28px;box-shadow:0 -0.5px 0 rgba(0,0,0,0.08),0 -8px 32px rgba(0,0,0,0.08);z-index:100;height:70px}
.dock-item{display:flex;flex-direction:column;align-items:center;gap:4px;padding:4px 14px;border-radius:20px;cursor:pointer;border:none;background:none;font-family:inherit;transition:all 0.25s;min-width:60px;-webkit-tap-highlight-color:transparent}
.dock-item .d-icon{width:30px;height:30px;display:flex;align-items:center;justify-content:center}
.dock-item .d-icon svg{width:26px;height:26px}
.dock-item .d-label{font-size:10px;font-weight:500;color:var(--text2)}
.dock-item.active .d-label{color:var(--accent);font-weight:600}
.dock-item.active .d-icon svg{fill:var(--accent)}
.dock-item:not(.active) .d-icon svg{fill:var(--text3)}
.dock-item:active{transform:scale(0.92)}
.input{border:1.5px solid var(--sep);border-radius:14px;padding:12px 14px;font-size:15px;width:100%;outline:none;background:var(--card);color:var(--text);font-family:inherit}
.input:focus{border-color:var(--accent)}
.textarea{border:1.5px solid var(--sep);border-radius:14px;padding:12px 14px;font-size:14px;width:100%;outline:none;background:var(--card);color:var(--text);font-family:inherit;resize:vertical;min-height:60px}
.textarea:focus{border-color:var(--accent)}
.file-zone{border:2px dashed var(--sep);border-radius:14px;padding:24px;text-align:center;cursor:pointer;color:var(--text2);font-size:13px;transition:all 0.2s}
.file-zone:hover{border-color:var(--accent);background:rgba(0,122,255,0.04)}
.login-box{max-width:340px;margin:120px auto 0;text-align:center;padding:32px 20px}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.35);z-index:150;display:flex;align-items:flex-end;justify-content:center;padding:16px;padding-bottom:calc(24px + env(safe-area-inset-bottom,0px))}
.modal{background:var(--card);border-radius:24px;padding:24px 20px;width:100%;max-width:420px;max-height:80vh;overflow-y:auto;box-shadow:0 16px 48px rgba(0,0,0,0.2);margin-bottom:env(safe-area-inset-bottom,0px)}
.modal h3{font-size:18px;font-weight:700;margin-bottom:4px}
.modal .desc{font-size:13px;color:var(--text2);margin-bottom:16px}
.modal label{font-size:13px;font-weight:500;color:var(--text2);margin-bottom:4px;display:block;margin-top:12px}
.modal .btn-row{display:flex;gap:8px;margin-top:16px}
.modal .btn,.modal .btn-primary{background:var(--accent);color:#fff;flex:1}
.link-bar{display:flex;align-items:center;gap:8px;margin-top:12px;padding:10px 12px;background:var(--bg);border-radius:10px}
.link-bar code{flex:1;font-size:11px;color:var(--text2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:'SF Mono',Menlo,monospace}
.toast{position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#1C1C1E;color:#FFF;padding:10px 22px;border-radius:22px;font-size:13px;z-index:200;font-weight:500;opacity:0;transition:opacity 0.3s;pointer-events:none}
.toast.show{opacity:1}
.pick-list{max-height:200px;overflow-y:auto;border:1px solid var(--sep);border-radius:12px;margin-top:8px}
.pick-item{display:flex;align-items:center;gap:8px;padding:10px 12px;cursor:pointer;font-size:13px;border-bottom:1px solid var(--sep)}
.pick-item:last-child{border:none}
.pick-item.checked{background:rgba(0,122,255,0.06)}
.all-pick{border:1px dashed var(--accent);background:rgba(0,122,255,0.04)}
.all-pick.checked{border-style:solid;background:rgba(0,122,255,0.10)}
.stat-box{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
.stat{background:var(--bg);border-radius:16px;padding:16px;text-align:center}
.stat .num{font-size:32px;font-weight:700}
.stat .lbl{font-size:11px;color:var(--text2);margin-top:2px}
@keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.card{animation:fadeUp 0.3s ease}
.editor-overlay{align-items:center}
.editor-modal{width:94vw;max-width:920px;max-height:92vh;padding:0;display:flex;flex-direction:column}
.editor-head{padding:18px 20px 6px;flex-shrink:0}
.editor-head h3{font-size:16px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.editor-status{font-size:12px;color:var(--text2);margin-top:2px}
.editor-status.dirty{color:var(--red)}
.editor-area{font-family:ui-monospace,'SF Mono',Menlo,Consolas,monospace;font-size:13px;line-height:1.55;flex:1;min-height:46vh;margin:10px 20px 0;white-space:pre;tab-size:2;resize:none;width:calc(100% - 40px)}
.editor-foot{display:flex;justify-content:flex-end;gap:8px;padding:12px 20px 18px;flex-shrink:0}

.btn,.btn-xs,.btn-sm{display:inline-flex;align-items:center;justify-content:center;gap:6px}
.card .btn{justify-content:flex-start}
.btn-xs svg,.btn svg,.menu-drop svg,.ico-sq svg,.dock .d-icon svg{display:block}
.btn svg,.btn-xs svg{width:17px;height:17px}
.btn-sm svg{width:15px;height:15px}
.menu-drop button{display:flex;align-items:center;gap:10px}
.menu-drop button svg{width:16px;height:16px;flex-shrink:0;color:var(--text)}
.menu-drop button.danger svg{color:var(--red)}
.ico-sq{display:flex;align-items:center;justify-content:center}
.ico-sq svg{width:20px;height:20px}
.icon-link{display:inline-flex;align-items:center;justify-content:center}
.icon-link svg{width:19px;height:19px}
.btn-primary{background:var(--accent);color:#fff;box-shadow:0 6px 16px rgba(0,122,255,0.28)}
.btn-ghost{background:transparent;color:var(--accent)}
.btn-ghost svg{color:var(--accent)}
.stat .num{font-size:28px}
.row-actions{display:flex;align-items:center;gap:2px}
</style>
</head>
<body>

<div id="posterWallWrapper"><div id="posterWallRotate"><div id="posterWallMover"><div id="posterGrid1" class="poster-grid"></div><div id="posterGrid2" class="poster-grid"></div></div></div></div>


<div id="loginGate" style="display:none;flex-direction:column;align-items:center;justify-content:center;min-height:80vh">
<div style="text-align:center"><img src="https://raw.githubusercontent.com/MakkaPakka518/FW/refs/heads/main/widgets/tubiao/REX.png" alt="REX" style="width:72px;height:72px;margin:0 auto 14px;border-radius:18px;object-fit:cover;display:block;box-shadow:0 6px 20px rgba(0,0,0,0.15)"><h2 style="font-size:22px;font-weight:700">Widgets For Rex</h2><p style="color:#8E8E93;font-size:14px;margin:6px 0 18px">请输入密码</p><p style="color:#B0B0B5;font-size:12px;margin:0 0 22px">管理员、订阅者或公共密码均可登录</p><input type="password" id="pwInput" class="input" style="max-width:280px;text-align:center" placeholder="密码" onkeydown="if(event.key==='Enter')login()"><button class="btn btn-primary" style="width:100%;max-width:280px;margin-top:10px;padding:12px" onclick="login()">登录</button><p id="loginErr" style="color:#FF3B30;font-size:13px;margin-top:10px;display:none"></p></div></div>

<div id="appMain" style="display:none">
<div class="header"><div style="display:flex;justify-content:space-between;align-items:flex-start"><div style="display:flex;align-items:center;gap:10px"><img src="" id="headerIcon" style="width:28px;height:28px;border-radius:7px;object-fit:cover;display:none" onerror="this.style.display='none'"><div><h1 id="pageTitle">模块</h1><p id="pageSub">独立模块管理</p></div></div><button class="btn-xs" id="btnThemeToggle" onclick="toggleTheme()" style="margin-top:4px" title="切换主题"><span class="icon-link" id="themeIcon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/><path d="M21 12.8A8 8 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg></span></button></div></div>

<div id="page-modules" class="page">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><span style="font-size:13px;color:var(--text2)" id="modCount">0 个模块</span><div id="modAdminBar" style="display:flex;gap:6px"><button class="btn btn-primary btn-sm" onclick="showNewMod()">+ 新建模块</button><label class="btn btn-primary btn-sm" style="position:relative;overflow:hidden;cursor:pointer">+ 上传模块<input type="file" multiple accept=".js,application/javascript,text/javascript" style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0.01" onchange="doUploadMods(this)"></label><button class="btn btn-ghost btn-sm" onclick="showImportUrl()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11 4.93"/><path d="M14 11a5 5 0 0 0-7.07 0l-2.83 2.83a5 5 0 0 0 7.07 7.07L13 19.07"/></svg>链接添加</button></div></div>
<div id="modulesList"></div></div>

<div id="page-collections" class="page">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><span id="colCount" style="font-size:13px;color:var(--text2)"></span><button class="btn btn-primary btn-sm" onclick="showAddCol()">+ 新建合集</button></div>
<div id="collectionsList"></div></div>

<div id="page-settings" class="page">
<div id="settingsSubInfo" style="display:none"></div>
<div id="subManageCard" style="display:none"></div>
<div id="settingsAdminCards">
<div class="card"><div style="font-size:16px;font-weight:600;margin-bottom:4px">数据统计</div><div class="stat-box"><div class="stat clickable" onclick="switchTab('collections')" style="cursor:pointer"><div class="num" id="statCols">0</div><div class="lbl">合集</div></div><div class="stat clickable" onclick="switchTab('modules')" style="cursor:pointer"><div class="num" id="statMods">0</div><div class="lbl">模块</div></div></div>
<div class="card"><div style="font-size:16px;font-weight:600;margin-bottom:6px">备份与恢复</div><button class="btn" style="width:100%;margin-top:4px" onclick="exportData()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>备份（全部模块+合集）</button><button class="btn" style="width:100%;margin-top:4px" onclick="importBackup()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12l7 7 7-7"/></svg>恢复（上传备份文件）</button><button class="btn" style="width:100%;margin-top:4px;color:var(--red)" onclick="clearAllData()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>清除所有数据</button></div>
<div class="card"><div style="font-size:16px;font-weight:600;margin-bottom:6px">密码</div><div style="display:flex;gap:8px;margin-top:4px"><input type="password" id="pwdNew" class="input" placeholder="新密码" style="flex:1"><button class="btn btn-primary" style="flex-shrink:0;padding:10px 14px" onclick="changePassword()">修改</button></div></div>
<div class="card"><div style="font-size:16px;font-weight:600;margin-bottom:6px">访客默认主题</div><select id="defaultThemeSel" style="width:100%;border:1.5px solid var(--sep);border-radius:14px;padding:12px 14px;font-size:15px;outline:none;background:var(--card);color:var(--text);font-family:inherit"><option value="auto">跟随系统（黑色/白色）</option><option value="light">白色</option><option value="dark">黑色</option><option value="poster">海报墙</option></select><button class="btn btn-primary" style="width:100%;margin-top:10px" onclick="saveDefaultTheme()">保存默认主题</button><p style="font-size:12px;color:var(--text2);margin:8px 0 0">仅对未手动选择过主题的访客生效（用户自己切换过则保留其选择）</p></div>
<div class="card"><div style="font-size:16px;font-weight:600;margin-bottom:6px">关于</div><p style="font-size:13px;color:var(--text2);line-height:1.9;margin:0">总占用空间：<span id="statSizeText" style="font-weight:600;color:var(--text)">0 B</span><br>与我交流：<a href="https://t.me/MakkaPakkaOvO" target="_blank" rel="noopener" style="color:var(--accent);font-weight:600;text-decoration:none">MakkaPakka</a></p></div></div></div></div>

<div class="dock">
<button class="dock-item active" data-tab="modules" onclick="switchTab('modules')"><span class="d-icon"><svg viewBox="0 0 28 28"><rect x="3" y="3" width="9" height="9" rx="3"/><rect x="16" y="3" width="9" height="9" rx="3"/><rect x="3" y="16" width="9" height="9" rx="3"/><rect x="16" y="16" width="9" height="9" rx="3"/></svg></span><span class="d-label">模块</span></button>
<button class="dock-item" data-tab="collections" onclick="switchTab('collections')"><span class="d-icon"><svg viewBox="0 0 28 28"><path d="M3 6a2 2 0 012-2h7l2 2h9a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6z"/></svg></span><span class="d-label">合集</span></button>
<button class="dock-item" data-tab="settings" onclick="switchTab('settings')"><span class="d-icon"><svg viewBox="0 0 28 28"><circle cx="14" cy="14" r="4"/><path d="M14 1l2.5 5.5c.2.4.6.7 1.1.7h5.8l-4.6 3.4c-.4.3-.5.8-.4 1.2l1.8 5.7-4.7-3.4c-.4-.3-.9-.3-1.3 0l-4.7 3.4 1.8-5.7c.1-.4 0-.9-.4-1.2L5.6 7.2h5.8c.5 0 .9-.3 1.1-.7L14 1z"/></svg></span><span class="d-label">设置</span></button></div>

<div class="toast" id="toast"></div>
<input type="file" id="replaceFileInput" accept=".js,application/javascript,text/javascript" style="position:fixed;top:-100px;left:-100px;opacity:0.01;width:1px;height:1px" onchange="doReplaceMod(this)">

<script>
var I = {
  doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>',
  lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  box:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8l-9-5-9 5v8l9 5 9-5V8z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
  dots:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>',
  copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
  trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
  docup:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M12 18v-6M9 15l3-3 3 3"/></svg>',
  code:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9.5 13l-2 2 2 2M14.5 13l2 2-2 2"/></svg>',
  refresh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 1-2.34-5.66"/><path d="M20 3v5h-5"/></svg>',
  up:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>',
  down:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12l7 7 7-7"/></svg>',
  link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11 4.93"/><path d="M14 11a5 5 0 0 0-7.07 0l-2.83 2.83a5 5 0 0 0 7.07 7.07L13 19.07"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  moon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  sunmoon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/><path d="M21 12.8A8 8 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  poster:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 8h20M8 3v5M14 3v5"/></svg>'
};
var state = { modules: [], collections: [], tab: 'modules', modReplaceId: null, isAuthed: false, isSub: false, isPub: false, subInfo: null };

function esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function fmt(b){ return b<1024?b+' B':(b/1024).toFixed(1)+' KB'; }
function org(){ return location.origin; }
function toast(m){ var t=document.getElementById('toast'); t.textContent=m; t.classList.add('show'); clearTimeout(t._t); t._t=setTimeout(function(){ t.classList.remove('show'); },2000); }

async function api(path, opts){
  opts = opts || {};
  var fo = { method: opts.method || 'GET', headers: {} };
  if(opts.json){ fo.headers['Content-Type']='application/json'; fo.body=JSON.stringify(opts.json); }
  if(opts.body) fo.body = opts.body;
  var r = await fetch(path, fo);
  if(r.status===401){
    if(path==='/api/admin/auth'||path==='/api/auth/subscriber'||path==='/api/auth/public'){ state.isAuthed=false; showLogin(); return null; }
    toast('无权限或登录失效'); return null;
  }
  if(r.status===204) return {ok:true};
  return r.json().catch(function(){ return null; });
}

function showLogin(){ document.getElementById('loginGate').style.display='flex'; document.getElementById('appMain').style.display='none'; state.isAuthed=false; }
function showApp(){
  document.getElementById('loginGate').style.display='none';
  document.getElementById('appMain').style.display='block';
  var bar=document.getElementById('modAdminBar');
  if(bar) bar.style.display = (state.isSub||state.isPub) ? 'none' : 'flex';
  loadAll();
}

async function checkAuth(){
  var r = await api('/api/admin/auth');
  if(!r){ showLogin(); return; }
  if(r.authenticated){ state.isAuthed=true; state.isSub=false; state.isPub=false; showApp(); }
  else {
    var r2 = await api('/api/auth/subscriber');
    if(r2 && r2.authenticated){ state.isAuthed=true; state.isSub=true; state.isPub=false; state.subInfo=r2; showApp(); }
    else {
      var r3 = await api('/api/auth/public');
      if(r3 && r3.authenticated){ state.isAuthed=true; state.isSub=false; state.isPub=true; showApp(); }
      else showLogin();
    }
  }
}

async function login(){
  var pw = document.getElementById('pwInput').value;
  if(!pw) return;
  var r = await api('/api/admin/auth', {method:'POST',json:{password:pw}});
  if(r&&r.ok){ state.isAuthed=true; state.isSub=false; showApp(); document.getElementById('pwInput').value=''; return; }
  var r2 = await api('/api/auth/subscriber', {method:'POST',json:{password:pw}});
  if(r2&&r2.ok){ state.isAuthed=true; state.isSub=true; state.isPub=false; state.subInfo=r2; showApp(); document.getElementById('pwInput').value=''; return; }
  var r3 = await api('/api/auth/public', {method:'POST',json:{password:pw}});
  if(r3&&r3.ok){ state.isAuthed=true; state.isSub=false; state.isPub=true; showApp(); document.getElementById('pwInput').value=''; return; }
  var e=document.getElementById('loginErr'); e.style.display='block'; e.textContent='密码错误';
}

async function loadAll(){
  var mr = await api('/api/admin/modules');
  if(mr && Array.isArray(mr)) state.modules = mr;
  var cr = await api('/api/admin/collections');
  if(cr && Array.isArray(cr)) state.collections = cr;
  if(state.isSub){
    var si = await api('/api/auth/subscriber');
    if(si && si.authenticated) state.subInfo = si;
  }
  switchTab(state.tab);
}

function switchTab(tab){
  state.tab=tab;
  document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
  var pg = document.getElementById('page-'+tab); if(pg) pg.classList.add('active');
  document.querySelectorAll('.dock-item').forEach(function(el){ el.classList.toggle('active',el.dataset.tab===tab); });
  var titles=(state.isSub||state.isPub)
    ? {modules:['模块','只读模块池'],collections:['合集','挑选模块组成订阅'],settings:['设置','订阅信息']}
    : {modules:['模块','独立模块管理'],collections:['合集','挑选模块组成订阅'],settings:['设置','系统信息']};
  document.getElementById('pageTitle').textContent=titles[tab][0];
  document.getElementById('pageSub').textContent=titles[tab][1];
  if(tab==='modules') renderMods();
  if(tab==='collections') renderCols();
  if(tab==='settings') renderSettings();
}

function renderMods(){
  var ms = state.modules.slice().sort(function(a,b){
    var oa = a.official ? 0 : 1, ob = b.official ? 0 : 1;
    if(oa !== ob) return oa - ob;
    return (b.created_at||0) - (a.created_at||0);
  });
  document.getElementById('modCount').textContent = ms.length + ' 个模块';
  if(!ms.length){ document.getElementById('modulesList').innerHTML='<div class="empty"><div class="ico">'+I.box+'</div><p>暂无模块</p></div>'; return; }
  var h='<div class="card" style="padding-bottom:6px">';
  ms.forEach(function(m){
    var ib=m.is_encrypted?'rgba(255,149,0,0.1)':'rgba(0,122,255,0.06)';
    var ie=m.is_encrypted?I.lock:I.doc;
    h+='<div class="row"><div class="ico-sq" style="background:'+ib+'">'+ie+'</div><div class="info"><div class="name">'+esc(m.title||m.filename)+(m.official?'<span class="badge badge-green" style="margin-left:6px">官方</span>':'')+'</div><div class="sub">'+esc(m.filename)+' · '+fmt(m.file_size)+(m.note?'<br>'+esc(m.note):'')+'</div></div>'+
      (m.version?'<span class="badge badge-blue">'+esc(m.version)+'</span>':'')+
      '<button class="rex-add" onclick="addToRexMod(\''+m.id+'\')" title="一键添加到Rex">'+I.plus+'Rex</button>'+
      '<div class="menu-wrap"><button class="btn-xs" onclick="toggleMenu(event,\''+m.id+'\')">'+I.dots+'</button>'+
      '<div class="menu-drop" id="menu-'+m.id+'" style="display:none">'+
      '<button onclick="copyModLink(\''+m.id+'\')">'+I.copy+'复制链接</button>'+
      ((state.isSub||state.isPub)?'':'<button onclick="editMeta(\''+m.id+'\')">'+I.edit+'编辑信息</button>')+
      ((state.isSub||state.isPub)?'':'<button onclick="promptReplace(\''+m.id+'\')">'+I.docup+'替换文件</button>')+
      ((state.isSub||state.isPub)?'':(m.is_encrypted?'':'<button onclick="openEditor(\''+m.id+'\')">'+I.code+'在线编辑</button>'))+
      ((state.isSub||state.isPub)?'':(m.source_url?'<button onclick="refreshMod(\''+m.id+'\')">'+I.refresh+'刷新</button>':''))+
      ((state.isSub||state.isPub)?'':'<button onclick="promptDeleteMod(\''+m.id+'\')" class="danger">'+I.trash+'删除</button>')+'</div></div></div>';
  });
  h+='</div>';
  document.getElementById('modulesList').innerHTML=h;
}

function showNewMod(){
  showModal('新建官方模块',
    '<label>模块名称</label><input class="input" id="newModTitle" placeholder="例如：天气组件">'+
    '<label>模块代码（JS）</label><textarea class="input" id="newModCode" style="min-height:160px;font-family:monospace;font-size:13px;resize:vertical" placeholder="在此粘贴模块代码..."></textarea>'+
    '<p style="font-size:12px;color:var(--text2);margin:8px 0 0">官方模块对所有用户（管理员/订阅者/公共用户）可见可用，不可编辑，展示在模块列表最前面。</p>',
    function(close){
      var title=document.getElementById('newModTitle').value;
      var code=document.getElementById('newModCode').value;
      if(!title.trim()){ toast('请输入模块名称'); return; }
      if(!code.trim()){ toast('请输入模块代码'); return; }
      api('/api/admin/modules',{method:'POST',json:{title:title,code:code}}).then(function(r){
        if(r&&r.ok){ toast('官方模块已创建'); close(); loadAll(); } else toast('创建失败');
      });
    });
}

async function doUploadMods(input){
  if(!input.files.length){ input.value=''; return; }
  var fd = new FormData();
  for(var i=0;i<input.files.length;i++) fd.append('files',input.files[i]);
  var r = await api('/api/admin/modules',{method:'POST',body:fd});
  if(r&&r.ok){ toast('新增 '+(r.added?r.added.length:0)+' 个 / 更新 '+(r.updated?r.updated.length:0)+' 个'); loadAll(); }
  else toast(r&&r.error?r.error:'上传失败');
  input.value='';
}

function copyModLink(id){ copyText(org()+'/api/modules/'+id+'/raw'); }
// 一键添加到 Rex：跳转 rex://widget?url=<模块/合集订阅链接>
function addToRex(url){ location.href='rex://widget?url='+url; }
function addToRexMod(id){ addToRex(org()+'/api/modules/'+id+'/raw'); }
function addToRexCol(slug){ addToRex(org()+'/api/collections/'+slug+'.rex'); }
function toggleMenu(e, id) {
  e.stopPropagation();
  var d = document.getElementById('menu-' + id);
  var isOpen = d.style.display === 'block';
  document.querySelectorAll('.menu-drop').forEach(function(m) { m.style.display = 'none'; });
  if (!isOpen) d.style.display = 'block';
}
document.addEventListener('click', function() {
  document.querySelectorAll('.menu-drop').forEach(function(m) { m.style.display = 'none'; });
});
function copyText(t){ navigator.clipboard.writeText(t).then(function(){ toast('已复制'); }).catch(function(){ toast('复制失败'); }); }

function promptReplace(id){ state.modReplaceId=id; document.getElementById('replaceFileInput').click(); }
async function refreshMod(id){ var r=await api('/api/admin/modules/'+id+'/refresh',{method:'POST'}); if(r&&r.ok){ toast('已刷新'); loadAll(); } else toast(r?r.error:'刷新失败'); }
function editMeta(id){
  var m = state.modules.find(function(x){ return x.id===id; });
  if(!m) return;
  showModal('编辑模块信息 — '+esc(m.title||m.filename),
    '<label>标题</label><input class="input" id="metaTitle" value="'+esc(m.title||'')+'">'+
    '<label>版本</label><input class="input" id="metaVersion" value="'+esc(m.version||'')+'">'+
    '<label>作者</label><input class="input" id="metaAuthor" value="'+esc(m.author||'')+'">'+
    '<label>备注</label><textarea class="textarea" id="metaNote" rows="2">'+esc(m.note||'')+'</textarea>',
    async function(close){
      var title = document.getElementById('metaTitle').value.trim();
      var version = document.getElementById('metaVersion').value.trim();
      var author = document.getElementById('metaAuthor').value.trim();
      var note = document.getElementById('metaNote').value.trim();
      var r = await api('/api/admin/modules?id='+id, {method:'PATCH', json:{title:title, version:version, author:author, note:note}});
      if(r&&r.ok){ m.title=title; m.version=version; m.author=author; m.note=note; toast('已保存'); close(); renderMods(); } else toast('保存失败');
    });
}
async function doReplaceMod(input){
  var id=state.modReplaceId; state.modReplaceId=null;
  if(!input.files.length) return;
  var fd=new FormData(); fd.append('file',input.files[0]);
  var r=await api('/api/admin/modules?id='+id,{method:'PUT',body:fd});
  if(r&&r.ok){ toast('已替换'); loadAll(); } else toast('替换失败');
  input.value='';
}

async function openEditor(id){
  var m = state.modules.find(function(x){ return x.id===id; });
  if(!m) return;
  if(m.is_encrypted){ toast('加密模块不支持在线编辑'); return; }
  var r = await api('/api/admin/modules/'+id+'/source');
  if(!r || typeof r.content !== 'string'){ toast(r&&r.error?r.error:'读取源码失败'); return; }
  var original = r.content, dirty = false, saving = false, closed = false;

  var o = document.createElement('div');
  o.className = 'modal-overlay editor-overlay';
  o.innerHTML = '<div class="modal editor-modal">'+
    '<div class="editor-head"><h3>'+esc(r.filename)+'</h3>'+
    '<div class="editor-status" id="edStatus">在线编辑 · Ctrl/⌘+S 保存 · Esc 关闭</div></div>'+
    '<textarea class="input editor-area" id="editorArea" spellcheck="false" autocomplete="off" autocapitalize="off" autocorrect="off" wrap="off"></textarea>'+
    '<div class="editor-foot"><button class="btn" id="edCancel">取消</button>'+
    '<button class="btn btn-primary" id="edSave">保存</button></div></div>';
  document.body.appendChild(o);
  var ta = document.getElementById('editorArea');
  var st = document.getElementById('edStatus');
  var btn = document.getElementById('edSave');
  ta.value = original;
  setTimeout(function(){ ta.focus(); }, 60);

  function setDirty(d){
    dirty = d;
    st.classList.toggle('dirty', d);
    st.textContent = d ? '● 有未保存的修改 · Ctrl/⌘+S 保存' : '在线编辑 · Ctrl/⌘+S 保存 · Esc 关闭';
  }
  function close(){ if(!closed){ closed = true; o.remove(); } }
  function tryClose(){
    if(saving) return;
    if(dirty) showConfirm('有未保存的修改，确定关闭？', function(ok){ if(ok) close(); });
    else close();
  }
  async function doSave(){
    if(saving) return;
    saving = true; btn.textContent = '保存中…';
    var rr = await api('/api/admin/modules/'+id+'/source', {method:'POST', json:{content: ta.value}});
    saving = false;
    if(rr && rr.ok){
      original = ta.value; setDirty(false);
      btn.textContent = '已保存 ✓';
      toast('已保存'+(rr.version ? ' v'+rr.version : ''));
      loadAll();
      setTimeout(close, 600);
    } else {
      btn.textContent = '保存';
      toast(rr && rr.error ? rr.error : '保存失败');
    }
  }
  ta.addEventListener('input', function(){ if(!saving) setDirty(ta.value !== original); });
  ta.addEventListener('keydown', function(e){
    if(e.key === 'Tab'){
      e.preventDefault();
      var s = ta.selectionStart, en = ta.selectionEnd;
      ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(en);
      ta.selectionStart = ta.selectionEnd = s + 2;
      setDirty(ta.value !== original);
    } else if((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')){
      e.preventDefault(); doSave();
    } else if(e.key === 'Escape'){
      e.preventDefault(); tryClose();
    }
  });
  document.getElementById('edCancel').addEventListener('click', tryClose);
  btn.addEventListener('click', doSave);
  o.addEventListener('click', function(e){ if(e.target === o) tryClose(); });
}

function showImportUrl(){
  showModal('从链接导入模块',
    '<label>模块 URL</label><input class="input" id="importUrl" placeholder="https://.../widget.js">'+
    '<label>文件名 (可选)</label><input class="input" id="importFilename" placeholder="自动从 URL 提取">',
    async function(close){
      var url = document.getElementById('importUrl').value.trim();
      if(!url){ toast('请输入 URL'); return; }
      var filename = document.getElementById('importFilename').value.trim();
      var r = await api('/api/admin/modules/import', {method:'POST', json:{url:url, filename:filename}});
      if(r&&r.ok){ toast('已导入'); close(); loadAll(); } else toast(r?r.error:'导入失败');
    });
}

function promptDeleteMod(id){
  var m=state.modules.find(function(x){return x.id===id;});
  var name=m?(m.title||m.filename):'';
  showConfirm('确定删除 "'+name+'"？', function(ok){
    if (!ok) return;
    api('/api/admin/modules?id='+id,{method:'DELETE'}).then(function(r){
      if(r&&r.ok){ toast('已删除'); loadAll(); } else toast('删除失败');
    });
  });
}

function renderCols(){
  var cs = state.collections;
  var warn = (state.isSub||state.isPub) ? '<div style="font-size:12px;color:#FF9500;background:rgba(255,149,0,0.12);border-radius:10px;padding:8px 10px;margin-bottom:10px">'+(state.isPub?'公共用户 · 可无限生成合集':'订阅者剩余可生成合集 '+((state.subInfo&&state.subInfo.remaining!=null)?state.subInfo.remaining:'-')+' 次')+' · 名称仅限数字或英文</div>' : '';
  document.getElementById('colCount').textContent='共 '+cs.length+' 个合集';
  if(!cs.length){ document.getElementById('collectionsList').innerHTML=warn+'<div class="empty"><div class="ico">'+I.box+'</div><p>暂无合集</p></div>'; return; }
  var h=warn;
  cs.forEach(function(c){
    var n = (c.moduleIds||[]).length;
    var cntText = c.autoAll ? '全部模块 · 自动更新' : n+' 个模块';
    h+='<div class="card"><div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px"><div style="display:flex;align-items:center;gap:12px;flex:1;min-width:0">';
    if(c.icon_url) h+='<img src="'+esc(c.icon_url)+'" style="width:40px;height:40px;border-radius:12px;object-fit:cover" onerror="this.remove()">';
    h+='<div style="min-width:0"><div style="font-size:16px;font-weight:600">'+esc(c.title)+'</div><div style="font-size:12px;color:var(--text2);margin-top:3px">'+cntText+(c.description?' · '+esc(c.description):'')+'</div></div></div>'+
      '<div style="display:flex;gap:2px"><button class="rex-add" onclick="addToRexCol(\''+c.slug+'\')" title="一键添加到Rex">'+I.plus+'Rex</button><button class="btn-xs" onclick="copyText(\''+org()+'/api/collections/'+c.slug+'.rex\')" title="复制订阅链接">'+I.copy+'</button><button class="btn-xs" onclick="showColModules(\''+c.id+'\')" title="查看合集包含的模块">'+I.eye+'</button>'+(state.isPub?'':'<button class="btn-xs" onclick="showEditCol(\''+c.id+'\')">'+I.edit+'</button>')+'<button class="btn-xs danger" onclick="promptDeleteCol(\''+c.id+'\')">'+I.trash+'</button></div></div>'+
      '<div style="margin-top:10px">'+(state.isPub?'':'<button class="btn btn-ghost btn-sm" onclick="showPickMods(\''+c.id+'\')">+ 从模块池挑选</button>')+'</div></div>';
  });
  document.getElementById('collectionsList').innerHTML=h;
}

function buildPickList(selectedIds){
  var body='<div class="pick-list" style="max-height:260px;overflow-y:auto">';
  if(!state.modules.length){ body='<p style="font-size:13px;color:var(--text3);margin:0;padding:10px 0">暂无可选模块，请先上传模块</p></div>'; return body; }
  state.modules.forEach(function(m){
    var ck = (selectedIds||[]).indexOf(m.id)>=0 ? ' checked' : '';
    body+='<div class="pick-item'+ck+'" data-mid="'+m.id+'" onclick="togglePick(this)"><span style="flex:1">'+esc(m.title||m.filename)+'</span><span style="font-size:11px;color:var(--text3)">'+fmt(m.file_size)+'</span></div>';
  });
  return body+'</div>';
}

function buildAllPickRow(isAll){
  return '<div id="allPickRow" class="pick-item all-pick'+(isAll?' checked':'')+'" onclick="toggleAllPick()"><span style="flex:1;font-weight:600">选择全部模块</span><span style="font-size:11px;color:var(--accent)">'+(isAll?'已开启':'开启后自动加入全部模块')+'</span></div>'+
    '<p id="allPickTip" style="font-size:12px;color:#FF9500;margin:6px 0 0;'+(isAll?'':'display:none')+'">已选择全部模块：之后管理者新上传的模块也会自动加入此合集。</p>';
}
function toggleAllPick(){
  var row = document.getElementById('allPickRow');
  if(!row) return;
  var on = row.classList.toggle('checked');
  document.querySelectorAll('.pick-item[data-mid]').forEach(function(el){ el.classList.toggle('checked', on); });
  syncAllPickState();
}
function syncAllPickState(){
  var row = document.getElementById('allPickRow');
  if(!row) return;
  var items = document.querySelectorAll('.pick-item[data-mid]');
  var on = items.length>0;
  items.forEach(function(x){ if(!x.classList.contains('checked')) on=false; });
  row.classList.toggle('checked', on);
  var tip = document.getElementById('allPickTip');
  if(tip) tip.style.display = on ? 'block' : 'none';
  var lab = row.querySelector('span:last-child');
  if(lab) lab.textContent = on ? '已开启' : '开启后自动加入全部模块';
  var mC = document.getElementById('mC');
  if(mC && mC._createCtl) mC._createCtl();
}

function showAddCol(){
  var quotaNote = (state.isSub||state.isPub) ? '<div style="font-size:12px;color:#FF9500;margin:0 0 8px">'+(state.isPub?'公共用户可无限生成':'剩余可生成 '+(state.subInfo&&state.subInfo.remaining!=null?state.subInfo.remaining:'-')+' 次')+' · 名称仅限数字或英文</div>' : '';
  var body;
  if(state.isPub){
    var pubDesc = '在网站：' + location.hostname + ' 自选的玛卡巴卡的模块合集';
    body = quotaNote+
      '<div style="border:1px solid var(--line);border-radius:12px;padding:12px;margin-bottom:10px">'+
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><img src="https://raw.githubusercontent.com/MakkaPakka518/FW/refs/heads/main/widgets/tubiao/Rex-Makka.JPEG" style="width:36px;height:36px;border-radius:10px;object-fit:cover" onerror="this.remove()"><div style="font-size:16px;font-weight:600">玛卡巴卡的自选模块</div></div>'+
        '<div style="font-size:13px;color:var(--text2);line-height:1.7">'+esc(pubDesc)+'</div>'+
        '<div style="font-size:12px;color:var(--text3);margin-top:6px">标题 / 描述 / 图标为固定模板，不可更改</div>'+
      '</div>'+
      buildAllPickRow(false)+'<label>选择模块（必须至少选择 1 个才能创建）</label>'+buildPickList([]);
  } else {
    body = quotaNote+
      '<label>标题</label><input class="input" id="colTitle" placeholder="合集名称'+(state.isSub?'（仅数字或英文）':'')+'">'+
      '<label>描述</label><input class="input" id="colDesc" placeholder="可选">'+
      '<label>图标 URL</label><input class="input" id="colIcon" placeholder="可选，https://...">'+
      buildAllPickRow(false)+'<label>选择模块（必须至少选择 1 个才能创建）</label>'+buildPickList([]);
  }
  showModal('新建合集', body, function(close){
    var picked = [];
    document.querySelectorAll('.pick-item[data-mid].checked').forEach(function(el){ picked.push(el.dataset.mid); });
    if(!picked.length){ toast('请至少选择一个模块'); return; }
    var allOn = document.getElementById('allPickRow') ? document.getElementById('allPickRow').classList.contains('checked') : false;
    var payload = state.isPub ? {moduleIds:picked,autoAll:allOn} : {title:document.getElementById('colTitle').value.trim(),description:document.getElementById('colDesc').value.trim(),icon_url:document.getElementById('colIcon').value.trim(),moduleIds:picked,autoAll:allOn};
    if(!state.isPub && !payload.title){ toast('请输入标题'); return; }
    if(state.isSub && !/^[A-Za-z0-9]+$/.test(payload.title)){ toast('合集名称只能为数字或英文'); return; }
    api('/api/admin/collections',{method:'POST',json:payload}).then(function(r){
      if(r&&r.ok){
        if(state.isPub && r.exists){ toast('该模块组合已存在，为你跳转到已有合集'); close(); loadAll().then(function(){ showColModules(r.id); }); }
        else { toast('合集已创建'); close(); loadAll(); }
      } else toast(r&&r.error?r.error:'创建失败');
    });
  });
  // 未选择任何模块时确认按钮不可点击
  var mC = document.getElementById('mC');
  function refreshBtn(){ var any = document.querySelectorAll('.pick-item[data-mid].checked').length>0; mC.disabled = !any; mC.style.opacity = any?'1':'0.5'; }
  mC._createCtl = refreshBtn;
  var items = document.querySelectorAll('.pick-item');
  for(var i=0;i<items.length;i++) items[i].addEventListener('click', refreshBtn);
  refreshBtn();
}

function showColModules(id){
  var col = state.collections.find(function(c){ return c.id===id; });
  if(!col) return;
  var ids = col.moduleIds || [];
  if(!ids.length){ toast('该合集暂无模块'); return; }
  var rows = '';
  ids.forEach(function(mid, i){
    var m = state.modules.find(function(x){ return x.id===mid; });
    var name = m && m.title ? m.title : '未命名模块';
    rows += '<div style="display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;background:var(--card);border:1px solid var(--sep);font-size:13px"><span style="width:22px;flex-shrink:0;color:var(--text3);font-size:12px">'+(i+1)+'</span><span style="flex:1;min-width:0">'+esc(name)+'</span></div>';
  });
  var autoTip = col.autoAll ? '<p style="font-size:12px;color:#FF9500;margin:0 0 8px">此合集已开启「全部模块」：管理者新上传的模块会自动加入。</p>' : '';
  showModal('合集模块 — '+esc(col.title), autoTip+'<div style="display:flex;flex-direction:column;gap:6px;max-height:340px;overflow-y:auto">'+rows+'</div><p style="font-size:12px;color:var(--text3);margin:10px 0 0">共 '+ids.length+' 个模块'+(col.autoAll?'（自动更新中）':'')+'</p>', function(close){ close(); });
}

function showEditCol(id){
  var col = state.collections.find(function(c){ return c.id===id; });
  if(!col) return;
  if(state.isPub){
    showModal('合集信息', '<div style="font-size:13px;color:var(--text2);line-height:1.9;margin:0">标题 / 描述 / 图标为固定模板，不可更改。<br>公共用户合集的模块列表已锁定，不可手动增删。<br>创建时勾选「选择全部模块」的合集，管理者后续上传的新模块会自动加入。</div>', function(close){ close(); });
    return;
  }
  showModal('编辑合集',
    '<label>标题</label><input class="input" id="colTitle" value="'+esc(col.title)+'">'+
    '<label>描述</label><input class="input" id="colDesc" value="'+esc(col.description||'')+'">'+
    '<label>图标 URL</label><input class="input" id="colIcon" value="'+esc(col.icon_url||'')+'">',
    function(close){
      var title=document.getElementById('colTitle').value;
      if(!title.trim()){ toast('请输入标题'); return; }
      if((state.isSub||state.isPub) && !/^[A-Za-z0-9]+$/.test(title.trim())){ toast('合集名称只能为数字或英文'); return; }
      api('/api/admin/collections',{method:'PATCH',json:{id:id,title:title.trim(),description:document.getElementById('colDesc').value.trim(),icon_url:document.getElementById('colIcon').value.trim()}}).then(function(r){
        if(r&&r.ok){ toast('已更新'); close(); loadAll(); } else toast('更新失败');
      });
    });
}

function showPickMods(colId){
  var col = state.collections.find(function(c){ return c.id===colId; });
  if(!col) return;
  if(state.isPub){ showColModules(colId); return; }
  if(!state.modules.length){ toast('请先上传模块'); return; }
  var modIds = col.moduleIds || [];
  var isAll = !!col.autoAll;
  var body=buildAllPickRow(isAll)+'<label>选择模块（勾选已有模块添加到合集）</label><div class="pick-list">';
  state.modules.forEach(function(m){
    var ck = (isAll || modIds.indexOf(m.id)>=0) ? ' checked' : '';
    body+='<div class="pick-item'+ck+'" data-mid="'+m.id+'" onclick="togglePick(this)"><span style="flex:1">'+esc(m.title||m.filename)+'</span><span style="font-size:11px;color:var(--text3)">'+fmt(m.file_size)+'</span></div>';
  });
  body+='</div>';
  showModal('挑选模块 — '+esc(col.title), body, function(close){
    var picked = [];
    document.querySelectorAll('.pick-item[data-mid].checked').forEach(function(el){ picked.push(el.dataset.mid); });
    var allOn = document.getElementById('allPickRow') ? document.getElementById('allPickRow').classList.contains('checked') : false;
    api('/api/admin/collections',{method:'PATCH',json:{id:colId,moduleIds:picked,autoAll:allOn}}).then(function(r){
      if(r&&r.ok){ col.moduleIds = picked; col.autoAll = allOn; toast(allOn?'已开启全部模块，之后新上传的模块将自动加入':'已更新'); close(); loadAll(); } else toast('更新失败');
    });
  });
}

function togglePick(el){
  el.classList.toggle('checked');
  var row = document.getElementById('allPickRow');
  if(row) syncAllPickState();
}

function promptDeleteCol(id){
  var c=state.collections.find(function(x){return x.id===id;});
  var name=c?c.title:'';
  showConfirm('确定删除合集 "'+name+'"？（模块文件不受影响）', function(ok){
    if (!ok) return;
    api('/api/admin/collections?id='+id,{method:'DELETE'}).then(function(r){
      if(r&&r.ok){ toast('已删除'); loadAll(); } else toast('删除失败');
    });
  });
}

function renderSettings(){var tm=0,ts=0;state.modules.forEach(function(m){tm++;ts+=m.file_size||0;});
  document.getElementById('statCols').textContent=state.collections.length;
  document.getElementById('statMods').textContent=tm;
  document.getElementById('statSizeText').textContent=fmt(ts);
  var adm=document.getElementById('settingsAdminCards');
  var sub=document.getElementById('settingsSubInfo');
  var subMg=document.getElementById('subManageCard');
  if(adm) adm.style.display = (state.isSub||state.isPub) ? 'none' : 'block';
  if(subMg) subMg.style.display = (state.isSub||state.isPub) ? 'none' : 'block';
  if(sub){
    if(state.isSub||state.isPub){ sub.style.display='block'; sub.innerHTML=subInfoHtml(); }
    else sub.style.display='none';
  }
  if(!(state.isSub||state.isPub) && subMg) renderSubManage();
  var themeSel = document.getElementById('defaultThemeSel');
  if(themeSel){
    fetch(org()+'/api/settings').then(function(r){ return r.json(); }).catch(function(){ return {}; }).then(function(s){
      if(s && s.defaultTheme && themeSel.value !== s.defaultTheme) themeSel.value = s.defaultTheme;
    });
  }
}

function saveDefaultTheme(){
  var sel = document.getElementById('defaultThemeSel');
  if(!sel) return;
  api('/api/settings',{method:'PUT',json:{defaultTheme:sel.value}}).then(function(r){
    if(r&&r.ok){ toast('默认主题已保存'); } else toast('保存失败');
  });
}

function subInfoHtml(){
  if(state.isPub){
    return '<div class="card"><div style="font-size:16px;font-weight:600;margin-bottom:6px">公共用户信息</div>'+
      '<p style="font-size:13px;color:var(--text2);line-height:1.9;margin:0">当前模式：公共用户<br>可生成合集次数：不限（无限次）</p>'+
      '<p style="font-size:12px;color:#FF9500;line-height:1.7;margin:10px 0 0">公共用户模式为只读：不能上传或管理模块，只能挑选面板内的模块创建合集；合集名称仅限数字或英文。</p></div>';
  }
  var si = state.subInfo || {};
  return '<div class="card"><div style="font-size:16px;font-weight:600;margin-bottom:6px">订阅信息</div>'+
    '<p style="font-size:13px;color:var(--text2);line-height:1.9;margin:0">当前模式：订阅者<br>可生成合集次数：剩余 '+(si.remaining!=null?si.remaining:'-')+' 次（上限 '+(si.quota!=null?si.quota:'-')+' 次）</p>'+
    '<p style="font-size:12px;color:#FF9500;line-height:1.7;margin:10px 0 0">订阅者模式为只读：不能上传或管理模块，只能挑选面板内的模块创建合集；合集名称仅限数字或英文。</p></div>';
}

async function renderSubManage(){
  var card = document.getElementById('subManageCard');
  if(!card) return;
  card.style.display='block';
  card.innerHTML='<div class="card"><div style="font-size:16px;font-weight:600;margin-bottom:4px">订阅者密码管理</div>'+
    '<div style="display:flex;gap:6px;margin-top:8px"><input class="input" id="subPwd" type="text" placeholder="订阅者密码" style="flex:2"><input class="input" id="subQuota" type="number" min="0" value="2" placeholder="次数" style="flex:0 0 58px"><input class="input" id="subLabel" placeholder="备注(可选)" style="flex:2"></div>'+
    '<button class="btn btn-primary" style="width:100%;margin-top:8px" onclick="addSubscriber()">+ 添加订阅者</button>'+
    '<div id="subList" style="margin-top:8px">加载中…</div></div>';
  await loadSubList();
}

async function loadSubList(){
  var box = document.getElementById('subList');
  if(!box) return;
  var r = await api('/api/admin/subscribers');
  if(!r) return;
  if(!r.length){ box.innerHTML='<p style="font-size:13px;color:var(--text3)">暂无订阅者</p>'; return; }
  var h='';
  r.forEach(function(s){
    h+='<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 0;border-top:1px solid rgba(128,128,128,0.15)">'+
      '<div style="min-width:0;flex:1"><div style="font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+(s.label?esc(s.label)+' · ':'')+'<span style="font-family:monospace">'+esc(s.password)+'</span></div>'+
      '<div style="font-size:12px;color:var(--text2)">已用 '+s.used+' / '+s.quota+' 次 · 剩余 '+s.remaining+'</div></div>'+
      '<div style="display:flex;gap:4px;align-items:center;flex-shrink:0">'+
      '<input type="number" id="q-'+s.id+'" value="'+s.quota+'" min="0" style="width:56px;padding:4px 6px;border-radius:8px;border:1px solid rgba(128,128,128,0.3);font-size:13px;background:transparent;color:inherit">'+
      '<button class="btn-xs" onclick="setSubQuota(\''+s.id+'\')" title="调整生成次数">'+I.up+'</button>'+
      '<button class="btn-xs danger" onclick="delSubscriber(\''+s.id+'\')" title="删除订阅者">'+I.trash+'</button></div></div>';
  });
  box.innerHTML=h;
}

async function addSubscriber(){
  var pwd=document.getElementById('subPwd').value.trim();
  var quota=parseInt(document.getElementById('subQuota').value,10);
  var label=document.getElementById('subLabel').value.trim();
  if(!pwd){ toast('请输入订阅者密码'); return; }
  if(pwd.length<4){ toast('密码至少 4 位'); return; }
  if(isNaN(quota)||quota<0) quota=2;
  var r=await api('/api/admin/subscribers',{method:'POST',json:{password:pwd,quota:quota,label:label}});
  if(r&&r.ok){ toast('已添加订阅者'); document.getElementById('subPwd').value=''; document.getElementById('subLabel').value=''; await loadSubList(); } else toast(r&&r.error?r.error:'添加失败');
}

function delSubscriber(id){
  showConfirmAsync('确定删除该订阅者密码？').then(function(ok){ if(!ok) return; api('/api/admin/subscribers?id='+id,{method:'DELETE'}).then(function(r){ if(r&&r.ok){ toast('已删除'); loadSubList(); } else toast(r&&r.error?r.error:'删除失败'); }); });
}

async function setSubQuota(id){
  var q=parseInt(document.getElementById('q-'+id).value,10);
  if(isNaN(q)||q<0){ toast('次数无效'); return; }
  var r=await api('/api/admin/subscribers',{method:'PATCH',json:{id:id,quota:q}});
  if(r&&r.ok){ toast('已更新'); loadSubList(); } else toast(r&&r.error?r.error:'更新失败');
}

function updatePosterWall(){
  var g1 = document.getElementById('posterGrid1');
  var g2 = document.getElementById('posterGrid2');
  if(!g1 || !g2) return;
  var base = 'https://raw.githubusercontent.com/MakkaPakka518/TUBIAO/refs/heads/main/normal/';
  var posters = [];
  for(var i=1;i<=30;i++) posters.push(base+i+'.webp');
  posters.sort(function(){ return 0.5 - Math.random(); });
  var list = posters.slice();
  while(list.length < 96) list = list.concat(posters);
  var html = '';
  for(var j=0;j<list.length;j++) html += '<img src="'+list[j]+'" class="poster-img" loading="lazy" draggable="false" alt="Poster">';
  g1.innerHTML = html;
  g2.innerHTML = html;
}

function applyTheme(t){
  var root = document.documentElement;
  root.classList.remove('dark','light','poster');
  if(t === 'dark') root.classList.add('dark');
  else if(t === 'light') root.classList.add('light');
  else if(t === 'poster'){ root.classList.add('poster'); updatePosterWall(); }
  localStorage.setItem('fwh_theme', t);
  updateThemeIcon();
}

function toggleTheme(){
  var cur = localStorage.getItem('fwh_theme') || 'auto';
  var order = ['auto','light','dark','poster'];
  var idx = order.indexOf(cur);
  if(idx < 0) idx = 0;
  applyTheme(order[(idx+1) % order.length]);
}

function updateThemeIcon(){
  var el = document.getElementById('themeIcon');
  if(!el) return;
  var root = document.documentElement;
  if(root.classList.contains('dark')) el.innerHTML = I.moon;
  else if(root.classList.contains('light')) el.innerHTML = I.sun;
  else if(root.classList.contains('poster')) el.innerHTML = I.poster;
  else el.innerHTML = I.sunmoon;
}

function exportData(){
  showPrompt('导出备份', 'fwh-backup-' + new Date().toISOString().slice(0,10), function(filename) {
    if (!filename) return;
    function doExport() {
      var count = 0; var total = state.modules.length;
      var combined = { meta: { modules: state.modules, collections: state.collections, exportedAt: new Date().toISOString() }, files: {} };
      function downloadNext() {
    if (count >= state.modules.length) {
      
      var blob = new Blob([JSON.stringify(combined, null, 2)], {type:'application/json'});
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename + '.json';
      a.click();
      toast('已导出 ' + count + ' 个模块');
      return;
    }
    var m = state.modules[count];
    fetch(org() + '/api/modules/' + m.id).then(function(r) {
      return r.text();
    }).then(function(code) {
      combined.files[m.id] = { filename: m.filename, content: code };
      count++;
      downloadNext();
    }).catch(function() {
      combined.files[m.id] = { filename: m.filename, error: 'download failed' };
      count++;
      downloadNext();
    });
  }
      downloadNext();
    }
    if (state.modules.length > 20) {
      showConfirm('共 ' + state.modules.length + ' 个模块，逐个导出可能较慢。\n\n继续导出所有模块？', function(ok) { if(ok) doExport(); });
    } else { doExport(); }
  });
}

function importBackup(){
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = async function() {
    if (!input.files.length) return;
    var file = input.files[0];
    try {
      var text = await file.text();
      var data = JSON.parse(text);
      if (!data.meta || !data.files) { toast('无效的备份文件'); return; }
      var modCount = Object.keys(data.files).length;
      var colCount = (data.meta && data.meta.collections) ? data.meta.collections.length : 0;
      if (!await showConfirmAsync('将恢复 ' + modCount + ' 个模块、' + colCount + ' 个合集。\n按备份中的原始 ID 幂等覆盖，合集内引用不会断链。\n\n确认恢复？')) return;
      var r = await api('/api/admin/backup/restore', {method:'POST', json:data});
      if (r && r.ok) toast('恢复完成：' + r.modules + ' 个模块 / ' + r.collections + ' 个合集');
      else toast(r && r.error ? r.error : '恢复失败');
      loadAll();
    } catch(e) { toast('解析失败：' + e.message); }
  };
  input.click();
}

async function changePassword(){
  var pwd = document.getElementById('pwdNew').value.trim();
  if (!pwd) { toast('请输入密码'); return; }
  if (pwd.length < 4) { toast('密码至少 4 位'); return; }
  var r = await api('/api/admin/change-password', {method:'POST', json:{password:pwd}});
  if (r && r.ok) { toast('密码已修改，下次登录生效'); document.getElementById('pwdNew').value = ''; }
  else toast(r ? r.error : '修改失败');
}

function clearAllData(){
  showConfirm('确定清除所有模块和合集？此操作不可撤销！', function(ok){
    if (!ok) return;
    showConfirm('再次确认：将删除所有数据', function(ok2){
      if (!ok2) return;
      var promises = [];
      state.modules.forEach(function(m){ promises.push(api('/api/admin/modules?id='+m.id,{method:'DELETE'})); });
      state.collections.forEach(function(c){ promises.push(api('/api/admin/collections?id='+c.id,{method:'DELETE'})); });
      Promise.all(promises).then(function(){ toast('已清除'); loadAll(); });
    });
  });
}

function showModal(t,b,oc){
  var o=document.createElement('div');o.className='modal-overlay';
  o.innerHTML='<div class="modal"><h3>'+t+'</h3><div class="desc"></div>'+b+'<div class="btn-row"><button class="btn" id="mc">取消</button><button class="btn btn-primary" id="mC">确认</button></div></div>';
  document.body.appendChild(o);
  function cl(){o.remove();}
  o.addEventListener('click',function(e){if(e.target===o)cl();});
  document.getElementById('mc').addEventListener('click',cl);
  document.getElementById('mC').addEventListener('click',function(){oc(cl);});
}

function showConfirm(msg, onOk) {
  var o=document.createElement('div');o.className='modal-overlay';
  o.innerHTML='<div class="modal"><h3>确认</h3><p style="margin:8px 0;line-height:1.5">'+msg+'</p><div class="btn-row"><button class="btn" id="mc">取消</button><button class="btn btn-primary" id="mC">确认</button></div></div>';
  document.body.appendChild(o);
  var done = false;
  function cl(r){ if(done)return; done=true; o.remove(); onOk(r); }
  o.addEventListener('click',function(e){if(e.target===o)cl(false);});
  document.getElementById('mc').addEventListener('click',function(){cl(false);});
  document.getElementById('mC').addEventListener('click',function(){cl(true);});
}
function showConfirmAsync(msg) {
  return new Promise(function(resolve) { showConfirm(msg, resolve); });
}

function showPrompt(title, def, cb) {
  var o=document.createElement('div');o.className='modal-overlay';
  o.innerHTML='<div class="modal"><h3>'+title+'</h3><input class="input" id="promptInput" value="'+esc(def)+'" style="margin:8px 0"><div class="btn-row"><button class="btn" id="mc">取消</button><button class="btn btn-primary" id="mC">确认</button></div></div>';
  document.body.appendChild(o);
  var done = false;
  function cl(v){ if(done)return; done=true; o.remove(); cb(v); }
  o.addEventListener('click',function(e){if(e.target===o)cl(null);});
  document.getElementById('mc').addEventListener('click',function(){cl(null);});
  document.getElementById('mC').addEventListener('click',function(){cl(document.getElementById('promptInput').value);});
}

(function(){
  var v = localStorage.getItem('fwh_theme');
  if(v==='dark') document.documentElement.classList.add('dark');
  else if(v==='light') document.documentElement.classList.add('light');
  else if(v==='poster'){ document.documentElement.classList.add('poster'); updatePosterWall(); }
  else if(window.matchMedia('(prefers-color-scheme:dark)').matches) document.documentElement.classList.add('dark');
  // 管理员设置的访客默认主题（仅对未手动选择过主题的用户生效）
  if(!v){
    fetch(org()+'/api/settings').then(function(r){ return r.json(); }).catch(function(){ return {}; }).then(function(s){
      var t = s && s.defaultTheme;
      if(!t || t === 'auto') return;
      var root = document.documentElement;
      root.classList.remove('dark','light','poster');
      if(t==='dark') root.classList.add('dark');
      else if(t==='light') root.classList.add('light');
      else if(t==='poster'){ root.classList.add('poster'); updatePosterWall(); }
    });
  }
})();

(function(){
  var link = document.getElementById('faviconLink');
  if (link && link.href) {
    var img = document.getElementById('headerIcon');
    if (img) { img.src = link.href; img.style.display = 'block'; }
  }
})();

checkAuth();
<\/script>
</body>
</html>`;
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    
    if (url.protocol === 'http:' && url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') {
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 308);
    }

    
    if (method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Cookie',
          'Access-Control-Max-Age': '86400'
        }
      });
    }

    
    const ADMIN_HASH = (await env.REX_KV.get('admin_password')) || (env.ADMIN_SECRET ? await sha256(env.ADMIN_SECRET) : '');
    const PUBLIC_HASH = env.PUBLIC_SECRET ? await sha256(env.PUBLIC_SECRET) : '';
    const clientIp = request.headers.get('CF-Connecting-IP') || 'unknown';
    function verifyAuth(r) {
      const c = (r.headers.get('Cookie')||'').match(/fwh_admin=([^;]+)/);
      return !!ADMIN_HASH && !!c && safeEqual(c[1], ADMIN_HASH);
    }
    function verifyPublicAuth(r) {
      const c = (r.headers.get('Cookie')||'').match(/fwh_pub=([^;]+)/);
      return !!PUBLIC_HASH && !!c && safeEqual(c[1], PUBLIC_HASH);
    }
    async function findSubscriber(req) {
      const c = (req.headers.get('Cookie')||'').match(/fwh_sub=([^;]+)/);
      if (!c) return null;
      const subs = await getSubscribers();
      return subs.find(x => x.id === c[1]) || null;
    }
    
    async function loginLocked(ip) {
      const n = parseInt((await env.REX_KV.get('rl:login:'+ip)) || '0', 10);
      return n >= 5;
    }
    async function addLoginFail(ip) {
      const k = 'rl:login:'+ip;
      const n = parseInt((await env.REX_KV.get(k)) || '0', 10) + 1;
      await env.REX_KV.put(k, String(n), { expirationTtl: 600 });
    }
    async function clearLoginFails(ip) { await env.REX_KV.delete('rl:login:'+ip); }

    async function getModules() { const d = await env.REX_KV.get('modules','json'); return d||[]; }
    async function saveModules(m) { await env.REX_KV.put('modules',JSON.stringify(m)); }
    async function getCollections() { const d = await env.REX_KV.get('collections','json'); return d||[]; }
    async function saveCollections(c) { await env.REX_KV.put('collections',JSON.stringify(c)); }
    async function getSubscribers() { const d = await env.REX_KV.get('subscribers','json'); return d||[]; }
    async function saveSubscribers(s) { await env.REX_KV.put('subscribers',JSON.stringify(s)); }

    
    if (path === '/api/admin/auth') {
      if (method === 'GET') return json({ enabled: !!ADMIN_HASH, authenticated: verifyAuth(request) });
      if (method === 'POST') {
        if (!ADMIN_HASH) return json({ error: 'server not configured' }, 503);
        if (await loginLocked(clientIp)) return json({ error: 'too many attempts, try again later' }, 429);
        const { password } = await request.json().catch(()=>({}));
        const hash = password ? await sha256(password) : '';
        if (!hash || !safeEqual(hash, ADMIN_HASH)) {
          await addLoginFail(clientIp);
          return json({ error: 'wrong password' }, 401);
        }
        await clearLoginFails(clientIp);
        return json({ ok: true }, 200, { 'Set-Cookie': 'fwh_admin='+hash+'; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400' });
      }
    }

    
    if (path === '/api/auth/subscriber') {
      if (method === 'GET') {
        const sub = await findSubscriber(request);
        if (!sub) return json({ authenticated: false });
        return json({ authenticated: true, quota: sub.quota, used: sub.used, remaining: Math.max(0,(sub.quota||0)-(sub.used||0)) });
      }
      if (method === 'POST') {
        if (await loginLocked(clientIp)) return json({ error: 'too many attempts, try again later' }, 429);
        const { password } = await request.json().catch(()=>({}));
        const subs = await getSubscribers();
        const sub = subs.find(x => x.password && safeEqual(x.password, password));
        if (!sub) { await addLoginFail(clientIp); return json({ error: 'wrong password' }, 401); }
        await clearLoginFails(clientIp);
        return json({ ok: true, quota: sub.quota, used: sub.used, remaining: Math.max(0,(sub.quota||0)-(sub.used||0)) }, 200, { 'Set-Cookie': 'fwh_sub='+sub.id+'; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400' });
      }
    }

    
    if (path === '/api/auth/public') {
      if (method === 'GET') return json({ enabled: !!PUBLIC_HASH, authenticated: verifyPublicAuth(request) });
      if (method === 'POST') {
        if (!PUBLIC_HASH) return json({ error: 'server not configured' }, 503);
        if (await loginLocked(clientIp)) return json({ error: 'too many attempts, try again later' }, 429);
        const { password } = await request.json().catch(()=>({}));
        const hash = password ? await sha256(password) : '';
        if (!hash || !safeEqual(hash, PUBLIC_HASH)) {
          await addLoginFail(clientIp);
          return json({ error: 'wrong password' }, 401);
        }
        await clearLoginFails(clientIp);
        return json({ ok: true }, 200, { 'Set-Cookie': 'fwh_pub='+hash+'; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400' });
      }
    }

    
    if (path === '/api/settings') {
      const getSt = async () => { try { const raw = await env.REX_KV.get('settings'); return raw ? JSON.parse(raw) : {}; } catch(e){ return {}; } };
      if (method === 'GET') {
        const st = await getSt();
        return json({ defaultTheme: st.defaultTheme || 'auto' });
      }
      if (method === 'PUT') {
        if (!verifyAuth(request)) return json({ error: 'Unauthorized' }, 401);
        const body = await request.json().catch(()=>({}));
        const t = ['auto','light','dark','poster'].indexOf(body.defaultTheme) >= 0 ? body.defaultTheme : 'auto';
        const st = await getSt();
        st.defaultTheme = t;
        await env.REX_KV.put('settings', JSON.stringify(st));
        return json({ ok: true, defaultTheme: t });
      }
    }

    
    if (path === '/api/admin/modules/import') {
      if (!verifyAuth(request)) return json({ error: 'Unauthorized' }, 401);
      if (method !== 'POST') return json({ error: 'Method not allowed' }, 405);
      const body = await request.json().catch(() => ({}));
      if (!body.url) return json({ error: 'url required' }, 400);
      const mods = await getModules();
      const now = Date.now();
      let filename = body.filename || '';
      try {
        const remoteResp = await fetch(body.url);
        if (!remoteResp.ok) return json({ error: 'Failed to fetch URL: '+remoteResp.status }, 400);
        const buf = await remoteResp.arrayBuffer();
        if (buf.byteLength > 25*1024*1024) return json({ error: 'File too large (KV limit 25MB)' }, 413);
        if (!filename) {
          const u = new URL(body.url);
          filename = u.pathname.split('/').pop() || 'import.js';
        }
        const meta = parseMeta(filename, new Uint8Array(buf.slice(0, 2048)));
        const exist = mods.find(m => m.source_url === body.url || (meta.id && m.widget_id === meta.id));
        const id = exist ? exist.id : genId();
        const mod = {
          id, filename,
          widget_id: meta.id || id,
          title: meta.title || filename.replace(/\.js$/, ''),
          version: meta.version || '', author: meta.author || '',
          file_size: buf.byteLength,
          is_encrypted: isEncrypted(new Uint8Array(buf)),
          source_url: body.url,
          note: exist ? (exist.note || '') : '',
          created_at: exist ? exist.created_at : now, updated_at: now
        };
        if (exist) mods[mods.indexOf(exist)] = mod; else mods.push(mod);
        await env.REX_KV.put('file:' + id, buf);
        await saveModules(mods);
        return json({ ok: true, added: exist ? [] : [mod], updated: exist ? [mod] : [] }, 201);
      } catch (e) {
        return json({ error: 'Failed to fetch: ' + e.message }, 400);
      }
    }

    
    if (path === '/api/admin/modules') {
      const mods = await getModules();
      if (method === 'GET') {
        if (!verifyAuth(request) && !(await findSubscriber(request)) && !verifyPublicAuth(request)) return json({ error: 'Unauthorized' }, 401);
        return json(mods);
      }
      if (!verifyAuth(request)) return json({ error: 'Unauthorized' }, 401);
      if (method === 'POST') {
        const ct = request.headers.get('content-type') || '';
        if (ct.includes('application/json')) {
          const body = await request.json().catch(()=>({}));
          const title = String(body.title || '').trim();
          const code = String(body.code || '');
          if (!title) return json({ error: '请输入模块名称' }, 400);
          if (!code.trim()) return json({ error: '请输入模块代码' }, 400);
          const now = Date.now();
          const id = genId();
          const buf = new TextEncoder().encode(code);
          const mod = { id: id, widget_id: id, filename: title.replace(/[^\w\u4e00-\u9fa5.\-]+/g, '_') + '.js', title: title, version: '', author: '', note: '', file_size: buf.byteLength, is_encrypted: false, official: true, created_at: now, updated_at: now };
          mods.push(mod);
          await env.REX_KV.put('file:' + id, buf);
          await saveModules(mods);
          const acols = await getCollections();
          let achanged = false;
          acols.forEach(c => { if (c.autoAll && Array.isArray(c.moduleIds) && c.moduleIds.indexOf(id) < 0) { c.moduleIds.push(id); c.updated_at = now; achanged = true; } });
          if (achanged) await saveCollections(acols);
          return json({ ok: true, id: id }, 201);
        }
        const fd = await request.formData();
        const files = fd.getAll('files');
        const now = Date.now(); const added = []; const updated = [];
        for (const file of files) {
          if (!(file instanceof File) || !file.name) continue;
          const buf = await file.arrayBuffer();
          if (buf.byteLength > 25*1024*1024) return json({ error: 'File too large (KV limit 25MB): ' + file.name }, 413);
          const meta = parseMeta(file.name, new Uint8Array(buf.slice(0,2048)));
          
          const exist = mods.find(m => (meta.id && m.widget_id === meta.id) || m.filename === file.name);
          const base = {
            filename: file.name,
            widget_id: meta.id || (exist ? exist.id : ''),
            title: meta.title || file.name.replace(/\.js$/,''),
            version: meta.version || '', author: meta.author || '',
            file_size: buf.byteLength,
            is_encrypted: isEncrypted(new Uint8Array(buf)),
            updated_at: now
          };
          if (exist) {
            Object.assign(exist, base);
            if (!meta.id) exist.widget_id = exist.id;
            await env.REX_KV.put('file:'+exist.id, buf);
            updated.push(exist);
          } else {
            const id = genId();
            const mod = Object.assign({ id, note: '', created_at: now }, base, { widget_id: meta.id || id });
            mods.push(mod);
            added.push(mod);
            await env.REX_KV.put('file:'+id, buf);
          }
        }
        if (added.length || updated.length) {
          await saveModules(mods);
          // 自动加入开启了「选择全部模块」的合集
          const acols = await getCollections();
          let achanged = false;
          for (const m of added) {
            acols.forEach(c => {
              if (c.autoAll && Array.isArray(c.moduleIds) && c.moduleIds.indexOf(m.id) < 0) {
                c.moduleIds.push(m.id);
                c.updated_at = Date.now();
                achanged = true;
              }
            });
          }
          if (achanged) await saveCollections(acols);
          return json({ ok: true, added, updated }, 201);
        }
        return json({ error: 'no valid files' }, 400);
      }
      if (method === 'DELETE') {
        const id = url.searchParams.get('id');
        const idx = mods.findIndex(m => m.id === id);
        if (idx === -1) return json({ error: 'Not found' }, 404);
        await env.REX_KV.delete('file:'+id);
        mods.splice(idx, 1);
        await saveModules(mods);
        const cols = await getCollections();
        let changed = false;
        cols.forEach(c => { if (c.moduleIds) { const before = c.moduleIds.length; c.moduleIds = c.moduleIds.filter(mid => mid !== id); if (before !== c.moduleIds.length) changed = true; } });
        if (changed) await saveCollections(cols);
        return json({ ok: true });
      }
      if (method === 'PATCH') {
        const body = await request.json().catch(() => ({}));
        const id = url.searchParams.get('id');
        const mod = mods.find(m => m.id === id);
        if (!mod) return json({ error: 'Not found' }, 404);
        if (body.title !== undefined) mod.title = body.title;
        if (body.version !== undefined) mod.version = body.version;
        if (body.author !== undefined) mod.author = body.author;
        if (body.note !== undefined) mod.note = body.note;
        mod.updated_at = Date.now();
        await saveModules(mods);
        return json({ ok: true });
      }
      if (method === 'PUT') {
        const id = url.searchParams.get('id');
        const mod = mods.find(m => m.id === id);
        if (!mod) return json({ error: 'Not found' }, 404);
        const fd = await request.formData();
        const file = fd.get('file');
        if (!(file instanceof File)) return json({ error: 'No file' }, 400);
        const buf = await file.arrayBuffer();
        if (buf.byteLength > 25*1024*1024) return json({ error: 'File too large (KV limit 25MB)' }, 413);
        const meta = parseMeta(file.name, new Uint8Array(buf.slice(0,2048)));
        mod.filename = file.name;
        mod.widget_id = meta.id || mod.id;
        mod.title = meta.title || file.name.replace(/\.js$/,'');
        mod.version = meta.version || '';
        mod.author = meta.author || '';
        mod.file_size = buf.byteLength;
        mod.is_encrypted = isEncrypted(new Uint8Array(buf));
        mod.updated_at = Date.now();
        await env.REX_KV.put('file:'+id, buf);
        await saveModules(mods);
        return json({ ok: true });
      }
    }

    
    const refreshMatch = path.match(/^\/api\/admin\/modules\/([^\/]+)\/refresh$/);
    if (refreshMatch) {
      if (method !== 'POST') return json({ error: 'Method not allowed' }, 405);
      if (!verifyAuth(request)) return json({ error: 'Unauthorized' }, 401);
      const modId = refreshMatch[1];
      const mods = await getModules();
      const mod = mods.find(m => m.id === modId);
      if (!mod) return json({ error: 'Not found' }, 404);
      if (!mod.source_url) return json({ error: 'No source URL' }, 400);
      try {
        const remoteResp = await fetch(mod.source_url);
        if (!remoteResp.ok) return json({ error: 'Failed to fetch: '+remoteResp.status }, 400);
        const buf = await remoteResp.arrayBuffer();
        if (buf.byteLength > 25*1024*1024) return json({ error: 'File too large (KV limit 25MB)' }, 413);
        const meta = parseMeta(mod.filename, new Uint8Array(buf.slice(0, 2048)));
        mod.title = meta.title || mod.title;
        mod.version = meta.version || '';
        mod.author = meta.author || '';
        mod.file_size = buf.byteLength;
        mod.is_encrypted = isEncrypted(new Uint8Array(buf));
        mod.updated_at = Date.now();
        await env.REX_KV.put('file:'+modId, buf);
        await saveModules(mods);
        return json({ ok: true });
      } catch (e) {
        return json({ error: 'Refresh failed: '+e.message }, 400);
      }
    }

    
    const sourceMatch = path.match(/^\/api\/admin\/modules\/([^\/]+)\/source$/);
    if (sourceMatch) {
      if (!verifyAuth(request)) return json({ error: 'Unauthorized' }, 401);
      const modId = sourceMatch[1];
      const mods = await getModules();
      const mod = mods.find(m => m.id === modId);
      if (!mod) return json({ error: 'Not found' }, 404);
      if (method === 'GET') {
        const buf = await env.REX_KV.get('file:'+modId, 'arrayBuffer');
        if (!buf) return json({ error: 'File not found' }, 404);
        const content = new TextDecoder().decode(buf);
        return json({ id: mod.id, filename: mod.filename, content, updated_at: mod.updated_at, is_encrypted: mod.is_encrypted });
      }
      if (method === 'POST') {
        const body = await request.json().catch(() => ({}));
        const content = typeof body.content === 'string' ? body.content : null;
        if (content === null) return json({ error: 'content required' }, 400);
        const bytes = new TextEncoder().encode(content);
        if (bytes.byteLength > 25*1024*1024) return json({ error: 'File too large (KV limit 25MB)' }, 413);
        const meta = parseMeta(mod.filename, bytes.slice(0, 2048));
        mod.widget_id = meta.id || mod.id;
        mod.title = meta.title || mod.title;
        mod.version = meta.version || '';
        mod.author = meta.author || '';
        mod.file_size = bytes.byteLength;
        mod.is_encrypted = isEncrypted(bytes);
        mod.updated_at = Date.now();
        await env.REX_KV.put('file:'+modId, bytes);
        await saveModules(mods);
        return json({ ok: true, file_size: bytes.byteLength, version: mod.version, title: mod.title });
      }
      return json({ error: 'Method not allowed' }, 405);
    }

    
    if (path === '/api/admin/change-password') {
      if (method !== 'POST') return json({ error: 'Method not allowed' }, 405);
      if (!verifyAuth(request)) return json({ error: 'Unauthorized' }, 401);
      const body = await request.json().catch(() => ({}));
      if (!body.password || body.password.length < 4) return json({ error: 'Password too short' }, 400);
      await env.REX_KV.put('admin_password', await sha256(body.password));
      return json({ ok: true });
    }

    
    if (path === '/api/admin/subscribers') {
      if (!verifyAuth(request)) return json({ error: 'Unauthorized' }, 401);
      const subs = await getSubscribers();
      if (method === 'GET') {
        return json(subs.map(s => ({ id: s.id, label: s.label || '', password: s.password || '', quota: s.quota, used: s.used||0, remaining: Math.max(0,(s.quota||0)-(s.used||0)), created_at: s.created_at })));
      }
      if (method === 'POST') {
        const body = await request.json().catch(()=>({}));
        const password = (body.password||'').trim();
        if (!password || password.length < 4) return json({ error: '密码至少 4 位' }, 400);
        if (subs.some(s => s.password === password)) return json({ error: '该订阅者密码已存在' }, 400);
        const quota = (typeof body.quota === 'number' && body.quota >= 0) ? Math.floor(body.quota) : 2;
        const sub = { id: genId(), label: (body.label||'').trim(), password: password, quota: quota, used: 0, created_at: Date.now() };
        subs.push(sub);
        await saveSubscribers(subs);
        return json({ ok: true, id: sub.id }, 201);
      }
      if (method === 'PATCH') {
        const body = await request.json().catch(()=>({}));
        const sub = subs.find(x => x.id === body.id);
        if (!sub) return json({ error: 'Not found' }, 404);
        if (typeof body.quota === 'number' && body.quota >= 0) sub.quota = Math.floor(body.quota);
        if (body.label !== undefined) sub.label = String(body.label).trim();
        await saveSubscribers(subs);
        return json({ ok: true });
      }
      if (method === 'DELETE') {
        const id = url.searchParams.get('id');
        const idx = subs.findIndex(x => x.id === id);
        if (idx === -1) return json({ error: 'Not found' }, 404);
        subs.splice(idx, 1);
        await saveSubscribers(subs);
        return json({ ok: true });
      }
      return json({ error: 'Method not allowed' }, 405);
    }

    
    if (path === '/api/admin/backup/restore' && method === 'POST') {
      if (!verifyAuth(request)) return json({ error: 'Unauthorized' }, 401);
      const body = await request.json().catch(() => ({}));
      const files = body.files || {};
      const mods = await getModules();
      let modCount = 0;
      for (const fid of Object.keys(files)) {
        const f = files[fid];
        if (!f || typeof f.content !== 'string') continue;
        const buf = new TextEncoder().encode(f.content).buffer;
        if (buf.byteLength > 25*1024*1024) continue;
        const filename = f.filename || 'restored.js';
        const meta = parseMeta(filename, new Uint8Array(buf.slice(0,2048)));
        const now = Date.now();
        const base = {
          filename,
          widget_id: meta.id || fid,
          title: meta.title || filename.replace(/\.js$/, ''),
          version: meta.version || '', author: meta.author || '',
          file_size: buf.byteLength,
          is_encrypted: isEncrypted(new Uint8Array(buf)),
          updated_at: now
        };
        const exist = mods.find(m => m.id === fid);
        if (exist) Object.assign(exist, base);
        else mods.push(Object.assign({ id: fid, note: '', created_at: now, source_url: f.source_url || '' }, base));
        await env.REX_KV.put('file:'+fid, buf);
        modCount++;
      }
      await saveModules(mods);
      const cols = await getCollections();
      const metaCols = (body.meta && body.meta.collections) || body.collections || [];
      let colCount = 0;
      for (const c0 of metaCols) {
        if (!c0 || !c0.title) continue;
        const exist = cols.find(c => c.id === c0.id);
        if (exist) {
          exist.slug = c0.slug || exist.slug;
          exist.title = c0.title;
          exist.description = c0.description || '';
          exist.icon_url = c0.icon_url || '';
          exist.moduleIds = c0.moduleIds || [];
          exist.updated_at = Date.now();
        } else {
          cols.push({
            id: c0.id || genId(),
            slug: c0.slug || pinyinSlug(c0.title),
            title: c0.title,
            description: c0.description || '', icon_url: c0.icon_url || '',
            moduleIds: c0.moduleIds || [],
            created_at: c0.created_at || Date.now(), updated_at: Date.now()
          });
        }
        colCount++;
      }
      await saveCollections(cols);
      return json({ ok: true, modules: modCount, collections: colCount });
    }

    
    if (path === '/api/admin/collections') {
      const admin = verifyAuth(request);
      const sub = await findSubscriber(request);
      const pub = verifyPublicAuth(request);
      if (!admin && !sub && !pub) return json({ error: 'Unauthorized' }, 401);
      const cols = await getCollections();
      const subTag = sub ? 'sub:'+sub.id : (pub ? 'pub' : '');
      if (method === 'GET') {
        const list = admin ? cols : cols.filter(c => c.owner === subTag);
        return json(list);
      }
      if (method === 'POST') {
        const body = await request.json().catch(()=>({}));
        const autoAll = body.autoAll === true;
        let moduleIds = Array.isArray(body.moduleIds) ? body.moduleIds.filter(function(x){ return typeof x === 'string' && x; }) : [];
        if (autoAll && moduleIds.length === 0) {
          const allMods = await getModules();
          moduleIds = allMods.map(m => m.id);
        }
        if (moduleIds.length === 0) return json({ error: '请至少选择一个模块' }, 400);
        const now = Date.now();
        let title, description, icon_url;
        if (pub) {
          // 公共用户组：固定模板（标题/描述/图标不可更改）
          title = '玛卡巴卡的自选模块';
          const host = (request.headers.get('Host')||'').split(':')[0];
          description = '在网站：' + host + ' 自选的玛卡巴卡的模块合集';
          icon_url = 'https://raw.githubusercontent.com/MakkaPakka518/FW/refs/heads/main/widgets/tubiao/Rex-Makka.JPEG';
          // 模块集合去重（不论顺序）：已有相同组合的公共合集则直接复用
          const sig = moduleIds.slice().sort().join(',');
          const dup = cols.find(c => c.owner === 'pub' && c.moduleIds && c.moduleIds.slice().sort().join(',') === sig);
          if (dup) return json({ ok: true, exists: true, id: dup.id, slug: dup.slug }, 200);
        } else {
          title = (body.title||'').trim();
          if (!title) return json({ error: 'title required' }, 400);
          if (sub && !/^[A-Za-z0-9]+$/.test(title)) return json({ error: '合集名称只能为数字或英文' }, 400);
          description = body.description || '';
          icon_url = body.icon_url || '';
        }
        if (sub && (sub.used||0) >= (sub.quota||0)) return json({ error: '已达生成次数上限，剩余 0 次' }, 403);
        const colId = genId();
        let slug = pinyinSlug(title) || 'col-'+now;
        if (cols.some(c => c.slug === slug)) slug = slug + '-' + colId.slice(0,8);
        const col = {
          id: colId, slug, title: title,
          description: description, icon_url: icon_url,
          moduleIds: moduleIds,
          autoAll: autoAll || false,
          owner: sub ? subTag : (pub ? 'pub' : 'admin'),
          created_at: now, updated_at: now
        };
        cols.push(col);
        await saveCollections(cols);
        if (sub) {
          const all = await getSubscribers();
          const s0 = all.find(x => x.id === sub.id);
          if (s0) { s0.used = (s0.used||0) + 1; await saveSubscribers(all); }
        }
        return json({ ok: true, id: col.id, slug: col.slug }, 201);
      }
      if (method === 'PATCH') {
        const body = await request.json().catch(()=>({}));
        const col = cols.find(c => c.id === body.id);
        if (!col) return json({ error: 'Not found' }, 404);
        if ((sub || pub) && col.owner !== subTag) return json({ error: 'Forbidden' }, 403);
        if (pub && (body.title !== undefined || body.description !== undefined || body.icon_url !== undefined)) {
          return json({ error: '公共用户合集标题/描述/图标为固定模板，不可修改' }, 403);
        }
        if (pub && (body.moduleIds !== undefined || body.autoAll !== undefined)) {
          return json({ error: '公共用户合集模块列表已锁定，不可手动增删' }, 403);
        }
        if (body.title !== undefined) {
          const t = String(body.title).trim();
          if ((sub || pub) && !/^[A-Za-z0-9]+$/.test(t)) return json({ error: '合集名称只能为数字或英文' }, 400);
          col.title = t;
        }
        if (body.description !== undefined) col.description = body.description;
        if (body.icon_url !== undefined) col.icon_url = body.icon_url;
        if (body.moduleIds !== undefined) col.moduleIds = body.moduleIds;
        if (body.autoAll !== undefined) {
          col.autoAll = body.autoAll === true;
          if (col.autoAll) {
            const allMods = await getModules();
            col.moduleIds = (Array.isArray(body.moduleIds) && body.moduleIds.length) ? body.moduleIds : allMods.map(m => m.id);
          }
        }
        col.updated_at = Date.now();
        await saveCollections(cols);
        return json({ ok: true });
      }
      if (method === 'DELETE') {
        const id = url.searchParams.get('id');
        const col = cols.find(c => c.id === id);
        if (!col) return json({ error: 'Not found' }, 404);
        if (sub && col.owner !== subTag) return json({ error: 'Forbidden' }, 403);
        cols.splice(cols.indexOf(col), 1);
        await saveCollections(cols);
        return json({ ok: true });
      }
      return json({ error: 'Method not allowed' }, 405);
    }

    
    const fwdMatch = path.match(/^\/api\/collections\/([^\/]+)(?:\/(rex|fwd))?$/);
    const fwdDotMatch = path.match(/^\/api\/collections\/(.+)\.(rex|fwd)$/);
    if (fwdMatch || fwdDotMatch) {
      const cols = await getCollections();
      const slugRaw = (fwdDotMatch ? fwdDotMatch[1] : fwdMatch[1]).replace(/\/(rex|fwd)$/, '');
      let slug = slugRaw;
      try { slug = decodeURIComponent(slugRaw); } catch (e) {  }
      const col = cols.find(c => c.slug === slug);
      if (!col) return json({ error: 'Not found' }, 404);
      const allMods = await getModules();
      const widgets = [];
      const colMods = col.moduleIds || [];
      if (colMods.length > 0) {
        for (const mid of colMods) {
          const m = allMods.find(x => x.id === mid);
          if (!m) continue;
          let wid = m.widget_id;
          if ((!wid || wid === m.id) && !m.is_encrypted) {
            try {
              const head = await env.REX_KV.get('file:'+mid, 'arrayBuffer');
              if (head) {
                const meta = parseMeta(m.filename, new Uint8Array(head.slice(0, 2048)));
                wid = meta.id || mid;
              }
            } catch(e) { wid = mid; }
          }
          wid = wid || mid;
          widgets.push({
            id: wid,
            title: m.title || m.filename,
            description: m.note || '',
            requiredVersion: '0.0.1',
            version: m.version || '1.0.0',
            author: m.author || '',
            url: url.origin + '/api/modules/' + m.id + '/raw'
          });
        }
      } else if (col.modules && Array.isArray(col.modules)) {
        for (const m of col.modules) {
          const mid = m.id;
          let wid = m.widget_id || mid;
          if (!m.is_encrypted) {
            try {
              const head = await env.REX_KV.get('file:'+mid, 'arrayBuffer');
              if (head) {
                const meta = parseMeta(m.filename, new Uint8Array(head.slice(0, 2048)));
                wid = meta.id || wid;
              }
            } catch(e) {}
          }
          widgets.push({
            id: wid,
            title: m.title || m.filename,
            description: m.note || '',
            requiredVersion: '0.0.1',
            version: m.version || '1.0.0',
            author: m.author || '',
            url: url.origin + '/api/modules/' + mid + '/raw'
          });
        }
      }
      return json({
        title: col.title, description: col.description || '',
        icon: col.icon_url || '',
        widgets: widgets
      }, 200, { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=60' });
    }

    
    const rawMatch = path.match(/^\/api\/modules\/([^\/]+)\/raw$/) || path.match(/^\/api\/modules\/([^\/]+)$/);
    if (rawMatch) {
      const buf = await env.REX_KV.get('file:'+rawMatch[1], 'arrayBuffer');
      if (!buf) return json({ error: 'File not found' }, 404);
      const mods = await getModules();
      const m = mods.find(x => x.id === rawMatch[1] || x.widget_id === rawMatch[1]);
      return new Response(buf, {
        headers: {
          'Content-Type': 'application/javascript; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=60'
        }
      });
    }

    
    
    const directMatch = path.match(/^\/([a-f0-9-]{36})(?:\.js)?$/);
    if (directMatch) {
      const buf = await env.REX_KV.get('file:'+directMatch[1], 'arrayBuffer');
      if (buf) {
        return new Response(buf, {
          headers: {
            'Content-Type': 'application/javascript; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=60'
          }
        });
      }
    }
    if (path.startsWith('/api/')) {
      return new Response('Not found', { status: 404 });
    }
    return new Response(HTML.replace(/<\\\/script>/g, '</script>'), {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'no-referrer'
      }
    });
  }
};

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), { status, headers: Object.assign({ 'Content-Type': 'application/json; charset=utf-8' }, extraHeaders) });
}

function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  var r = 0;
  for (var i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
async function sha256(t) {
  const d = new TextEncoder().encode(t);
  const h = await crypto.subtle.digest('SHA-256', d);
  return Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2,'0')).join('');
}
function genId() { return crypto.randomUUID(); }
function pinyinSlug(t) {
  return t.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g,'-').replace(/^-|-$/g,'').substring(0,60) || 'untitled';
}
function parseMeta(fn, head) {
  const t = new TextDecoder().decode(head);
  const meta = {};
  
  const m = t.match(/\/\*[\s\S]*?WidgetMetadata\s*\{/) || t.match(/WidgetMetadata\s*=\s*\{/);
  if (m) {
    
    let depth = 1;
    let start = m.index + m[0].length;
    let i = start;
    while (i < t.length && depth > 0) {
      if (t[i] === '{') depth++;
      else if (t[i] === '}') depth--;
      i++;
    }
    const body = t.slice(start, i - 1);
    
    const pairs = body.match(/(\w+)\s*:\s*"([^"]*)"/g);
    if (pairs) pairs.forEach(x => { const kv = x.match(/(\w+)\s*:\s*"([^"]*)"/); if (kv && !meta[kv[1]]) meta[kv[1]] = kv[2]; });
  }
  return meta;
}
function isEncrypted(buf) {
  for (let i = 0; i < Math.min(buf.length, 32); i++) {
    if (buf[i] === 0xAE || buf[i] === 0xFE) return 1;
  }
  return 0;
}
