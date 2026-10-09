/* Paste the 11-character YouTube video ID here after upload.
   Use Public or Unlisted visibility and enable embedding.
   Keep empty until ready: no local video paths or placeholder URLs. */
const MUSIC_VIDEOS = {
  'piano-song': '',
  'live-band-highlights': '',
  'maxmsp': '',
  'heartbreaker': ''
};

(() => {
  const dialog = document.getElementById('music-dialog');
  const player = document.getElementById('music-player');
  const title = document.getElementById('music-player-title');
  const watchLink = dialog.querySelector('.music-watch');
  let previousOverflow = '';
  let trigger = null;

  document.querySelectorAll('[data-music]').forEach(button => {
    const id = MUSIC_VIDEOS[button.dataset.music];
    if (!/^[\w-]{11}$/.test(id)) return;
    const name = button.dataset.title;
    button.disabled = false;
    button.setAttribute('aria-label', `Play ${name}`);
    const status = button.querySelector('.music-status');
    status.textContent = 'Watch performance';
    if (button.dataset.music === 'maxmsp') status.textContent = 'Watch sound study';
    status.classList.add('ready');
    const meta = document.querySelector(`[data-preview="${button.dataset.music}"] .music-track-meta`);
    meta.textContent = meta.textContent.replace(' · Video coming soon', '').replace('Coming soon', 'Video').replace('In progress', 'Sound study');
    button.addEventListener('click', () => {
      trigger = button;
      title.textContent = name;
      watchLink.href = `https://www.youtube.com/watch?v=${id}`;
      const frame = document.createElement('iframe');
      frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      frame.title = `${name} — YouTube video player`;
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      player.replaceChildren(frame);
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    });
  });

  dialog.querySelector('.music-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    player.replaceChildren(); // Stop playback when closed, including Escape.
    document.body.style.overflow = previousOverflow;
    trigger?.focus();
  });
})();

// A single cover stack: hover to browse, click or use arrow keys to select.
(() => {
  const tabs = [...document.querySelectorAll('.music-track')];
  const panels = [...document.querySelectorAll('.music-panel')];
  const count = document.querySelector('.music-stack-count');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let pending;
  function select(index) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].classList.toggle('is-active', i === index);
      panels[i].setAttribute('aria-hidden', String(i !== index));
      panels[i].inert = i !== index;
      panels[i].dataset.layer = (i - index + tabs.length) % tabs.length;
    });
    count.textContent = `${String(index + 1).padStart(2, '0')} / 04`;
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('pointerenter', event => {
      if (!finePointer.matches || event.pointerType === 'touch') return;
      clearTimeout(pending);
      pending = setTimeout(() => select(index), 90);
    });
    tab.addEventListener('pointerleave', () => clearTimeout(pending));
    tab.addEventListener('click', () => { clearTimeout(pending); select(index); });
    tab.addEventListener('focus', () => { clearTimeout(pending); select(index); });
    tab.addEventListener('keydown', event => {
      const step = {ArrowDown:1, ArrowUp:-1}[event.key];
      let next;
      if (step) next = (index + step + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      tabs[next].focus();
    });
  });
})();
