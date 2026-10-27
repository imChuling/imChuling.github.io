(() => {
  document.querySelectorAll('[data-music]').forEach(button => {
    const detail = button.dataset.detail;
    if (detail) {
      button.disabled = false;
      button.style.cursor = 'pointer';
      button.addEventListener('click', () => {
        window.location.href = detail;
      });
    }
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
    tab.addEventListener('click', (e) => {
      clearTimeout(pending); select(index);
      if (tab.dataset.detail) {
        window.location.href = tab.dataset.detail;
      }
    });
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
