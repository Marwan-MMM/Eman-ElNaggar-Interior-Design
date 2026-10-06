/* ======================= script.js ======================= */
'use strict';

/* ---------------- Data layer (localStorage) ----------------
   Project shape:
   { id, name, location, year, description, cover,
     images: [ { label: 'Living Room', urls: ['…', '…', '…'] }, … ] }
   Old single-photo rooms ({ label, url }) are migrated automatically on read. */
const STORE_KEY = 'eman_projects_v1';
const FALLBACK_IMG = 'https://picsum.photos/seed/eman-fallback/1000/750.jpg';

const SAMPLES = [
  {
    id: 'p-zamalek',
    name: 'Zamalek Nile Penthouse',
    location: 'Zamalek, Cairo',
    year: '2024',
    description: 'Perched above the Nile in Zamalek, this penthouse is a study in calm. Travertine floors, warm oak joinery and deep emerald upholstery soften the heavy architecture, while brushed brass traces the skyline through every window. The plan is edited to a single gesture per room — light, water, or wood.',
    cover: 'https://picsum.photos/seed/eman-zam-cover/1000/1250.jpg',
    images: [
      { label: 'Living Room',    urls: [
        'https://picsum.photos/seed/eman-zam-living-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-zam-living-2/1400/900.jpg',
        'https://picsum.photos/seed/eman-zam-living-3/1400/900.jpg' ] },
      { label: 'Kitchen',        urls: [
        'https://picsum.photos/seed/eman-zam-kitchen-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-zam-kitchen-2/1400/900.jpg' ] },
      { label: 'Master Bedroom', urls: [
        'https://picsum.photos/seed/eman-zam-bedroom-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-zam-bedroom-2/1400/900.jpg' ] },
      { label: 'Bathroom',       urls: [
        'https://picsum.photos/seed/eman-zam-bath-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-zam-bath-2/1400/900.jpg' ] }
    ]
  },
  {
    id: 'p-villa',
    name: 'New Cairo Private Villa',
    location: 'New Cairo',
    year: '2024',
    description: 'A family villa arranged around a double-height atrium in New Cairo. We contrasted quiet limestone volumes with rich walnut cabinetry and layered, low lighting, giving each of the three floors its own tempo — social downstairs, serene upstairs. Custom joinery hides the machinery of daily life from view.',
    cover: 'https://picsum.photos/seed/eman-villa-cover/1000/1250.jpg',
    images: [
      { label: 'Living Room',    urls: [
        'https://picsum.photos/seed/eman-villa-living-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-villa-living-2/1400/900.jpg',
        'https://picsum.photos/seed/eman-villa-living-3/1400/900.jpg' ] },
      { label: 'Dining Room',    urls: [
        'https://picsum.photos/seed/eman-villa-dining-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-villa-dining-2/1400/900.jpg' ] },
      { label: 'Kitchen',        urls: [
        'https://picsum.photos/seed/eman-villa-kitchen-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-villa-kitchen-2/1400/900.jpg' ] },
      { label: 'Master Bedroom', urls: [
        'https://picsum.photos/seed/eman-villa-bedroom-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-villa-bedroom-2/1400/900.jpg' ] },
      { label: 'Bathroom',       urls: [
        'https://picsum.photos/seed/eman-villa-bath-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-villa-bath-2/1400/900.jpg' ] }
    ]
  },
  {
    id: 'p-sahel',
    name: 'Sahel Beach Retreat',
    location: 'North Coast',
    year: '2023',
    description: 'A summer house on the North Coast built for barefoot living. Whitewashed lime walls, bleached oak and raw linen keep the palette salt-air light, while deep shaded loggias blur the line between the living room and the sea. Everything is washable, weathered and deliberately unhurried.',
    cover: 'https://picsum.photos/seed/eman-sahel-cover/1000/1250.jpg',
    images: [
      { label: 'Living Room',   urls: [
        'https://picsum.photos/seed/eman-sahel-living-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-sahel-living-2/1400/900.jpg' ] },
      { label: 'Kitchen',       urls: [
        'https://picsum.photos/seed/eman-sahel-kitchen-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-sahel-kitchen-2/1400/900.jpg' ] },
      { label: 'Guest Bedroom', urls: [
        'https://picsum.photos/seed/eman-sahel-bedroom-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-sahel-bedroom-2/1400/900.jpg' ] },
      { label: 'Bathroom',      urls: [
        'https://picsum.photos/seed/eman-sahel-bath-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-sahel-bath-2/1400/900.jpg' ] }
    ]
  },
  {
    id: 'p-katameya',
    name: 'Katameya Dunes Apartment',
    location: 'Katameya, Cairo',
    year: '2023',
    description: 'A golf-front apartment reworked for a collector couple. Gallery walls and museum lighting meet deep olive velvets and smoked oak, so the art breathes without the rooms going cold. The study was carved from an underused guest room and wrapped entirely in book-matched veneer.',
    cover: 'https://picsum.photos/seed/eman-kata-cover/1000/1250.jpg',
    images: [
      { label: 'Living Room',    urls: [
        'https://picsum.photos/seed/eman-kata-living-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-kata-living-2/1400/900.jpg',
        'https://picsum.photos/seed/eman-kata-living-3/1400/900.jpg' ] },
      { label: 'Study',          urls: [
        'https://picsum.photos/seed/eman-kata-study-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-kata-study-2/1400/900.jpg' ] },
      { label: 'Kitchen',        urls: [
        'https://picsum.photos/seed/eman-kata-kitchen-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-kata-kitchen-2/1400/900.jpg' ] },
      { label: 'Master Bedroom', urls: [
        'https://picsum.photos/seed/eman-kata-bedroom-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-kata-bedroom-2/1400/900.jpg' ] }
    ]
  },
  {
    id: 'p-garden',
    name: 'Garden City Classic Flat',
    location: 'Garden City, Cairo',
    year: '2022',
    description: 'A 1930s flat in Garden City restored rather than reinvented. Original floors were lifted, relayed and framed with new brass inlays; high ceilings gained slim plaster cornices and quiet emerald accents. It is a conversation between the building\u2019s history and a very present way of living.',
    cover: 'https://picsum.photos/seed/eman-garden-cover/1000/1250.jpg',
    images: [
      { label: 'Living Room', urls: [
        'https://picsum.photos/seed/eman-garden-living-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-garden-living-2/1400/900.jpg' ] },
      { label: 'Kitchen',     urls: [
        'https://picsum.photos/seed/eman-garden-kitchen-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-garden-kitchen-2/1400/900.jpg' ] },
      { label: 'Bedroom',     urls: [
        'https://picsum.photos/seed/eman-garden-bedroom-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-garden-bedroom-2/1400/900.jpg' ] },
      { label: 'Bathroom',    urls: [
        'https://picsum.photos/seed/eman-garden-bath-1/1400/900.jpg',
        'https://picsum.photos/seed/eman-garden-bath-2/1400/900.jpg' ] }
    ]
  }
];

const Store = {
  all() {
    try {
      const v = JSON.parse(localStorage.getItem(STORE_KEY));
      if (!Array.isArray(v)) return [];
      /* Normalize: migrate old { label, url } rooms to { label, urls: [...] } */
      return v.map(p => ({
        ...p,
        images: (Array.isArray(p.images) ? p.images : [])
          .map(im => {
            let urls = Array.isArray(im.urls) ? im.urls.slice() : [];
            if (im.url) urls.unshift(im.url);
            urls = urls.map(u => String(u || '').trim()).filter(Boolean);
            return { label: im.label || '', urls };
          })
          .filter(im => im.urls.length)
      }));
    } catch (e) { return []; }
  },
  save(list) { localStorage.setItem(STORE_KEY, JSON.stringify(list)); },
  seed() { if (localStorage.getItem(STORE_KEY) === null) Store.save(SAMPLES); },
  uid() { return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
};

/* ---------------- Helpers ---------------- */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');
const photoCount = p => (p.images || []).reduce((n, r) => n + r.urls.length, 0);

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  if (!t) return;
  t.lastElementChild.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

function imgErr(img) { img.onerror = null; img.src = FALLBACK_IMG; }

function lockUpdate() {
  const any = $('#detail')?.classList.contains('open') ||
              $('#lightbox')?.classList.contains('open') ||
              $('#menu')?.classList.contains('open') || false;
  document.body.classList.toggle('locked', any);
}

let io;
function initReveal() {
  io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
}
function observeReveals(root = document) {
  $$('[data-reveal]', root).forEach(el => io.observe(el));
}

let confirmCb = null;
function openConfirm(title, msg, btnText, cb) {
  const m = $('#modal');
  if (!m) { cb(); return; }
  $('#mTitle').textContent = title;
  $('#mMsg').textContent = msg;
  $('#mYes').textContent = btnText;
  confirmCb = cb;
  m.classList.add('open');
}
function closeConfirm() { $('#modal')?.classList.remove('open'); confirmCb = null; }
function initModal() {
  const m = $('#modal');
  if (!m) return;
  $('#mYes').addEventListener('click', () => { const cb = confirmCb; closeConfirm(); cb && cb(); });
  $('#mNo').addEventListener('click', closeConfirm);
  m.addEventListener('click', e => { if (e.target === m) closeConfirm(); });
}

document.addEventListener('DOMContentLoaded', () => {
  Store.seed();
  initModal();
  if (document.body.dataset.page === 'public') initPublic();
  if (document.body.dataset.page === 'admin')  initAdmin();
});

/* =========================================================
   PUBLIC SITE
   ========================================================= */
function initPublic() {
  initReveal();
  let projects = Store.all();

  const header = $('#header');
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 40);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  const menu = $('#menu');
  $('#burger').addEventListener('click', () => { menu.classList.add('open'); menu.setAttribute('aria-hidden', 'false'); lockUpdate(); });
  function closeMenu() { menu.classList.remove('open'); menu.setAttribute('aria-hidden', 'true'); lockUpdate(); }
  $('#menuClose').addEventListener('click', closeMenu);
  $$('.menu-link').forEach(a => a.addEventListener('click', closeMenu));

  /* Projects grid */
  const grid = $('#worksGrid');
  function cardHTML(p, i) {
    const cover = p.cover || p.images?.[0]?.urls?.[0] || FALLBACK_IMG;
    return `
      <article class="card" data-reveal data-id="${p.id}" tabindex="0" role="button" aria-label="View project: ${esc(p.name)}">
        <div class="card-media">
          <img src="${esc(cover)}" alt="${esc(p.name)} — cover" loading="lazy" onerror="imgErr(this)">
          <span class="card-num">${pad(i + 1)}</span>
          <span class="card-view"><svg class="ic"><use href="#i-up"/></svg></span>
        </div>
        <div class="card-info">
          <div>
            <h3 class="card-name">${esc(p.name)}</h3>
            <p class="card-loc">${esc(p.location) || '—'}</p>
          </div>
          <span class="card-year">${esc(p.year) || ''}</span>
        </div>
      </article>`;
  }
  function renderGrid() {
    projects = Store.all();
    grid.innerHTML = projects.length
      ? projects.map(cardHTML).join('')
      : `<div class="empty" data-reveal><em>Projects coming soon.</em><p>New works are being prepared — check back shortly.</p></div>`;
    observeReveals(grid);
    $$('.card', grid).forEach(card => {
      const open = () => openDetail(card.dataset.id);
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
  }

  /* Project detail overlay */
  const detail = $('#detail');
  let detailId = null;
  let currentFlat = []; /* flat gallery: [{ url, label, ui, roomLen }] */

  function openDetail(id) {
    const p = projects.find(x => x.id === id);
    if (!p) return;
    detailId = id;
    const idx = projects.indexOf(p);
    const rooms = p.images || [];

    /* Build one continuous gallery across all rooms */
    currentFlat = [];
    rooms.forEach(r => r.urls.forEach((url, ui) =>
      currentFlat.push({ url, label: r.label || 'Untitled space', ui, roomLen: r.urls.length })));

    $('#dIdx').textContent = `${pad(idx + 1)} / ${pad(projects.length)}`;
    const hero = $('#dHeroImg');
    hero.onerror = () => imgErr(hero);
    hero.src = p.cover || currentFlat[0]?.url || FALLBACK_IMG;
    hero.alt = p.name;
    $('#dChip').style.display = currentFlat.length ? '' : 'none';
    $('#dName').textContent = p.name;
    $('#dLoc').textContent = p.location || '—';
    $('#dYear').textContent = p.year || '—';
    $('#dCount').textContent = currentFlat.length
      ? `${currentFlat.length} ${currentFlat.length === 1 ? 'Photo' : 'Photos'} · ${rooms.length} ${rooms.length === 1 ? 'Room' : 'Rooms'}`
      : '—';
    $('#dDesc').textContent = p.description || '';

    /* Room rows — each opens its own photo set (first photo of that room) */
    let k = 0;
    $('#dRooms').innerHTML = rooms.length
      ? rooms.map((r, ri) => {
          const start = k; k += r.urls.length;
          return `
            <button class="room" data-i="${start}">
              <span class="room-num">${pad(ri + 1)}</span>
              <img class="room-thumb" src="${esc(r.urls[0])}" alt="${esc(r.label)}" loading="lazy" onerror="imgErr(this)">
              <span class="room-txt">
                <span class="room-name">${esc(r.label) || 'Untitled space'}</span>
                <span class="room-sub">${r.urls.length} ${r.urls.length === 1 ? 'Photo' : 'Photos'}</span>
              </span>
              <svg class="ic"><use href="#i-arrow"/></svg>
            </button>`;
        }).join('')
      : `<p class="rooms-empty">Photography for this project is being prepared.</p>`;
    $$('#dRooms .room').forEach(r => r.addEventListener('click', () => openLB(currentFlat, +r.dataset.i)));

    const nx = projects[(idx + 1) % projects.length];
    $('#dNextName').textContent = nx ? nx.name : '';
    $('#dNext').style.display = projects.length > 1 ? '' : 'none';

    detail.classList.add('open');
    detail.scrollTop = 0;
    lockUpdate();
  }
  function closeDetail() { detail.classList.remove('open'); detailId = null; lockUpdate(); }

  $('#dClose').addEventListener('click', closeDetail);
  $('#dHero').addEventListener('click', () => { if (currentFlat.length) openLB(currentFlat, 0); });
  $('#dNext').addEventListener('click', () => {
    const i = projects.findIndex(x => x.id === detailId);
    if (i > -1) openDetail(projects[(i + 1) % projects.length].id);
  });

  /* Lightbox — browses the whole project; caption always shows the room */
  const lb = { items: [], i: 0 };
  const lbImg = $('#lbImg');

  function openLB(items, i = 0) {
    lb.items = items; lb.i = i;
    showLB();
    $('#lightbox').classList.add('open');
    lockUpdate();
  }
  function closeLB() { $('#lightbox').classList.remove('open'); lockUpdate(); }
  function showLB() {
    const it = lb.items[lb.i] || {};
    lbImg.classList.add('fade');
    const tmp = new Image();
    tmp.onload  = () => { lbImg.src = tmp.src; lbImg.classList.remove('fade'); };
    tmp.onerror = () => { lbImg.src = FALLBACK_IMG; lbImg.classList.remove('fade'); };
    tmp.src = it.url || FALLBACK_IMG;
    lbImg.alt = it.label || 'Project image';
    /* "Living Room · 2 / 3" when the room has several photos, plain name otherwise */
    $('#lbCap').textContent = it.roomLen > 1
      ? `${it.label} · ${pad(it.ui + 1)} / ${pad(it.roomLen)}`
      : (it.label || '');
    $('#lbCount').textContent = `${pad(lb.i + 1)} / ${pad(lb.items.length)}`;
  }
  const lbNext = () => { lb.i = (lb.i + 1) % lb.items.length; showLB(); };
  const lbPrev = () => { lb.i = (lb.i - 1 + lb.items.length) % lb.items.length; showLB(); };
  $('#lbNext').addEventListener('click', lbNext);
  $('#lbPrev').addEventListener('click', lbPrev);
  $('#lbClose').addEventListener('click', closeLB);
  $('#lightbox').addEventListener('click', e => { if (e.target.id === 'lightbox' || e.target.id === 'lbStage') closeLB(); });

  document.addEventListener('keydown', e => {
    if ($('#lightbox').classList.contains('open')) {
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowRight') lbNext();
      if (e.key === 'ArrowLeft') lbPrev();
    } else if ($('#detail').classList.contains('open') && e.key === 'Escape') {
      closeDetail();
    }
  });

  let tX = 0;
  $('#lbStage').addEventListener('touchstart', e => { tX = e.touches[0].clientX; }, { passive: true });
  $('#lbStage').addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tX;
    if (Math.abs(dx) > 45) (dx < 0 ? lbNext : lbPrev)();
  }, { passive: true });

  $('#copyEmail')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('hello@emanelnaggar.com');
      toast('Email copied to clipboard');
    } catch (e) {
      toast('Could not copy — long-press the address instead');
    }
  });

  addEventListener('storage', e => {
    if (e.key !== STORE_KEY) return;
    renderGrid();
    if (detailId) {
      const p = Store.all().find(x => x.id === detailId);
      p ? openDetail(p.id) : closeDetail();
    }
    toast('Portfolio updated');
  });

  renderGrid();
  observeReveals();
  $('#year').textContent = new Date().getFullYear();
}

/* =========================================================
   ADMIN DASHBOARD
   ========================================================= */
function initAdmin() {
  const PASS = 'naggar2024'; // ← change the dashboard passcode here

  const gate = $('#gate'), app = $('#app');
  function enter() {
    $('#gateForm').reset();
    $('#gateErr').style.display = 'none';
    gate.classList.add('off');
    app.hidden = false;
    renderList();
  }
  $('#gateForm').addEventListener('submit', e => {
    e.preventDefault();
    if ($('#gatePass').value === PASS) {
      sessionStorage.setItem('eman_admin', '1');
      enter();
    } else {
      $('#gateErr').style.display = 'block';
      gate.classList.remove('shake'); void gate.offsetWidth; gate.classList.add('shake');
    }
  });
  $('#logout').addEventListener('click', () => {
    sessionStorage.removeItem('eman_admin');
    app.hidden = true;
    gate.classList.remove('off');
  });
  if (sessionStorage.getItem('eman_admin') === '1') enter();

  const form = $('#projForm');
  const fName = $('#fName'), fLoc = $('#fLoc'), fYear = $('#fYear'),
        fDesc = $('#fDesc'), fCover = $('#fCover');
  const rows = $('#imgRows'), coverPrev = $('#coverPrev');
  let editingId = null;

  function bindPreview(input, img) {
    const upd = () => {
      const v = input.value.trim();
      img.style.display = v ? 'block' : 'none';
      if (!v) return;
      img.onerror = () => { img.style.display = 'none'; };
      img.src = v;
    };
    input.addEventListener('input', upd);
    upd();
  }
  bindPreview(fCover, coverPrev);

  /* ---- Room groups: each room holds one or more photo URLs ---- */
  function syncRoomTags() {
    $$('.img-group', rows).forEach((g, i) => {
      const t = $('.ig-tag', g);
      if (t) t.textContent = 'Room ' + pad(i + 1);
    });
  }

  function addRoomGroup(label = '', urls = []) {
    const g = document.createElement('div');
    g.className = 'img-group';
    g.innerHTML = `
      <div class="ig-head">
        <span class="ig-tag">Room</span>
        <button type="button" class="rm-group" aria-label="Remove this room"><svg class="ic"><use href="#i-close"/></svg></button>
      </div>
      <input class="ig-label" type="text" placeholder="Room name — e.g. Living Room" value="${esc(label)}" aria-label="Room name">
      <div class="ig-urls"></div>
      <button type="button" class="btn btn--sm btn--ghost ig-add"><svg class="ic"><use href="#i-plus"/></svg>Add Photo</button>`;
    const list = $('.ig-urls', g);
    const addUrl = (v = '') => {
      const row = document.createElement('div');
      row.className = 'img-row';
      row.innerHTML = `
        <img class="prev" alt="" style="display:none">
        <input class="ig-url" type="text" placeholder="Photo URL — https://…" value="${esc(v)}" aria-label="Photo URL">
        <button type="button" class="rm" aria-label="Remove this photo"><svg class="ic"><use href="#i-close"/></svg></button>`;
      bindPreview($('.ig-url', row), $('.prev', row));
      $('.rm', row).addEventListener('click', () => row.remove());
      list.appendChild(row);
    };
    (urls.length ? urls : ['']).forEach(addUrl);
    $('.ig-add', g).addEventListener('click', () => addUrl());
    $('.rm-group', g).addEventListener('click', () => { g.remove(); syncRoomTags(); });
    rows.appendChild(g);
    syncRoomTags();
  }
  $('#btnAddImg').addEventListener('click', () => addRoomGroup());

  function resetForm() {
    editingId = null;
    form.reset();
    rows.innerHTML = '';
    addRoomGroup();
    $('#formTitle').textContent = 'Add Project';
    $('#btnSave').textContent = 'Save Project';
    $('#btnCancelEdit').hidden = true;
    fName.closest('.field').classList.remove('invalid');
  }
  $('#btnCancelEdit').addEventListener('click', resetForm);
  $('#btnNew').addEventListener('click', () => {
    resetForm();
    $('#formPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* Project list */
  function renderList() {
    const list = Store.all();
    const nPhotos = list.reduce((n, p) => n + photoCount(p), 0);
    $('#stat').textContent = `${list.length} project${list.length === 1 ? '' : 's'} · ${nPhotos} photo${nPhotos === 1 ? '' : 's'}`;
    const box = $('#projList');

    if (!list.length) {
      box.innerHTML = `<div class="empty"><svg class="ic"><use href="#i-img"/></svg><em>No projects yet</em><p>Add your first project using the form.</p></div>`;
      return;
    }
    box.innerHTML = list.map(p => {
      const thumb = p.cover || p.images?.[0]?.urls?.[0] || FALLBACK_IMG;
      const pc = photoCount(p);
      return `
        <div class="list-row">
          <img class="thumb" src="${esc(thumb)}" alt="" onerror="imgErr(this)">
          <div class="list-main">
            <p class="list-name">${esc(p.name)}</p>
            <p class="list-meta">${esc(p.location) || '—'} · ${(p.images || []).length} room${(p.images || []).length === 1 ? '' : 's'} · ${pc} photo${pc === 1 ? '' : 's'}</p>
          </div>
          <div class="list-actions">
            <button class="ibtn" data-act="edit" data-id="${p.id}" aria-label="Edit project"><svg class="ic"><use href="#i-edit"/></svg></button>
            <button class="ibtn danger" data-act="del" data-id="${p.id}" aria-label="Delete project"><svg class="ic"><use href="#i-trash"/></svg></button>
          </div>
        </div>`;
    }).join('');

    $$('.ibtn', box).forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.id;
      if (b.dataset.act === 'edit') {
        startEdit(id);
      } else {
        const p = Store.all().find(x => x.id === id);
        openConfirm('Delete project', `“${p ? p.name : ''}” will be permanently removed from the portfolio.`, 'Delete', () => {
          Store.save(Store.all().filter(x => x.id !== id));
          if (editingId === id) resetForm();
          renderList();
          toast('Project deleted');
        });
      }
    }));
  }

  function startEdit(id) {
    const p = Store.all().find(x => x.id === id);
    if (!p) return;
    editingId = id;
    fName.value = p.name || '';
    fLoc.value = p.location || '';
    fYear.value = p.year || '';
    fDesc.value = p.description || '';
    fCover.value = p.cover || '';
    fCover.dispatchEvent(new Event('input'));
    rows.innerHTML = '';
    const imgs = p.images || [];
    (imgs.length ? imgs : [{ label: '', urls: [''] }])
      .forEach(im => addRoomGroup(im.label || '', im.urls.length ? im.urls : ['']));
    $('#formTitle').textContent = 'Edit Project';
    $('#btnSave').textContent = 'Update Project';
    $('#btnCancelEdit').hidden = false;
    $('#formPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
      name: fName.value.trim(),
      location: fLoc.value.trim(),
      year: fYear.value.trim(),
      description: fDesc.value.trim(),
      cover: fCover.value.trim(),
      images: $$('.img-group', rows)
        .map(g => ({
          label: $('.ig-label', g).value.trim(),
          urls: $$('.ig-url', g).map(i => i.value.trim()).filter(Boolean)
        }))
        .filter(r => r.urls.length)
    };
    if (!data.name) {
      fName.closest('.field').classList.add('invalid');
      fName.focus();
      toast('Project name is required');
      return;
    }
    fName.closest('.field').classList.remove('invalid');

    const list = Store.all();
    let msg;
    if (editingId) {
      const i = list.findIndex(x => x.id === editingId);
      if (i > -1) { data.id = editingId; list[i] = data; msg = 'Project updated'; }
      else { data.id = Store.uid(); list.push(data); msg = 'Project added'; }
    } else {
      data.id = Store.uid();
      list.unshift(data);
      msg = 'Project added';
    }
    Store.save(list);
    renderList();
    resetForm();
    toast(msg);
  });

  $('#btnExport').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(Store.all(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'eman-projects-backup.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast('Backup downloaded');
  });
  $('#btnImport').addEventListener('click', () => $('#importFile').click());
  $('#importFile').addEventListener('change', e => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const arr = JSON.parse(r.result);
        if (!Array.isArray(arr)) throw new Error('bad');
        const clean = arr.map(p => ({ ...p, id: p.id || Store.uid() }));
        openConfirm('Import backup', `Replace the current library with ${clean.length} imported project(s)?`, 'Import', () => {
          Store.save(clean);
          renderList();
          resetForm();
          toast('Library imported');
        });
      } catch (err) { toast('Invalid backup file'); }
    };
    r.readAsText(f);
    e.target.value = '';
  });
  $('#btnReset').addEventListener('click', () =>
    openConfirm('Restore samples', 'Replace the current library with the original sample projects?', 'Restore', () => {
      Store.save(SAMPLES);
      renderList();
      resetForm();
      toast('Sample projects restored');
    })
  );

  resetForm();
}