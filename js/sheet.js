/* Detail pages open as a sheet over the portfolio instead of leaving it, so the
   score keeps playing and the move itself is a gesture. The real pages still work
   on their own: the URL changes to them, a reload lands on the standalone page. */
(function(){
  const sheet=document.createElement('aside');
  sheet.className='sheet';sheet.setAttribute('aria-modal','true');sheet.setAttribute('role','dialog');sheet.hidden=true;
  sheet.innerHTML='<div class="sheet-bar"><button class="sheet-back" type="button" data-hover>← Back</button><span class="sheet-title"></span></div><div class="sheet-body"></div>';
  document.body.appendChild(sheet);
  const body=sheet.querySelector('.sheet-body'),title=sheet.querySelector('.sheet-title');
  const styles=new Set();let open=false,players=[],scrollAt=0,ytReady=null;

  const emit=(name,detail)=>document.dispatchEvent(new CustomEvent(name,{detail}));

  /* lift the page's own rules into the sheet, scoped, skipping global resets and the standalone chrome */
  const cssCache={};
  async function adoptStyles(doc,url){
    const hrefs=[...doc.querySelectorAll('link[rel="stylesheet"]')].map(l=>new URL(l.getAttribute('href'),new URL(url,location.href)).href);
    const key=hrefs.join('|')+'#'+doc.querySelectorAll('style').length;
    if(styles.has(key))return;styles.add(key);
    const texts=await Promise.all(hrefs.map(async h=>cssCache[h]??(cssCache[h]=await (await fetch(h)).text())));
    texts.push(...[...doc.querySelectorAll('style')].map(s=>s.textContent));
    const skip=/^(html|body|\*|:root|::selection|nav\b|\.back|\.proj-foot|\.cursor-|#loader|\.l-)/;
    const scope=sel=>sel.split(',').map(s=>'.sheet-body '+s.trim()).join(',');
    const out=[];
    for(const text of texts){
      const probe=document.createElement('style');probe.textContent=text;document.head.appendChild(probe);probe.sheet.disabled=true;
      const walk=(rules,sink)=>{for(const r of rules){
        if(r.type===CSSRule.STYLE_RULE){if(!skip.test(r.selectorText))sink.push(scope(r.selectorText)+'{'+r.style.cssText+'}');}
        else if(r.type===CSSRule.MEDIA_RULE){const inner=[];walk(r.cssRules,inner);if(inner.length)sink.push('@media '+r.conditionText+'{'+inner.join('')+'}');}
        else if(r.type===CSSRule.KEYFRAMES_RULE)sink.push(r.cssText);
      }};
      walk(probe.sheet.cssRules,out);probe.remove();
    }
    const tag=document.createElement('style');tag.dataset.sheet=key;tag.textContent=out.join('\n');document.head.appendChild(tag);
  }

  /* YouTube: ask for the API so a playing video can duck the score */
  function youtube(){
    if(ytReady)return ytReady;
    ytReady=new Promise(ok=>{
      if(window.YT&&YT.Player)return ok();
      const prev=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{prev&&prev();ok();};
      const s=document.createElement('script');s.src='https://www.youtube.com/iframe_api';document.head.appendChild(s);
    });
    return ytReady;
  }
  async function wireVideos(){
    const frames=[...body.querySelectorAll('iframe[src*="youtube.com/embed/"]')];
    if(!frames.length)return;
    frames.forEach(f=>{const u=new URL(f.src);u.searchParams.set('enablejsapi','1');u.searchParams.set('origin',location.origin);f.src=u.toString();});
    await youtube();
    if(!open)return;
    players=frames.map(f=>new YT.Player(f,{events:{onStateChange:e=>{
      const playing=players.some(p=>{try{return p.getPlayerState()===YT.PlayerState.PLAYING;}catch(x){return false;}});
      emit('score:duck',{on:playing});
    }}}));
  }

  async function show(url,push){
    const res=await fetch(url,{cache:'force-cache'});if(!res.ok){location.href=url;return;}
    const doc=new DOMParser().parseFromString(await res.text(),'text/html');
    await adoptStyles(doc,url);
    title.textContent=(doc.querySelector('.proj-hero h1')||doc.querySelector('h1'))?.textContent||'';
    body.replaceChildren(...[...doc.body.children].filter(el=>!el.matches('.back,.proj-foot,script')));
    body.querySelectorAll('a[href^="index.html"],a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();close();}));
    /* outbound links open beside the portfolio so the score keeps playing here */
    body.querySelectorAll('a[href^="http"]').forEach(a=>{if(new URL(a.href).origin!==location.origin){a.target='_blank';a.rel='noopener';}});
    /* next-project links stay inside the sheet */
    body.querySelectorAll('a[href$=".html"]:not([href^="index.html"]):not([target])').forEach(a=>a.addEventListener('click',e=>{
      if(e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;
      e.preventDefault();sheet.classList.remove('is-open');setTimeout(()=>show(a.getAttribute('href'),true),250);
    }));
    body.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>document.body.classList.add('hovering'));el.addEventListener('mouseleave',()=>document.body.classList.remove('hovering'));});
    if(push)history.pushState({sheet:url},'',url);
    scrollAt=scrollY;open=true;sheet.hidden=false;sheet.scrollTop=0;
    document.documentElement.classList.add('sheet-open');
    requestAnimationFrame(()=>requestAnimationFrame(()=>sheet.classList.add('is-open')));
    emit('score:detail',{open:true});
    sheet.querySelector('.sheet-back').focus({preventScroll:true});
    wireVideos();
  }
  function close(){
    if(!open)return;open=false;
    players.forEach(p=>{try{p.destroy();}catch(e){}});players=[];
    emit('score:duck',{on:false});emit('score:detail',{open:false});
    sheet.classList.remove('is-open');
    document.documentElement.classList.remove('sheet-open');
    scrollTo({top:scrollAt,behavior:'instant'});
    setTimeout(()=>{if(!open){sheet.hidden=true;body.replaceChildren();}},700);
    if(history.state&&history.state.sheet)history.pushState(null,'',location.pathname.replace(/[^/]*$/,'')+location.hash);
  }

  window.openDetail=url=>{show(url,true);};
  document.addEventListener('click',e=>{
    const card=e.target.closest('a.proj-card');
    if(!card||e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;
    e.preventDefault();show(card.getAttribute('href'),true);
  },true);
  sheet.querySelector('.sheet-back').addEventListener('click',close);
  addEventListener('keydown',e=>{if(e.key==='Escape'&&open)close();});
  addEventListener('popstate',e=>{if(e.state&&e.state.sheet)show(e.state.sheet,false);else if(open)close();});
})();
