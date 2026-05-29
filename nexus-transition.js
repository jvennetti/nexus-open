(function(){
  // ── Styles ──
  var S=document.createElement('style');
  S.textContent='#nx-overlay{position:fixed;inset:0;background:#000;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;opacity:1;transition:opacity 0.45s ease;pointer-events:none;}#nx-overlay.blocking{pointer-events:all;}#nx-overlay.gone{opacity:0;}.nx-bar-wrap{width:240px;height:1px;background:rgba(0,200,255,0.1);position:relative;overflow:visible;}.nx-bar-fill{position:absolute;left:0;top:0;height:1px;width:0%;background:#00c8ff;box-shadow:0 0 8px rgba(0,200,255,0.9),0 0 18px rgba(0,200,255,0.4);transition:none;}.nx-st{font-family:"IBM Plex Mono",monospace;font-size:8px;letter-spacing:0.45em;color:rgba(0,200,255,0.38);text-transform:uppercase;}.nx-pc{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:0.18em;color:rgba(0,200,255,0.55);}#nx-audio-fix{position:fixed;top:14px;right:16px;z-index:9990;background:none;border:1px solid rgba(0,200,255,0.2);border-radius:3px;color:rgba(0,200,255,0.45);font-family:"IBM Plex Mono",monospace;font-size:13.5px;letter-spacing:0.18em;padding:9px 18px;cursor:pointer;text-transform:uppercase;display:none;transition:color 0.2s,border-color 0.2s;}#nx-audio-fix:hover{color:rgba(0,200,255,0.75);border-color:rgba(0,200,255,0.4);}';
  document.head.appendChild(S);

  // ── Global bg audio registry (pages push their looping music here) ──
  window.__bgAudio=window.__bgAudio||[];

  // ── Preload all 3 transition sounds using script's own absolute URL ──
  var _base='';
  try{ if(document.currentScript&&document.currentScript.src) _base=document.currentScript.src.replace(/\/[^\/]*$/,'/'); }catch(e){}
  var _sfxEls=['audio/sfx/transition-1.wav','audio/sfx/transition-2.wav','audio/sfx/transition-3.wav'].map(function(f){
    var el=document.createElement('audio');
    el.src=_base+f;
    el.preload='auto';
    el.volume=0.025;
    document.head.appendChild(el);
    return el;
  });

  // ── Overlay DOM ──
  var ov=document.createElement('div');
  ov.id='nx-overlay';
  ov.innerHTML='<div class="nx-st" id="nx-status">LOADING</div><div class="nx-bar-wrap"><div class="nx-bar-fill" id="nx-fill"></div></div><div class="nx-pc" id="nx-pct">0%</div>';
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
    var isHub=/\bhub(-[a-z]+)?\.html/i.test(window.location.href);
    if(isHub&&hasBg&&!anyPlaying) muBtn.style.display='block';
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

  // ── Study music toggle (lesson + challenge pages) ──
  if(/\/lesson-\d+-\d+/.test(window.location.pathname)||/\/module-\d+\/challenge/.test(window.location.pathname)){
    var _smCSS=document.createElement('style');
    _smCSS.textContent='#nx-sm-btn{position:fixed;bottom:24px;right:24px;display:flex;align-items:center;gap:10px;background:rgba(10,18,34,0.96);border:1px solid rgba(0,200,255,0.28);border-radius:28px;padding:11px 20px 11px 16px;cursor:pointer;z-index:980;transition:all .25s;user-select:none;backdrop-filter:blur(12px);box-shadow:0 4px 24px rgba(0,0,0,0.45),0 0 0 rgba(0,200,255,0);}#nx-sm-btn:hover{border-color:rgba(0,200,255,0.55);box-shadow:0 4px 24px rgba(0,0,0,0.45),0 0 16px rgba(0,200,255,0.18);}#nx-sm-btn[data-on]{border-color:rgba(0,200,255,0.6);box-shadow:0 4px 24px rgba(0,0,0,0.45),0 0 22px rgba(0,200,255,0.3);animation:sm-pulse 2.4s ease-in-out infinite;}@keyframes sm-pulse{0%,100%{box-shadow:0 4px 24px rgba(0,0,0,0.45),0 0 16px rgba(0,200,255,0.2);}50%{box-shadow:0 4px 24px rgba(0,0,0,0.45),0 0 30px rgba(0,200,255,0.38);}}.sm-icon{font-size:18px;line-height:1;color:#4a7a9a;transition:color .25s;flex-shrink:0;}#nx-sm-btn[data-on] .sm-icon{color:#00c8ff;}.sm-text{font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:#4a7a9a;white-space:nowrap;transition:color .25s;line-height:1.3;}#nx-sm-btn:hover .sm-text{color:#8ab8cc;}#nx-sm-btn[data-on] .sm-text{color:#00c8ff;}';
    document.head.appendChild(_smCSS);
    var _smAudio=new Audio(_base+'audio/music/study-music-1.mp3');
    _smAudio.loop=true;
    _smAudio.volume=0.28;
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
    var _smBtn=document.createElement('div');
    _smBtn.id='nx-sm-btn';
    _smBtn.innerHTML='<span class="sm-icon">♪</span><span class="sm-text">Want study music? Click here</span>';
    var _smIcon=_smBtn.querySelector('.sm-icon');
    var _smTxt=_smBtn.querySelector('.sm-text');
    var _smOn=localStorage.getItem('nexus_study_music')==='1';
    if(_smOn){_smBtn.setAttribute('data-on','');_smTxt.textContent='Study music — on';_smAudio.play().catch(function(){});}
    _smBtn.addEventListener('click',function(){
      if(_smBtn.hasAttribute('data-on')){
        _smAudio.pause();_smBtn.removeAttribute('data-on');
        _smTxt.textContent='Want study music? Click here';
        localStorage.setItem('nexus_study_music','0');
        _smBeep(false);
      } else {
        _smAudio.play().catch(function(){});_smBtn.setAttribute('data-on','');
        _smTxt.textContent='Study music — on';
        localStorage.setItem('nexus_study_music','1');
        _smBeep(true);
      }
    });
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
