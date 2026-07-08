const boot = document.getElementById('boot');
const bootSkip = document.getElementById('bootSkip');
const radial = document.getElementById('radial');
const activeTitle = document.getElementById('activeTitle');
const activeDesc = document.getElementById('activeDesc');
const moduleHint = document.getElementById('moduleHint');
const sessionState = document.getElementById('sessionState');

const bootKey = 'scionexus_boot_seen';
const hideBoot = () => { if (boot) boot.classList.add('is-hidden'); sessionStorage.setItem(bootKey, '1'); };

if (boot && sessionStorage.getItem(bootKey)) {
  hideBoot();
} else if (boot) {
  const timers = [900, 1500, 2100, 2700, 3000].map((ms, i) => setTimeout(() => {
    const lines = boot.querySelectorAll('.boot__log span');
    if (lines[i]) lines[i].style.color = '#ff0';
    if (i === 4 && bootSkip) bootSkip.textContent = 'ENTER CORE';
  }, ms));
  setTimeout(hideBoot, 3200);
  bootSkip?.addEventListener('click', hideBoot);
}

const modules = [...document.querySelectorAll('.module')];
const setActive = (el) => {
  modules.forEach(m => m.classList.remove('is-active'));
  el.classList.add('is-active');
  const title = el.dataset.title || '';
  const desc = el.dataset.desc || '';
  if (activeTitle) activeTitle.textContent = title;
  if (activeDesc) activeDesc.textContent = desc;
  if (moduleHint) moduleHint.textContent = desc;
};
modules.forEach((module, index) => {
  module.addEventListener('mouseenter', () => setActive(module));
  module.addEventListener('focus', () => setActive(module));
  module.addEventListener('click', () => { setActive(module); window.location.href = module.dataset.target; });
  module.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); module.click(); } });
  module.tabIndex = 0;
  module.style.setProperty('--index', index);
});

if (radial) {
  const radius = 250;
  const positions = [
    [0, -radius],
    [radius, 0],
    [0, radius],
    [-radius, 0]
  ];
  modules.forEach((module, i) => {
    const [x, y] = positions[i];
    module.style.left = `calc(50% + ${x}px)`;
    module.style.top = `calc(50% + ${y}px)`;
    module.style.transform = 'translate(-50%, -50%)';
  });
}

if (sessionState && !sessionStorage.getItem(bootKey)) sessionState.textContent = 'SESSION: COLD START';
if (sessionState && sessionStorage.getItem(bootKey)) sessionState.textContent = 'SESSION: WARM';
if (modules[0]) setActive(modules[0]);
if (radial && window.innerWidth > 680) {
  const radius = 250;
  const positions = [
    [0, -radius],
    [radius, 0],
    [0, radius],
    [-radius, 0]
  ];
  modules.forEach((module, i) => {
    const [x, y] = positions[i];
    module.style.left = `calc(50% + ${x}px)`;
    module.style.top = `calc(50% + ${y}px)`;
    module.style.transform = 'translate(-50%, -50%)';
  });
}
