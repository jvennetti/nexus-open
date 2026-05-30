(function(){
  // ── Styles ──
  var S=document.createElement('style');
  S.textContent='#nx-overlay{position:fixed;inset:0;background:#000;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;opacity:1;transition:opacity 0.45s ease;pointer-events:none;}#nx-overlay.blocking{pointer-events:all;}#nx-overlay.gone{opacity:0;}.nx-bar-wrap{width:240px;height:1px;background:rgba(0,200,255,0.1);position:relative;overflow:visible;}.nx-bar-fill{position:absolute;left:0;top:0;height:1px;width:0%;background:#00c8ff;box-shadow:0 0 8px rgba(0,200,255,0.9),0 0 18px rgba(0,200,255,0.4);transition:none;}.nx-st{font-family:"IBM Plex Mono",monospace;font-size:8px;letter-spacing:0.45em;color:rgba(0,200,255,0.38);text-transform:uppercase;}.nx-pc{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:0.18em;color:rgba(0,200,255,0.55);}#nx-audio-fix{position:fixed;top:14px;right:16px;z-index:9990;background:none;border:1px solid rgba(0,200,255,0.2);border-radius:3px;color:rgba(0,200,255,0.45);font-family:"IBM Plex Mono",monospace;font-size:13.5px;letter-spacing:0.18em;padding:9px 18px;cursor:pointer;text-transform:uppercase;display:none;transition:color 0.2s,border-color 0.2s;}#nx-audio-fix:hover{color:rgba(0,200,255,0.75);border-color:rgba(0,200,255,0.4);}';
  document.head.appendChild(S);

  // ── Mobile responsive styles ──
  var M=document.createElement('style');
  M.textContent='@media(max-width:768px){html{overflow-x:hidden}nav{padding:0 16px !important;height:56px !important;gap:12px !important}.nav-lesson-id,.nav-module-id,.nav-lesson-name{display:none !important}.wordmark{font-size:15px !important;letter-spacing:2px !important}.nav-back{font-size:10px !important;padding:7px 12px !important;letter-spacing:1px !important;white-space:nowrap !important}.browser-shell{width:100% !important;min-width:0 !important;overflow-x:hidden !important}.content-col{padding:20px 16px 80px !important;max-width:100% !important}.lesson-box{padding:22px 18px !important;border-radius:8px !important}h1.lesson-title{font-size:18px !important;letter-spacing:0.5px !important;margin-bottom:16px !important;text-align:left !important}.context-copy{font-size:14px !important;line-height:1.8 !important}.ts-bar{height:auto !important;flex-wrap:wrap !important;padding:14px 16px !important;gap:8px !important;border-radius:6px !important}.ts-label{width:100% !important;margin-bottom:2px !important;font-size:9px !important}.ts-input{width:100% !important;font-size:14px !important}.ts-saved-inline{width:100% !important;font-size:12px !important}.ts-btn{width:100% !important;text-align:center !important;padding:11px !important}textarea.notes-field{min-height:90px !important;padding:14px !important;font-size:14px !important;border-radius:6px !important}.takeaways-box{padding:22px 18px !important;border-radius:8px !important}.takeaways-title{font-size:15px !important;letter-spacing:2px !important;margin-bottom:16px !important}.takeaway-item{font-size:14px !important;line-height:1.65 !important;gap:10px !important;padding:5px 0 !important}.t-bullet{width:6px !important;height:6px !important;margin-top:7px !important}.lesson-nav{flex-direction:column !important;gap:10px !important;padding-top:28px !important}.lesson-nav .nav-btn{flex:unset !important;width:100% !important;padding:16px 18px !important}.lesson-nav .nav-btn.next{align-items:flex-start !important;text-align:left !important}.nav-name{font-size:13px !important;line-height:1.4 !important}.nav-dir{font-size:9px !important}.banner{height:180px !important}.banner-title{font-size:20px !important;letter-spacing:1px !important}.banner-label{bottom:24px !important}.scenario-box,.challenge-box,.deliverable-box{padding:22px 18px !important;border-radius:6px !important;margin-bottom:20px !important}.integration-note{padding:16px 18px !important;margin-bottom:28px !important}.section-title{font-size:12px !important;letter-spacing:1.5px !important;margin-bottom:12px !important}.challenge-title{font-size:14px !important;letter-spacing:1.5px !important;margin-bottom:18px !important}.body-copy{font-size:14px !important;line-height:1.8 !important}.step-list{gap:14px !important}.step-item{gap:12px !important}.step-num{width:28px !important;height:28px !important;font-size:11px !important;flex-shrink:0 !important;margin-top:0 !important}.step-text{font-size:14px !important;line-height:1.75 !important}.client-msg{padding:12px 14px !important;font-size:13px !important;margin:12px 0 !important}.integration-text{font-size:12px !important}.cta-row{padding-top:4px !important;margin-bottom:36px !important;gap:12px !important}.mark-complete-btn{padding:17px 28px !important;font-size:11px !important;letter-spacing:3px !important;width:100% !important;text-align:center !important;display:block !important;box-sizing:border-box !important}.cta-sub{font-size:10px !important}.prev-nav{justify-content:stretch !important}.prev-nav .nav-btn{max-width:100% !important;width:100% !important;padding:16px 18px !important}.ciro-scene-wrap{height:200px !important}.ciro-tx-panel{padding:22px 18px 26px !important}.tx-label{font-size:8px !important;letter-spacing:2px !important}.tx-name{font-size:13px !important;letter-spacing:3px !important;margin-bottom:16px !important}.ciro-line{font-size:13px !important;line-height:1.8 !important;margin-bottom:16px !important}.begin-btn{padding:13px 24px !important;font-size:11px !important;letter-spacing:2.5px !important;width:100% !important;justify-content:center !important;box-sizing:border-box !important}.completion-hero{padding:28px 0 20px !important}.completion-badge{width:110px !important;height:110px !important;font-size:42px !important}.achievement-unlocked{font-size:16px !important;letter-spacing:0.5px !important;white-space:normal !important;word-break:break-word !important}.debrief-wrap{flex-direction:column !important;gap:16px !important;padding:22px 18px !important;border-radius:8px !important}.debrief-robot-col{flex-direction:row !important;align-items:center !important;gap:12px !important}.hub-btn{padding:15px 28px !important;font-size:11px !important;letter-spacing:3px !important;width:100% !important;justify-content:center !important}.machine-btn{width:100% !important;justify-content:center !important}.hub-cta{gap:10px !important}.study-doc-btn{width:100% !important;justify-content:center !important;box-sizing:border-box !important}.auth-panel{width:94vw !important;min-width:0 !important}.panel-body{padding:22px 18px 24px !important}.warning-title{margin-bottom:18px !important}.panel-topbar{padding:10px 16px !important}#nx-sm-btn{display:none !important}.popup-box{width:94vw !important}html,body{height:auto !important;overflow-y:auto !important}.viewport{grid-template-columns:1fr !important;height:auto !important;overflow-y:auto !important}.ciro-col{height:260px !important;max-height:260px !important;border-right:none !important;border-bottom:1px solid rgba(0,200,255,0.1) !important;overflow:hidden !important}.ciro-figure{margin-top:0 !important}.ciro-figure svg{width:100px !important;height:auto !important}.static-block{padding:18px 20px 0 !important}.tx-zone{padding:12px 20px 0 !important}.big-title{font-size:38px !important;line-height:0.95 !important}.tx-line{font-size:14px !important;line-height:1.75 !important}#log-panel{width:calc(100vw - 32px) !important;box-sizing:border-box !important;padding:14px 16px 10px !important}.act-title-txt{font-size:26px !important;letter-spacing:0.06em !important}#ciro-col{display:none !important}#msg-scroll{padding:14px !important}.leadin-para{font-size:13px !important;line-height:1.7 !important}.ciro-para{font-size:13px !important;line-height:1.7 !important}#vanta-text{font-size:12px !important;line-height:1.7 !important}}';
  document.head.appendChild(M);

  var _isMobile=window.matchMedia&&window.matchMedia('(max-width:768px)').matches;
  window.nxVol=_isMobile?0.3:1.0;

  // ── Global bg audio registry (pages push their looping music here) ──
  window.__bgAudio=window.__bgAudio||[];
  var _visFadeIv=null;
  document.addEventListener('visibilitychange',function(){
    if(!_isMobile) return;
    if(document.hidden){
      if(_visFadeIv){clearInterval(_visFadeIv);_visFadeIv=null;}
      var _fadeTargets=[];
      (window.__bgAudio||[]).forEach(function(a){if(a&&typeof a.pause==='function'&&!a.paused){a._pausedByViz=true;a._fadeOrigVol=(typeof a.volume==='number')?a.volume:0.3;_fadeTargets.push(a);}});
      ['_ciroSong'].forEach(function(k){var a=window[k];if(a&&typeof a.pause==='function'&&!a.paused){a._pausedByViz=true;a._fadeOrigVol=(typeof a.volume==='number')?a.volume:0.18;_fadeTargets.push(a);}});
      if(_fadeTargets.length){
        var _fadeStep=0,_fadeSteps=60;
        _visFadeIv=setInterval(function(){
          _fadeStep++;
          var ratio=Math.max(0,1-_fadeStep/_fadeSteps);
          _fadeTargets.forEach(function(a){if(a&&typeof a.volume==='number')a.volume=a._fadeOrigVol*ratio;});
          if(_fadeStep>=_fadeSteps){clearInterval(_visFadeIv);_visFadeIv=null;_fadeTargets.forEach(function(a){if(a&&typeof a.pause==='function')a.pause();});}
        },50);
      }
    } else {
      if(_visFadeIv){clearInterval(_visFadeIv);_visFadeIv=null;}
      (window.__bgAudio||[]).forEach(function(a){if(a&&a._pausedByViz){a._pausedByViz=false;if(a._fadeOrigVol!==undefined)a.volume=a._fadeOrigVol;if(typeof a.play==='function')a.play().catch(function(){});}});
      ['_ciroSong'].forEach(function(k){var a=window[k];if(a&&a._pausedByViz){a._pausedByViz=false;if(a._fadeOrigVol!==undefined)a.volume=a._fadeOrigVol;if(typeof a.play==='function')a.play().catch(function(){});}});
    }
  });
  // First-touch unlock for iOS autoplay restrictions
  document.addEventListener('touchstart',function(){
    (window.__bgAudio||[]).forEach(function(a){if(a&&a.paused&&typeof a.play==='function')a.play().catch(function(){});});
    if(window._ciroSong&&window._ciroSong.paused)window._ciroSong.play().catch(function(){});
  },{passive:true,once:true});

  // ── Preload all 3 transition sounds using script's own absolute URL ──
  var _base='';
  try{ if(document.currentScript&&document.currentScript.src) _base=document.currentScript.src.replace(/\/[^\/]*$/,'/'); }catch(e){}
  var _sfxEls=['audio/sfx/transition-1.wav','audio/sfx/transition-2.wav','audio/sfx/transition-3.wav'].map(function(f){
    var el=document.createElement('audio');
    el.src=_base+f;
    el.preload='auto';
    el.volume=0.025*window.nxVol;
    document.head.appendChild(el);
    return el;
  });

  // ── Overlay DOM ──
  var ov=document.createElement('div');
  ov.id='nx-overlay';
  ov.innerHTML='<div class="nx-st" id="nx-status"></div><div class="nx-bar-wrap"><div class="nx-bar-fill" id="nx-fill"></div></div><div class="nx-pc" id="nx-pct"></div>';
  document.body.insertBefore(ov,document.body.firstChild);

  var fill=document.getElementById('nx-fill');
  var pct=document.getElementById('nx-pct');
  var status=document.getElementById('nx-status');

  // ── "No Music?" fallback button ──
  var muBtn=document.createElement('button');
  muBtn.id='nx-audio-fix';
  muBtn.textContent='No Music? Click Here';
  muBtn.addEventListener('click',function(){
    [].forEach.call(document.querySelectorAll('audio'),function(a){ if(a.paused&&a.src) a.play().catch(function(){}); });
    ['_ciroSong','_machineAmb'].forEach(function(k){ if(window[k]&&window[k].paused) window[k].play().catch(function(){}); });
    (window.__bgAudio||[]).forEach(function(a){ if(a&&a.paused) a.play().catch(function(){}); });
    muBtn.style.display='none';
  });
  document.body.appendChild(muBtn);
  // Show button only if this page has bg audio that failed to autoplay
  setTimeout(function(){
    var hasBg=false,anyPlaying=false;
    (window.__bgAudio||[]).forEach(function(a){ if(a){hasBg=true;if(!a.paused)anyPlaying=true;} });
    ['_ciroSong','_machineAmb'].forEach(function(k){ if(window[k]){hasBg=true;if(!window[k].paused)anyPlaying=true;} });
    if(hasBg&&!anyPlaying) muBtn.style.display='block';
  },900);

  // ── Fade in on page load (overlay starts black, fades to clear) ──
  function fadeIn(){
    fill.style.width='0%';
    pct.textContent='';
    status.textContent='';
    setTimeout(function(){
      ov.classList.add('gone');
      setTimeout(function(){ ov.classList.remove('blocking'); },500);
    },80);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){ setTimeout(fadeIn,60); });
  } else {
    setTimeout(fadeIn,60);
  }
  window.addEventListener('pageshow',function(e){ if(e.persisted) fadeIn(); });

  // ── Auto tab title from URL ──
  (function(){
    var p=window.location.pathname;
    var m=p.match(/lesson-(\d+)-(\d+)/);
    if(m){ document.title='Lesson '+m[1]+'.'+m[2]+' · NEXUS Academy'; return; }
    var mi=p.match(/module-(\d+)\/intro/);
    if(mi){ document.title='Module '+mi[1]+' Intro · NEXUS Academy'; return; }
    if(/pre-course\/module-intro/.test(p)||/pre-course\/ciro-intro/.test(p)||/\/ciro-intro/.test(p)){ document.title='Pre-Course Intro · NEXUS Academy'; return; }
    var mc=p.match(/module-(\d+)\/complete/);
    if(mc){ document.title='Module '+mc[1]+' Complete · NEXUS Academy'; return; }
    if(/pre-course\/complete/.test(p)){ document.title='Pre-Course Complete · NEXUS Academy'; return; }
  })();

  var _lastSfxIdx=-1;

  // ── Transition out ──
  function runTransition(href,skipSound){
    if(window.nxSmFadeOut) window.nxSmFadeOut(2);
    (function(){
      var iframes=document.querySelectorAll('iframe[src*="youtube.com"],iframe[src*="youtube-nocookie.com"]');
      if(!iframes.length) return;
      var steps=30,i=0;
      var iv=setInterval(function(){
        i++;
        var vol=Math.max(0,Math.round(100*(1-i/steps)));
        [].forEach.call(iframes,function(fr){
          try{ fr.contentWindow.postMessage(JSON.stringify({event:'command',func:'setVolume',args:[vol]}),'*'); }catch(e){}
        });
        if(i>=steps) clearInterval(iv);
      },100);
    })();
    ov.classList.remove('gone');
    ov.classList.add('blocking');
    fill.style.width='0%';
    pct.textContent='0%';
    status.textContent='LOADING';
    if(!skipSound){
      // Weighted pick: sound 3 (idx 2) = 50%, sounds 1&2 = 25% each. No repeat in a row.
      var pool=[];
      for(var i=0;i<_sfxEls.length;i++){
        if(i===_lastSfxIdx) continue;
        var w=(i===2)?2:1;
        for(var wi=0;wi<w;wi++) pool.push(i);
      }
      var idx=pool[Math.floor(Math.random()*pool.length)];
      _lastSfxIdx=idx;
      var sfx=_sfxEls[idx];
      sfx.currentTime=0;
      sfx.play().catch(function(){});
    }

    // 3 speed variants: [progress%, time_ms] keyframes
    var variants=[
      [[0,0],[18,550],[40,1200],[65,2000],[85,2600],[100,3000]],
      [[0,0],[42,450],[43,950],[68,1500],[69,2000],[90,2500],[100,3000]],
      [[0,0],[12,700],[14,1400],[14,1900],[55,2300],[100,3000]]
    ];
    var kfs=variants[Math.floor(Math.random()*3)];
    var labels=['LOADING','SCANNING MEMORY','INITIALIZING'];
    var start=null,kfi=0;

    function tick(ts){
      if(!start) start=ts;
      var e=ts-start;
      status.textContent=labels[Math.min(Math.floor(e/1000),labels.length-1)];
      while(kfi<kfs.length-1&&e>=kfs[kfi+1][1]) kfi++;
      var c=kfs[kfi],n=kfs[Math.min(kfi+1,kfs.length-1)];
      var p=c===n?c[0]:c[0]+(n[0]-c[0])*Math.min(1,(e-c[1])/(n[1]-c[1]));
      fill.style.width=p.toFixed(1)+'%';
      pct.textContent=Math.round(p)+'%';
      if(e<kfs[kfs.length-1][1]){ requestAnimationFrame(tick); }
      else {
        fill.style.width='100%'; pct.textContent='100%';
        setTimeout(function(){ window.location.href=href; },120);
      }
    }
    requestAnimationFrame(tick);
  }

  window.nxTransit=runTransition;

  // ── Study music (challenge pages only) ──
  if(/\/module-\d+\/challenge/.test(window.location.pathname)){
    var _smCSS=document.createElement('style');
    _smCSS.textContent='#nx-sm-btn{position:fixed;bottom:24px;right:24px;display:flex;align-items:center;gap:8px;background:rgba(10,18,34,0.96);border:1px solid rgba(0,200,255,0.28);border-radius:28px;padding:10px 16px;cursor:pointer;z-index:980;transition:border-color .25s,box-shadow .25s;user-select:none;backdrop-filter:blur(12px);box-shadow:0 4px 24px rgba(0,0,0,0.45);}#nx-sm-btn[data-on]{cursor:default;border-color:rgba(0,200,255,0.6);box-shadow:0 4px 24px rgba(0,0,0,0.45),0 0 22px rgba(0,200,255,0.3);animation:sm-pulse 2.4s ease-in-out infinite;}#nx-sm-btn:not([data-on]):hover{border-color:rgba(0,200,255,0.55);box-shadow:0 4px 24px rgba(0,0,0,0.45),0 0 16px rgba(0,200,255,0.18);}@keyframes sm-pulse{0%,100%{box-shadow:0 4px 24px rgba(0,0,0,0.45),0 0 16px rgba(0,200,255,0.2);}50%{box-shadow:0 4px 24px rgba(0,0,0,0.45),0 0 30px rgba(0,200,255,0.38);}}.sm-icon{font-size:18px;line-height:1;color:#4a7a9a;transition:color .25s;flex-shrink:0;}#nx-sm-btn[data-on] .sm-icon{color:#00c8ff;}.sm-lbl{font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:#4a7a9a;white-space:nowrap;transition:color .25s;line-height:1.3;}#nx-sm-btn:not([data-on]):hover .sm-lbl{color:#8ab8cc;}.sm-dots{display:flex;align-items:center;gap:5px;margin:0 2px;}.sm-dot{width:5px;height:5px;border-radius:50%;background:rgba(0,200,255,0.15);transition:background .25s,transform .25s;flex-shrink:0;}.sm-dot.sm-dot-on{background:#00c8ff;transform:scale(1.35);}.sm-arr{background:none;border:none;padding:2px 6px;cursor:pointer;color:rgba(0,200,255,0.4);font-size:17px;line-height:1;transition:color .2s;flex-shrink:0;display:flex;align-items:center;font-family:"IBM Plex Mono",monospace;}.sm-arr:hover{color:#00c8ff;}.sm-off{background:none;border:none;padding:2px 0 2px 10px;cursor:pointer;color:rgba(0,200,255,0.25);font-size:11px;line-height:1;transition:color .2s;border-left:1px solid rgba(0,200,255,0.15);margin-left:2px;flex-shrink:0;}.sm-off:hover{color:rgba(220,70,70,0.9);}';
    document.head.appendChild(_smCSS);
    // Web Audio API — gapless looping, 4 tracks
    var _smCtx=null,_smGain=null,_smSrc=null,_smBufs=[null,null,null,null];
    var _smTrk=Math.floor(Math.random()*4);
    var _smFiles=[
      _base+'audio/music/study-music.mp3',
      _base+'audio/music/study-music_2.mp3',
      _base+'audio/music/study-music_3.mp3',
      _base+'audio/music/study-music_4.mp3'
    ];
    function _smCtxInit(){
      if(!_smCtx){
        _smCtx=new(window.AudioContext||window.webkitAudioContext)();
        _smGain=_smCtx.createGain();
        _smGain.gain.value=0;
        _smGain.connect(_smCtx.destination);
      }
      if(_smCtx.state==='suspended') _smCtx.resume().catch(function(){});
    }
    function _smFetch(i,cb){
      if(_smBufs[i]){cb(_smBufs[i]);return;}
      _smCtxInit();
      fetch(_smFiles[i]).then(function(r){return r.arrayBuffer();}).then(function(ab){return _smCtx.decodeAudioData(ab);}).then(function(buf){_smBufs[i]=buf;cb(buf);}).catch(function(){cb(null);});
    }
    function _smStartNode(buf,offset){
      if(!buf) return;
      if(_smSrc){try{_smSrc.stop();}catch(e){}}_smSrc=null;
      var n=_smCtx.createBufferSource();
      n.buffer=buf;n.loop=true;n.connect(_smGain);
      n.start(0,(offset||0)%buf.duration);
      _smSrc=n;
    }
    function _smBeep(on){
      try{
        var ac=new(window.AudioContext||window.webkitAudioContext)();
        var o=ac.createOscillator(),g=ac.createGain();
        o.connect(g);g.connect(ac.destination);
        o.frequency.value=on?880:528;
        g.gain.setValueAtTime(0.07,ac.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.16);
        o.start();o.stop(ac.currentTime+0.16);
        setTimeout(function(){ac.close();},300);
      }catch(e){}
    }
    function _smFadeIn(sec){
      var t=_smCtx.currentTime;
      _smGain.gain.cancelScheduledValues(t);
      _smGain.gain.setValueAtTime(0,t);
      _smGain.gain.linearRampToValueAtTime(0.6,t+(sec||3));
    }
    function _smPlay(){
      _smCtxInit();
      _smFetch(_smTrk,function(buf){
        if(!buf) return;
        _smStartNode(buf,0);
        _smFadeIn(2);
      });
    }
    function _smStop(){
      if(!_smCtx) return;
      var t=_smCtx.currentTime;
      _smGain.gain.cancelScheduledValues(t);
      _smGain.gain.setValueAtTime(_smGain.gain.value,t);
      _smGain.gain.linearRampToValueAtTime(0,t+0.5);
      setTimeout(function(){if(_smSrc){try{_smSrc.stop();}catch(e){}}_smSrc=null;},600);
    }
    window.nxSmFadeOut=function(sec){
      if(!_smCtx||!_smSrc) return;
      var t=_smCtx.currentTime;
      _smGain.gain.cancelScheduledValues(t);
      _smGain.gain.setValueAtTime(_smGain.gain.value,t);
      _smGain.gain.linearRampToValueAtTime(0,t+(sec||2));
    };
    function _smSkip(dir){
      _smTrk=(_smTrk+dir+4)%4;
      var t=_smCtx.currentTime;
      _smGain.gain.cancelScheduledValues(t);
      _smGain.gain.setValueAtTime(_smGain.gain.value,t);
      _smGain.gain.linearRampToValueAtTime(0,t+0.35);
      setTimeout(function(){_smFetch(_smTrk,function(buf){if(buf){_smStartNode(buf,0);_smFadeIn(1.5);}});},420);
      _smBtn.querySelectorAll('.sm-dot').forEach(function(d,i){d.className='sm-dot'+(i===_smTrk?' sm-dot-on':'');});
    }
    var _smBtn=document.createElement('div');
    _smBtn.id='nx-sm-btn';
    function _smDotsHTML(){
      return '<span class="sm-dots">'+[0,1,2,3].map(function(i){return '<span class="sm-dot'+(i===_smTrk?' sm-dot-on':'')+'"></span>';}).join('')+'</span>';
    }
    function _smRenderOff(){
      _smBtn.removeAttribute('data-on');
      _smBtn.innerHTML='<span class="sm-icon">♪</span><span class="sm-lbl">Want study music?</span>';
      _smBtn.onclick=function(){_smCtxInit();_smPlay();_smBeep(true);_smRenderOn();};
    }
    function _smRenderOn(){
      _smBtn.setAttribute('data-on','');
      _smBtn.innerHTML='<button class="sm-arr sm-prev">‹</button><span class="sm-icon">♪</span>'+_smDotsHTML()+'<button class="sm-arr sm-next">›</button><button class="sm-off">✕</button>';
      _smBtn.onclick=null;
      _smBtn.querySelector('.sm-prev').addEventListener('click',function(e){e.stopPropagation();_smSkip(-1);});
      _smBtn.querySelector('.sm-next').addEventListener('click',function(e){e.stopPropagation();_smSkip(1);});
      _smBtn.querySelector('.sm-off').addEventListener('click',function(e){e.stopPropagation();_smStop();_smBeep(false);_smRenderOff();});
    }
    _smRenderOff();
    window.addEventListener('pageshow',function(e){
      if(!e.persisted) return;
      _smTrk=Math.floor(Math.random()*4);
      _smRenderOff();
    });
    // Background-preload all tracks after page settles
    setTimeout(function(){[0,1,2,3].forEach(function(i){_smFetch(i,function(){});});},3000);
    document.body.appendChild(_smBtn);
  }

  // ── Intercept anchor clicks ──
  document.addEventListener('click',function(ev){
    var a=ev.target.closest('a[href]');
    if(!a||a.hasAttribute('data-no-transit')) return;
    var href=a.getAttribute('href');
    if(!href||href.charAt(0)==='#'||/^(javascript|mailto|tel):/i.test(href)) return;
    if(/^https?:/i.test(href)) return;
    if(/lesson-\d+-\d+/.test(window.location.pathname)&&/lesson-\d+-\d+/.test(a.href)) return;
    // Skip transition sound if the click also triggers a power_on effect
    var oc=a.getAttribute('onclick')||'';
    var skipSound=/pickPower|power_on_/.test(oc);
    ev.preventDefault();
    runTransition(a.href,skipSound);
  });
})();
